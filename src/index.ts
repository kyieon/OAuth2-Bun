import express from "express";

import * as routers from "./router";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", routers.token);
app.use("/auth", routers.validate);

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

const PORT = Bun.env.SERVER_PORT ?? "5010";

app.listen(PORT, () => {
    console.log(`[${Bun.env.NODE_ENV}] Server running at http://localhost:${PORT}`);
});
