const express = require('express')
const UserController = require('../controllers/UserController')
const PlanController = require('../controllers/PlanController')
const isAuthenticate = require('../middleware/isAuthenticate')
const router = express.Router()


// define the home page route
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/plans', isAuthenticate,PlanController.getAllPlan)
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router