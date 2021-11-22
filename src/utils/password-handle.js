const crypto = require('crypto');

const md5password = (password) => {
    const md5 = crypto.createHash('md5');
    const result = md5.update(password).digest('hex');//update返回对象 需要digest来获取加密字符串 hex 16进制 默认buffer
    return result;
  }
module.exports = md5password

