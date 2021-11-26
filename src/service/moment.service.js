const connection = require('../app/database');

//多表查询
// const sqlFragment = `
// SELECT
// m.id  id ,m.content content,m.createAt createTime,m.updateAt updateTime,
// JSON_OBJECT('id',u.id,'name',u.name) user
// FROM moment m 
// LEFT JOIN user u 
// ON m.user_id =  u.id
// `
class MomentService {
    //插入新的moment
    async create(userId, content) {
        const sql = `INSERT INTO moment (content,user_id) VALUES (?,?);`
        const [res] = await connection.execute(sql, [content, userId]) //解构赋值
        console.log(res);
        return res
    }

    async getMomentById(momentId) {
        const sql = `SELECT m.id  id ,m.content content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) author,
        IFNULL(
        JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'comment_id',c.comment_id,'createTime',c.createAt,
        'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url))
        ),
        null)comments,
        IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))
        FROM label l
        left JOIN moment_label ml ON l.id = ml.label_id
        left JOIN moment mm ON ml.moment_id  = mm.id
        WHERE mm.id = m.id
        ),NULL)labels,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
        FROM moment m 
        LEFT JOIN user u   ON m.user_id =  u.id  
        LEFT JOIN comment c 	ON c.moment_id = m.id
        LEFT JOIN user cu ON  c.user_id = cu.id
        WHERE m.id = ?
        `
        const [res] = await connection.execute(sql, [momentId])
        return res[0]
    }
    async getMomentLists(offset, size) {
        const sql = `
        SELECT
                m.id  id ,m.content content,m.createAt createTime,m.updateAt updateTime,
                JSON_OBJECT('id',u.id,'name',u.name) user,
                        (SELECT count(*) FROM comment WHERE m.id = comment.moment_id) commentCount,
                        (SELECT count(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount,
                        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8888/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
                FROM moment m 
                LEFT JOIN user u 
                ON m.user_id =  u.id
                LIMIT ?,? 
        `
        const [res] = await connection.execute(sql, [offset, size])
        return res
    }
    async update(content, momentId) {
        const sql = `      
        UPDATE moment SET  content = ? WHERE id = ?
        `
        const [res] = await connection.execute(sql, [content, momentId])
        return res
    }
    async remove(momentId) {
        const sql = `
        DELETE FROM moment WHERE id = ?
        `
        const [res] = await connection.execute(sql, [momentId])
        return res
    }
    async hasLabel(momentId, labelId) {
        const sql = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
        const [res] = await connection.execute(sql, [momentId, labelId])
        return res[0] ? true : false

    }
    async addLabel(moment, labelId) {
        const sql = `INSERT INTO moment_label  (moment_id,label_id) VALUES (?,?)`
        const [res] = await connection.execute(sql, [moment, labelId])
        return [res]
    }

}


module.exports = new MomentService()