const express = require('express')
const cors = require('cors')
const router = require('./routers/router')
const app = express()
const port = 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




// npx sequelize-cli model:generate --name User --attributes email:string,gender:string,password:string,height:integer,wheight:integer,wheightGoalOn30day:integer
// npx sequelize-cli model:generate --name Exercise --attributes name:string
// npx sequelize-cli model:generate --name Plan --attributes ExerciseId:integer,UserId:integer,day:string,totalSet:integer,setRepetition:integer