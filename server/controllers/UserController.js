const { User, Plan } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const openAI = require("../helpers/openAI");
require("dotenv").config();

class UserController {
  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // res.status(401).json({
        //     message:`invalid Email/Password`
        // })
        throw { name: `invalid Email/Password` };
        // return
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        // res.status(401).json({
        //     message:`invalid Email/Password`
        // })
        // return
        throw { name: `invalid Email/Password` };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    const { email, password, gender, height, weight, weightGoalOn30day } =
      req.body;
    try {
      const createdUser = await User.create({
        email,
        password,
        gender,
        height,
        weight,
        weightGoalOn30day,
      });

      let responseOpenAI = await openAI(
        gender,
        height,
        weight,
        weightGoalOn30day
      );
      console.log(
        JSON.parse(responseOpenAI.choices[0].message.content).routine,
        "ucucucucucucucuc"
      );
      // console.log(
      //   JSON.parse(responseOpenAI.choices[0].message.content.routine),
      //   "ucaucauca"
      // );

      let bulkData = JSON.parse(responseOpenAI.choices[0].message.content).routine.map(el=>{
        el.UserId = createdUser.id
        return el
      })

      await Plan.bulkCreate(
        bulkData
      );

      res.status(201).json({
        message: `berhasil register dengan id ${createdUser.id} dan email ${createdUser.email}`
      });
    } catch (error) {
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError"
      // ) {
      //   res.status(400).json({
      //     message: error.errors[0].message,
      //   });
      // } else {
      //   res.status(500).json({
      //     message: "Internal Server Error",
      //   });
      // }
      // next(error);
      console.log(error.message);
    }
  }
}

module.exports = UserController;
