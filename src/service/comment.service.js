const connection = require('../app/database');

class CommentService {
    async create(momentId, content, id) {
        const sql = `INSERT INTO COMMENT ( content , moment_id , user_id  ) VALUES (?,?,?)`
        const [res] = await connection.execute(sql, [content, momentId, id])
        return res
    }
    async reply(momentId, content, commentId, id) {
        const sql = `INSERT INTO COMMENT (content , moment_id , user_id , comment_id) VALUES (?,?,?,?)`
        const [res] = await connection.execute(sql, [content, momentId, id, commentId])
        return res
    }
    async update(content, commentId){
        const sql = `UPDATE COMMENT SET content = ? WHERE id = ?`
        const [res] = await connection.execute(sql,[content,commentId])
        return res
    }
    async remove(commentId){
        const sql = `DELETE FROM COMMENT WHERE id = ?`
        const [res] = await connection.execute(sql,[commentId])
        return res
    }

}
module.exports = new CommentService()