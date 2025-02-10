import { defineCommand, runMain } from "citty"
import { generateFilePathsType } from "./parser.js"

const main = defineCommand({
  meta: {
    name: "ts-typedfiles",
    description: "Generate filepaths from directory structure",
  },
  args: {
    path: {
      type: "positional",
      description: "The path to the directory to scan",
      required: true,
    },
    output: {
      type: "positional",
      description: "The path to the output TypeScript file",
      default: "./src/types/file-paths.d.ts",
      required: false,
    },
    typeName: {
      type: "string",
      description: "The name of the type to be generated",
      default: "FilePath",
      required: false,
    },
  },
  run({ args }) {
    generateFilePathsType(args.path, args.output, args.typeName)
  },
})

runMain(main)

export { generateFilePathsType }
