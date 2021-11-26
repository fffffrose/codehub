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
    async getCommentsByMomentId(momentId){
        const sql = `SELECT 
        c.id,c.content,c.moment_id momentId,c.comment_id commentId,c.createAt createTime,
        JSON_OBJECT('id',u.id,'name',u.name) commenter
        FROM COMMENT c
        LEFT JOIN user u on c.user_id = u.id
        WHERE c.moment_id = ?`
        const [res] = await connection.execute(sql,[momentId])
        return res
    }

}
module.exports = new CommentService()