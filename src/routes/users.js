

const bcrypt = require("bcrypt")

let { generateHashPassword, generateAccessToken } = require("../middlewares/mainFun")
const user = require("../models/user")
const emailvalidator = require("email-validator");

const Registration = async (req, res) => {

  try {
    const { name, password, phone, email } = req.body
    if (emailvalidator.validate(email)) {
      const EmailExist = await user.find({ Email: email });
      if (EmailExist.length > 0 ) {
        return res.json({ message: "User Already Exist. Please Login", status: false });
      } else {
        const hashPassword = await generateHashPassword(password)
        user.collection.insertOne({ Name: name, Password: hashPassword, Phone: phone, Email: email }, async (error, result) => {
          if (error) {
            console.error(error);
          } else {
            const AccessToken = await generateAccessToken(email)
            return res.json({ message: "Registration done successfully ", Token: AccessToken, status: true, })
          }
        });
      }
    } else {
      res.status(400).send({message:'Invalid Email',status:false});
    }



  } catch (error) {
    return res.json({ message: error, status: false, })

  }
}
const Login = async (req, res) => {
  try {

    const { email, password } = req.body
    const result = await user.find({ Email: email })
    console.log(result)
    if (result.length > 0) {
      const match = await bcrypt.compare(password, result[0].Password)
      if (match) {
        const AccessToken = await generateAccessToken(result[0].Email, result[0])
        return res.json({ message: "Login successfully ", status: true, Token: AccessToken })

      }
      else {
        res.json({ message: "Password  not match", status: false })
      }
    }
    else {
      res.status(400).json({ message: "please create your account ", status: false })
    }

  } catch (error) {
    res.json({ message: error, status: false })
  }

}

module.exports = { Registration, Login };