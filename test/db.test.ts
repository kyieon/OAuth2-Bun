import { expect, test, mock, beforeAll, afterAll } from "bun:test";
import { DB } from "../src/core/db-pool";

beforeAll(() => {
    console.log("beforeAll");
});

afterAll(() => {
    console.log("afterAll");
});

test("test", async () => {
    const result = await DB.q(`SELECT * FROM tb_auth_token`);
    console.log("Result: ", result);

    process.exit();
});
