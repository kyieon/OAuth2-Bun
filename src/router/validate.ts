import { Router } from "express";
import * as jwt from "fast-jwt";

const pool = require("../core/db-pool");

const router = Router();

router.post("/validate", async (req, res) => {
    try {
        const auth_header = req.header("Authorization");
        console.log("Authorization: ", auth_header);

        if (!auth_header) {
            res.status(401).send(`Authorization is ${auth_header}`);
        }
        const access_token: string | undefined = auth_header?.replace("Bearer", "").trim();
        console.log("AccessToken: ", auth_header);

        const result = await pool.DB.q(`SELECT * FROM tb_auth_token WHERE access_token = '${access_token}'`);

        try {
            if (result?.count) {
                const payload = jwt.createVerifier({ key: Bun.env.JWT_TOKEN_KEY, cache: true })(access_token!);
                console.log("Payload: ", payload);

                res.status(200).json(payload);
            }
        } catch (err: any) {
            console.error(`${err.name}: ${err.message} (${err.code})`);
            res.status(401).send(err.message);
        }
        res.status(403).send(`Invalid Access token [${access_token}]`);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({
            status: 500,
            name: "Internal Server Error",
            message: err.message,
        });
    }
});

export default router;
