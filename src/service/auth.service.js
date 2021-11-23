const connection = require('../app/database');

class AuthService {
    async checkMoment(momentId, userId) {
        try {
            const sql = `SELECT  user_id FROM moment 
            WHERE id = ? AND user_id = ?
            `
            const [res] = await connection.execute(sql, [momentId, userId])
            return res.length === 0 ? false : true
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthService()