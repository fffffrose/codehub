const connection = require('../app/database');

class UserService {
    async create(user) {
        const { name, password } = user
        const statement = `INSERT INTO user (name,password) VALUES (?,?)`

        const result = await connection.execute(statement, [name, password])

        console.log(`已保存到数据库!!!`, user);
        //将user存储到数据库中 
        return result[0]
    }
    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?`
        const result = await connection.execute(statement, [name])

        return result[0]
    }
}

module.exports = new UserService()