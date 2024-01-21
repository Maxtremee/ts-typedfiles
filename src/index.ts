import { parse } from "pathe"
import fs from "node:fs"

const outfile = fs.createWriteStream(process.argv[3], {
  flags: "w",
  encoding: "utf8",
})

const FILE_START = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

export type Filepath = 
`
outfile.write(FILE_START)

function writeSinglePath(path: string) {
  const typeString = `| '${path}'\n`
  outfile.write(typeString)
}

function parsePath(path: string) {
  const parsed = parse(path)
  const dir = fs.readdirSync(parsed.dir, {
    withFileTypes: true,
    recursive: true,
  })

  dir.forEach((file) => {
    if (file.isFile()) {
      writeSinglePath(file.name)
    }
  })
}

parsePath(process.argv[2])

outfile.close()

process.exit(0)
