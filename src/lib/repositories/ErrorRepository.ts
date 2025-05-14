import sql from 'mssql';
import { connectToDB } from "../db";

export class ErrorRepository {

    static async save(messageError: string, trace: string) {
        try {
            const db = await connectToDB();
            await db
                .request()
                .input('MENSAJE_ERROR', sql.VarChar, messageError)
                .input('TRAZA_ERROR', sql.VarChar, trace)
                .query(`
                INSERT INTO MERCH_ERRORES (MENSAJE_ERROR, TRAZA_ERROR)
                VALUES (@MENSAJE_ERROR, @TRAZA_ERROR)
            `);
        }
        catch (error) {
            console.log('Error al intentar insertar la traza: ' + error);
        }
    }
}