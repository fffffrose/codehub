const connection = require('../app/database');

class AuthService {
    async checkResource(tableName,Id, userId) {
        try {
            const sql = `SELECT * FROM ${tableName} 
            WHERE id = ? AND user_id = ?
            `
            const [res] = await connection.execute(sql, [Id, userId])
            return res.length === 0 ? false : true
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthService()