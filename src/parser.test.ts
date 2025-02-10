import { describe, it, assertType } from "vitest"
import type { FilePath } from "./test.js"

describe("generateFilePathsType", () => {
  it("properly parses test-dir directory", () => {
    assertType<FilePath>("test-dir/.hidden")
    assertType<FilePath>("test-dir/1/2/3/.hidden3")
    assertType<FilePath>("test-dir/1/2/visible2.extension")
    assertType<FilePath>("test-dir/1/visible1.extension")
    assertType<FilePath>("test-dir/visible")
    assertType<FilePath>("test-dir/visible.extension")
  })
})
