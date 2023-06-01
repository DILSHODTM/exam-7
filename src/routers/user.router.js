import { Router } from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";


const router = Router();




router.get("/masterclass" ,  userController.MASTERCLASS)
router.post("/post/masterclass",validate,  userController.POSTMASTERCLASS)



export default router;
