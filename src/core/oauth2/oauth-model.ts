import { Token, Client, User } from "oauth2-server";

const pool = require("../db-pool");
const jwt = require("fast-jwt");

const options = require("./oauth-options");

type Config = {
    clients: Client[];
    users: User[];
};

type UserDTO = {
    userId: string;
    password: string;
};

let config: Config = {
    clients: [
        {
            id: "auth",
            clientId: Bun.env.CLIENT_ID,
            clientSecret: Bun.env.CLIENT_SECRET,
            grants: ["client_credentials", "password", "refresh_token"],
            redirectUris: [],
        },
    ],
    users: [
        // Default
        {
            username: "ucsadmin",
            password: "D4nPH9rFBSg+5QbtPi46ZFYKZUMaH1W4MVqP/SaZvTeEeYJ6GJiMc6pNdlnzFBN6ZSr9Qite+yJKf/pqa8LRZw==",
        },
    ],
};

function convertIfNullEmpty(s: string | undefined) {
    if (s) return s;
    return "";
}

function convertDateToPgTimeStamp(date: Date | undefined) {
    if (date) return `to_timestamp(${date.getTime()} / 1000.0)`;
    return null;
}

module.exports = {
    async getClient(clientId: string, clientSecret: string) {
        console.log("getClient:", clientId, clientSecret);
        console.log("Config:", config);
        var clients = config.clients.filter(function (client) {
            return client.clientId === clientId && client.clientSecret === clientSecret;
        });

        return clients[0];
    },

    async saveToken(token: Token, client: Client, user: User) {
        console.log("saveToken:", token, client, user);

        try {
            token.client = { id: client.id, grants: client.grants };
            token.user = { username: user.username };

            const tokenRaw = Object.assign({}, token, {
                accessTokenExpiresAt: token.accessTokenExpiresAt?.getTime(),
                refreshTokenExpiresAt: token.refreshTokenExpiresAt?.getTime(),
            });

            const tokenStr = JSON.stringify(tokenRaw);

            const result = await pool.DB
                .q(`INSERT INTO tb_auth_token (access_token, refresh_token, user_name, create_time, access_token_expire, refresh_token_expire, raw) 
            VALUES ('${convertIfNullEmpty(token.accessToken)}', '${convertIfNullEmpty(
                token.refreshToken
            )}', '${convertIfNullEmpty(token.user.username)}', ${convertDateToPgTimeStamp(
                new Date()
            )}, ${convertDateToPgTimeStamp(token.accessTokenExpiresAt)}, ${convertDateToPgTimeStamp(
                token.refreshTokenExpiresAt
            )}, '${tokenStr}')`);

            console.log("Result: ", result);
            if (result?.count) {
                return token;
            }
        } catch (e) {
            console.error(e);
        }
        return undefined;
    },

    async getUser(username: string, password: string) {
        console.log("getUser:", username, password);

        try {
            if (process.env.NODE_ENV == "development") {
                return config.users[0];
            }

            const API_PORT = Bun.env.API_PORT;

            const res = await fetch(`http://localhost:${API_PORT}/api/v1/users/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const body = <UserDTO>await res.json();
                console.log("res : ", res.status, body);

                let _password: string = body?.password.replace(" ", "+");
                console.log("password replace: ", _password);

                if (password && password == _password) {
                    return {
                        username: body?.userId,
                    };
                }
            } else {
                console.error("ERROR:", res.status, res.statusText);
            }
        } catch (e) {
            console.error(e);
        }
        return undefined;
    },

    async getUserFromClient(client: Client) {
        var clients = config.clients.filter((client) => {
            return client.clientId === client.clientId && client.clientSecret === client.clientSecret;
        });
        return clients.length > 0;
    },

    async getRefreshToken(refreshToken: string) {
        console.log("getRefreshToken: ", refreshToken);

        try {
            const result = await pool.DB.q(`SELECT * FROM tb_auth_token WHERE refresh_token = '${refreshToken}'`);
            if (result?.count > 0) {
                const rowData = result.rows[0].raw;
                const token = Object.assign({}, rowData, {
                    accessTokenExpiresAt: new Date(rowData.accessTokenExpiresAt),
                    refreshTokenExpiresAt: new Date(rowData.refreshTokenExpiresAt),
                });
                return token;
            }
        } catch (e) {
            console.error(e);
        }
        return undefined;
    },

    async revokeToken(token: Token) {
        console.log("revokeToken: ", token);

        try {
            const result = await pool.DB.q(`SELECT * FROM tb_auth_token WHERE refresh_token = '${token.refreshToken}'`);
            console.log("Result: ", result);
            return result?.count > 0;
        } catch (e) {
            console.error(e);
        }
        return false;
    },

    async generateAccessToken(client: Client, user: User, scope: string | string[]) {
        console.log("generateAccessToken: ", client, user, scope);

        try {
            const token = jwt.createSigner({ key: options.secretKey, expiresIn: 1000 * options.accessTokenLifetime })({
                username: user.username,
            });
            return token;
        } catch (e) {
            console.error(e);
        }
        return undefined;
    },

    async generateRefreshToken(client: Client, user: User, scope: string | string[]) {
        console.log("generateRefreshToken: ", client, user, scope);

        try {
            const token = jwt.createSigner({ key: options.secretKey, expiresIn: 1000 * options.refreshTokenLifetime })({
                username: user.username,
            });
            return token;
        } catch (e) {
            console.error(e);
        }
        return undefined;
    },
};
