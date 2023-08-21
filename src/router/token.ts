import { Router } from "express";
import { Request, Response } from "oauth2-server";

import oauth from "../core/oauth2/oauth";
import { DB } from "../core/db-pool";

const router = Router();

router.post("/token", async (req, res) => {
    try {
        var request = new Request(req);
        var response = new Response(res);

        const token = await oauth.token(request, response);

        const accessTokenExpiresAt: Date = token.accessTokenExpiresAt;
        const refreshTokenExpiresAt: Date = token.refreshTokenExpiresAt;

        const new_token = {
            token_type: "Bearer",
            access_token: token.accessToken,
            expires_in: Math.round((accessTokenExpiresAt.getTime() - new Date().getTime()) / 1000),
            refreshToken: token.refreshToken,
        };

        res.status(200).json(new_token);
    } catch (err: any) {
        console.error(err);
        res.status(err.code || 500).json({
            status: err.status,
            name: err.name,
            message: err.message,
        });
    }
});

export default router;
