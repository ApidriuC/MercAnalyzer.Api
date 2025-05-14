import { UserRecord } from '@/types/records';
import sql from 'mssql';
import { connectToDB } from "../db";

export class UserRepository {

    static async findById(userId: string): Promise<UserRecord | null> {
        const db = await connectToDB();
        const result = await db
            .request()
            .input('ID_USUARIO', sql.UniqueIdentifier, userId)
            .query(`
                SELECT
                    ID_USUARIO, CORREO, CONTRASENA_HASH 
                FROM MERCH_USUARIOS 
                WHERE ID_USUARIO = @ID_USUARIO
            `);

        const user = result.recordset[0];
        return user;
    };

    static async findByEmail(email: string): Promise<UserRecord | null> {
        const db = await connectToDB();
        const result = await db
            .request()
            .input('CORREO', sql.VarChar, email)
            .query(`
                SELECT
                    ID_USUARIO, CORREO, CONTRASENA_HASH 
                FROM MERCH_USUARIOS 
                WHERE CORREO = @CORREO
            `);

        const user = result.recordset[0];
        return user;
    };

    static async create(email: string, hashPassword: string) {
        const db = await connectToDB();
        await db
            .request()
            .input('CORREO', sql.VarChar, email)
            .input('CONTRASENA', sql.VarChar, hashPassword)
            .query(`
                INSERT INTO MERCH_USUARIOS (CORREO, CONTRASENA_HASH)
                VALUES (@CORREO, @CONTRASENA)
            `);
    };
};