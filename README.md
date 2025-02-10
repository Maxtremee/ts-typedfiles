# ts-typedfiles

Generate filepaths from directory structure. Useful for e.g. keeping track of files in a /public directory in a web project.

## Options

| Argument | Description                            | Default                     | Required |
| -------- | -------------------------------------- | --------------------------- | -------- |
| PATH     | The path to the directory to scan      | -                           | True     |
| OUTPUT   | The path to the output TypeScript file | ./src/types/file-paths.d.ts | False    |
| typeName | The name of the type to be generated   | FilePath                    | False    |
