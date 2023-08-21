import { Pool } from "pg";

type DBResult = {
    count: number;
    rows: any[];
};

class DBPoolConnect {
    private static instance: DBPoolConnect;
    private _pool: Pool | undefined;

    private constructor() {
        try {
            this._pool ??= new Pool({
                database: Bun.env.DB_NAME,
                host: Bun.env.DB_HOST,
                port: Number(Bun.env.DB_PORT),
                user: Bun.env.DB_USER,
                password: Bun.env.DB_PASS,
                max: 2,
                idleTimeoutMillis: 10 * 1000,
                connectionTimeoutMillis: 5 * 1000,
            });
        } catch (e) {
            console.error(e);
        }
    }

    public static getInstance(): DBPoolConnect {
        if (!DBPoolConnect.instance) {
            DBPoolConnect.instance = new DBPoolConnect();
        }
        return DBPoolConnect.instance;
    }

    /**
     * query
     */
    public async q(text: string): Promise<DBResult | undefined> {
        console.log(`Query: ${text}`);
        try {
            if (!this._pool) {
                throw new Error("pool not initialize");
            }

            const result = await this._pool.query(text);

            if (!result) {
                throw new Error("Result is null");
            }

            return {
                count: result.rowCount,
                rows: result.rows,
            };
        } catch (e: any) {
            console.error(`E: ${e.message} [${e.code}]`);
        }
        return undefined;
    }
}

export let DB = DBPoolConnect.getInstance();
