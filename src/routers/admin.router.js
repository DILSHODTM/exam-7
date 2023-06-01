
import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
// import jwt from "jsonwebtoken";

// import SECRET from "../config/secret.js";



const router = Router();



router.post("/admin/login", adminController.LOGIN)
router.get("/admin/masterclass" ,  adminController.CHEKTOKEN)
router.post("/activate" ,  adminController.ACTIVATE)



export default router;
