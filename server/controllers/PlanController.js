const openAI = require("../helpers/openAI");
const { User, Plan, Exercise } = require("../models");
require("dotenv").config();
const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  // serverKey is what we got from step 2 before
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

class PlanController {
  static async getAllPlan(req, res) {
    try {
      // console.log(req.user.id);

      let data = await Plan.findAll({
        include: {
          model: Exercise,
          attributes: ["name"],
        },
        where: {
          UserId: req.user.id,
        },
        attributes: ["id", "day", "totalSet", "setRepetition"],
      });
      // console.log(data[0].dataValues.Exercises[0].dataValues.Plan);

      res.status(200).json(data);
    } catch (error) {
      res.send(error.message);
    }
  }
  static async deletePlan(req, res) {
    try {
      const { id } = req.params;
      console.log(id);

      await Plan.destroy({ where: { id } });
      res.status(200).json({ message: `plan with id ${id} deleted` });
    } catch (error) {
      console.log(error);

      res.send(error.message);
    }
  }
  static async updatePlan(req, res) {
    try {
      console.log(req.body);

      await Plan.destroy({ where: { UserId: req.user.id } });
      await User.update(req.body, {
        where: {
          id: req.user.id,
        },
      });
      const getExercise = await Exercise.findAll();
      let data = await User.findByPk(req.user.id);
      console.log(data);

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
        el.UserId = req.user.id;
        return el;
      });
      console.log(bulkData);

      await Plan.bulkCreate(bulkData);
      res.status(201).json({message: "create new plan succeed"});
    } catch (error) {
      res.send(error.message);
    }
  }
  static async subscribe(req, res) {
    try {
      console.log('masux');
      
      const parameter = {
        transaction_details: {
          // order_id is a unique identifier for your order
          // this should be unique and different for every transaction
          // so we use Math.random and with prefix trx
          order_id: `trx-${Math.random().toString()}`,
          // gross_amount is the total amount of transaction
          // we use 200000 as an example (this should be dynamic based on your logic/requirement)
          gross_amount: 200000,
        },
        credit_card: {
          secure: true,
        },
        // here is the customer's details
        // for simple transaction you don't have to add this
        customer_details: {
          first_name: "budi",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };
    
      const transaction = await snap.createTransaction(parameter);
      // inside transaction variable, you will get
      // {
      //   ? token should be save to the database for retrieve the transaction status
      //   "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
      //   ? if you are want to redirect user to midtrans payment page, use this redirect_url
      //   "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
      // }
      // ? since we are using snap, we will only need the token
      let transactionToken = transaction.token;
      console.log(transactionToken);
      
    
      res.json({ token: transactionToken });
    } catch (error) {
      console.log(error);
      
      res.send(error.message);
    }
  }
}

module.exports = PlanController;
