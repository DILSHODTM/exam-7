import { MasterclassSchema } from "../utilits/validation.js"



export default(req , res , next)=>{
    try {
        if (req.url=='/post/masterclass'&&req.method=='POST'){
    const {error}= MasterclassSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    next()
        }
    } catch (error) {
        return next(error)
    }
}