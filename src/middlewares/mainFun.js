const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtConfig = {
    secret: "SECRET_KEY_@123_#_jwt",
    refreshTokenSecret: "clsdlwer2524t49rfekfldfsf=sd-sdsv",
    expireTime: 30* 60*60,
    refreshTokenExpireTime: 30 * 60 * 60
}

exports.generateAccessToken =  (user) => {
    const payload = { user }
    const accessToken = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
    return accessToken
}
exports.decodeToken = (token) => {
    const Token = jwt.decode(token, secretKey);

    return Token

}
exports.verifyJWTToken = (token) => {
    const data = jwt.verify(token, jwtConfig.secret)
    return data
}
exports.generateHashPassword = async (payload) => {
    const salt = await bcrypt.genSaltSync(10)
    var password = await bcrypt.hashSync(payload, salt)
    return password
}