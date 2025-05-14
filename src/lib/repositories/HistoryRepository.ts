import sql from 'mssql';
import { connectToDB } from "../db";

export class HistoryRepository {

    static async save(userId: string, filter: string, responseJson: string) {
        const db = await connectToDB();
        await db
            .request()
            .input('ID_USUARIO', sql.UniqueIdentifier, userId)
            .input('FILTRO_BUSQUEDA', sql.VarChar, filter)
            .input('RESPUESTA_JSON', sql.VarChar, responseJson)
            .query(`
                INSERT INTO MERCH_HISTORIAL_BUSQUEDAS (ID_USUARIO, FILTRO_BUSQUEDA, RESPUESTA_JSON)
                VALUES (@ID_USUARIO, @FILTRO_BUSQUEDA, @RESPUESTA_JSON)
            `);
    }
}