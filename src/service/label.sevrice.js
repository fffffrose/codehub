const connection = require('../app/database');
class LabelService {
    async create(name) {
        const sql = `INSERT INTO LABEL (name)  VALUES  (?)`
        const [res] = await connection.execute(sql, [name])
        return res
    }
    async getLabelByName(name) {
        const sql = `SELECT * FROM LABEL WHERE NAME = ?`
        const [res] = await connection.execute(sql, [name])
        return res[0] 
    }
    async getLabels(limit, offset) {
        const sql = `SELECT * FROM LABEL LIMIT ?,?`
        const [res] = await connection.execute(sql, [offset, limit])
        return res
    }

}
module.exports = new LabelService()