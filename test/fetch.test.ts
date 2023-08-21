import { expect, test, mock, beforeAll, afterAll } from "bun:test";

beforeAll(() => {
    console.log("beforeAll");
});

afterAll(() => {
    console.log("afterAll");
});

test("test", async () => {
    const res = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        const body = await res.json();
        console.log(res.status, body);
    } else {
        console.error("ERROR:", res.statusText);
    }
});
