
const {User,Plan,Exercise} = require('../models')

class PlanController{
    static async getAllPlan(req,res){
        try {
            // console.log(req.user.id);
            
            let data = await Plan.findAll({
                include:{
                    model:Exercise,
                    attributes: ['name']
                },
                where:{
                    UserId:req.user.id
                },
                attributes: ['day', 'totalSet', 'setRepetition'] 
            })
            // console.log(data[0].dataValues.Exercises[0].dataValues.Plan);
            console.log(data);
            
            res.status(200).json(data);
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = PlanController