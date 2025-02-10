import * as fs from "fs"
import * as path from "path"

/**
 * Generates a TypeScript file containing type definitions for file paths
 * within a specified directory.
 *
 * @param directoryPath The path to the directory to scan.
 * @param outputFilePath The path to the output TypeScript file.
 * @param typeName The name of the type to be generated.  Defaults to
 * "FilePath".
 */
export function generateFilePathsType(
  directoryPath: string,
  outputFilePath: string,
  typeName: string
): void {
  const filePaths: string[] = []

  /**
   * Recursively reads files within a directory.
   *
   * @param dir The directory to read.
   */
  function readFiles(dir: string): void {
    const files: string[] = fs.readdirSync(dir)

    for (const file of files) {
      const filePath: string = path.join(dir, file)
      const stat: fs.Stats = fs.statSync(filePath)

      if (stat.isDirectory()) {
        readFiles(filePath)
      } else if (stat.isFile()) {
        filePaths.push(filePath)
      }
    }
  }

  try {
    readFiles(directoryPath)

    const typeDefinition: string = `
    // THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.
    export type ${typeName} =
      ${filePaths.map((filePath) => `"${filePath}"`).join(" |\n  ")};
    `

    fs.writeFileSync(outputFilePath, typeDefinition, {
      flag: "w",
    })
    console.info(
      `✅ Successfully generated type definition file: ${outputFilePath}`
    )
  } catch (error: any) {
    console.error("❌ Error generating type definition:", error.message)
  }
}
