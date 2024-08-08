const { User, Plan, Exercise } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const openAI = require("../helpers/openAI");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const {
  verifyGoogleToken,
  findUserByGoogleId,
} = require("../helpers/authService");

class UserController {
  static async login(req, res, next) {
    let { email, password } = req.body;
    try {
      console.log('masuk');
      
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // res.status(401).json({
        //     message:`invalid Email/Password`
        // })
        throw { name: `invalid Email/Password` };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
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

      const getExercise = await Exercise.findAll();

      console.log(getExercise);

      let responseOpenAI = await openAI(
        getExercise,
        gender,
        height,
        weight,
        weightGoalOn30day
      );

      let bulkData = JSON.parse(
        responseOpenAI.choices[0].message.content
      ).routine.map((el) => {
        el.UserId = createdUser.id;
        return el;
      });

      await Plan.bulkCreate(bulkData);

      res.status(201).json({
        message: `berhasil register dengan id ${createdUser.id} dan email ${createdUser.email}`,
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
      next(error);
    }
  }
  static async googleAuth(req, res, next) {
    const { googleToken, data } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          name: payload.name,
          email: payload.email,
          gender: data ? data.gender : null,
          height: data ? data.height : null,
          weight: data ? data.weight : null,
          weightGoalOn30day: data ? data.weightGoalOn30day : null,
          picture: payload.picture,
          provider: "google",
          password: "google_id",
        },
        hooks: false,
      });

      const getExercise = await Exercise.findAll();
      const getPlan = await Plan.findOne({ where: { UserId: user.id } });
      console.log(user.id);
      
      if (!getPlan) {
        let responseOpenAI = await openAI(
          getExercise,
          data.gender,
          data.height,
          data.weight,
          data.weightGoalOn30day
        );

        let bulkData = JSON.parse(
          responseOpenAI.choices[0].message.content
        ).routine.map((el) => {
          el.UserId = user.id;
          return el;
        });

        await Plan.bulkCreate(bulkData);
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async checkUser(req, res, next) {
    try {
      const { googleToken } = req.body;

      const userInfo = await verifyGoogleToken(googleToken);
      const userExists = await findUserByGoogleId(userInfo.email); // assuming sub is the unique Google user ID

      res.json({ exists: !!userExists });
    } catch (error) {
      // console.error("Error checking user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
