import { expect, test, mock, beforeAll, afterAll } from "bun:test";
const jwt = require("fast-jwt");

beforeAll(() => {
    console.log("beforeAll");
});

afterAll(() => {
    console.log("afterAll");
});

test("testSign", () => {
    const token = jwt.createSigner({ key: "test", expiresIn: 1000 * 10 })({ a: "1", b: "2" });
    console.log(token);
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoiMSIsImIiOiIyIiwiaWF0IjoxNjkyMTg2NTMzLCJleHAiOjE2OTIxODY1NDN9.Z9aMB3Kc50j0UcS-NRS6IfrWWRKFNi9w2rapkOcygoc";

test("testDecoder", () => {
    // const token = createSigner({ key: "test" })({ a: "1", b: "2" });
    const payload = jwt.createDecoder()(token);
    console.log(payload);
});

test("testVerifier", () => {
    // const token = createSigner({ key: "test" })({ a: "1", b: "2" });
    try {
        const payload = jwt.createVerifier({ key: "test", cache: true })(token);
        console.log(payload);
    } catch (err: any) {
        console.error(`${err.name}: ${err.message} (${err.code})`);
    }
});
