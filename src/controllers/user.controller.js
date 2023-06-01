import { read, write } from "../utilits/model.js";
import {resolve} from 'path'


const MASTERCLASS = (req, res, next) => {
  try {
    const active = read("active");
    let {name ,type ,adress,page } = req.query
    const limit = 9
    const data = active.filter(master=>{
      const byName = name ? master.name.toLowerCase() == name.toLowerCase() : true
      const byType = type ? master.type.toLowerCase() == type.toLowerCase() : true
      const byAdress = adress ? master.adress.toLowerCase() == adress.toLowerCase() : true
      

      return byName && byType &&byAdress

    })
    if(!page){
      res.status(200).json(
        {
          status:200,
          message:'success',
          data:data
        }
      )
 }else{
      res.status(200).json(data.slice((page - 1) * limit, page * limit))
    }
  } catch (error) {
    next(error);
  }
};

const POSTMASTERCLASS = (req, res) => {
  const masterclass = read("active");
  const {
    name,
    description,
    type,
    date,
    time,
    internal_direction,
    adress,
    phone_number,
    email,
    website,
    direction,
  } = req.body;

  const images = req.files.image

  
  const image = Date.now()+images.name.replace(/\s/g,'')
  images.mv(resolve('uploads' , image))
  const master = masterclass.find(
    (master) =>
      master.name === name &&
      master.description === description &&
      master.date === date
  );
  if (master) {
    return res.status(400).json({ message: "Master Class Already Exists" });
  } else if (
    name === "" ||
    description === "" ||
    type === "" ||
    image === "" ||
    date === "" ||
    time === "" ||
    internal_direction === "" ||
    adress === "" ||
    phone_number === "" ||
    email === "" ||
    website === "" ||
    direction === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }






  const newMasterclass = {
    id: masterclass.at(-1).id + 1 || 1,
    name,
    description,
    image,
    type,
    date,
    time,
    internal_direction,
    adress,
    phone_number,
    email, 
    website,
    direction,
    status: "disctive",
    created_at: new Date(),
  };
  write("pending", [...masterclass, newMasterclass]);
  res.status(201).json({
    status: 201,
    message: "Master Class Created",
  });
};

export default {
  MASTERCLASS,
  POSTMASTERCLASS,
};
