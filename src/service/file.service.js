const connection = require('../app/database');

class FileService {
    async createAvatar(filename,mimetype,size,userId){
        const sql = `INSERT INTO avatar (filename , mimetype , size ,user_id ) VALUES (?,?,?,?)`
        const [res] = await connection.execute(sql,[filename,mimetype,size,userId])
        return res
    }
    async getAvatarByUserId(userId){
        const sql = `SELECT * FROM avatar WHERE user_id = ?`
        const [res] = await connection.execute(sql,[userId])
        return res[0] 
    }
    async createPicture(filename,mimetype,size,userId,momentId){
        const sql = `INSERT INTO file (filename , mimetype , size ,user_id , moment_id ) VALUES(?,?,?,?,?)`
        const [res] = await connection.execute(sql,[filename,mimetype,size,userId,momentId])
        return res
    }
    async getFileByFilename(filename){
        const sql = `SELECT * FROM file WHERE filename =?`
        const [res] = await connection.execute(sql,[filename])
        return res[0]
    }
}

module.exports = new FileService()