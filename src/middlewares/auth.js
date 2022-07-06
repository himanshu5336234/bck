const jwt = require('jsonwebtoken');
const { verifyJWTToken } = require("./mainFun")

const user = require('../models/user')
const auth =async  (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
    
        if (token == null) {       return res.status(400)}
        else {
            const verify = verifyJWTToken(token)
            user.find({ Email: verify.user })
                .then(response => {
                    if (response.length > 0) {
                        next()
                    }else{
                     return res.status(400).json({message:"unauthorized"})
                    }
                })
        }
    } catch (error) {
        
     console.log(error)
    }
   
}
module.exports = { auth }