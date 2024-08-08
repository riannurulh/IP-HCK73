const express = require("express");
const UserController = require("../controllers/UserController");
const PlanController = require("../controllers/PlanController");
const isAuthenticate = require("../middleware/isAuthenticate");
const router = express.Router();

const {OAuth2Client} = require('google-auth-library');
const errorHandler = require("../middleware/errorHandler");
const client = new OAuth2Client();



router.post('/auth/google', UserController.googleAuth);
router.post('/auth/check-user', UserController.checkUser);
// define the home page route
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/plans", isAuthenticate, PlanController.getAllPlan);
router.post("/generate-plan", isAuthenticate, PlanController.updatePlan);
router.delete("/plans/:id", isAuthenticate, PlanController.deletePlan);
router.get("/token", isAuthenticate, PlanController.subscribe);



// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
