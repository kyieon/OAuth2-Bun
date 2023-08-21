import { expect, test, mock, beforeAll, afterAll } from "bun:test"

beforeAll(() => {
  console.log("beforeAll")
})

afterAll(() => {
  console.log("afterAll")
})

test("test", () => {})
