import  express  from "express";
import fileUpload from "express-fileupload";
import adminRouter from "./routers/admin.router.js";
import userRouter from "./routers/user.router.js"
import swaggerRouter from "./swagger.js"
import corse from 'cors'
import {resolve} from 'path'

const PORT = "http://exam-e5qx.onrender.com"

const app = express();
app.use(corse())
app.use(express.static(resolve('uploads')))
app.use(express.json());
app.use(fileUpload());
app.use(adminRouter);
app.use(userRouter);
app.use('/', swaggerRouter);






app.listen(PORT, ()=>{
    console.log("Server is running")
})


























