import sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST ?? '',
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

let pool: sql.ConnectionPool | null = null;

export async function connectToDB() {
    try {
        if (pool && pool.connected) {
            return pool;
        }

        pool = await new sql.ConnectionPool(config).connect();
        return pool;
    }
    catch (err) {
        console.error('Error de conexión:', err);
        throw err;
    }
};
