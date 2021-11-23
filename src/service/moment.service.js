const connection = require('../app/database');

//多表查询
const sqlFragment = `
SELECT
m.id  id ,m.content content,m.createAt createTime,m.updateAt updateTime,
JSON_OBJECT('id',u.id,'name',u.name) user
FROM moment m 
LEFT JOIN user u 
ON m.user_id =  u.id
`
class MomentService {
    //插入新的moment
    async create(userId, content) {
        const sql = `INSERT INTO moment (content,user_id) VALUES (?,?);`
        const [res] = await connection.execute(sql, [content, userId]) //解构赋值
        console.log(res);
        return res
    }

    async getMomentById(momentId) {
        const sql = `${sqlFragment}
        WHERE m.id = ?
        `
        const [res] = await connection.execute(sql, [momentId])
        console.log(res[0]);
        return res[0]
    }
    async getMomentLists(offset, size) {
        const sql = `${sqlFragment}
        LIMIT ?,?
        `
        const [res] = await connection.execute(sql, [offset, size])
        console.log(res);
        return res
    }
    async update(content, momentId) {
        const sql = `      
        UPDATE moment SET  content = ? WHERE id = ?
        `
        const [res] = await connection.execute(sql, [content, momentId])
        return res
    }
    async remove(momentId){
        const sql = `
        DELETE FROM moment WHERE id = ?
        `
        const [res] = await connection.execute(sql,[momentId])
        return res
    }

}


module.exports = new MomentService()