import { read, write } from "../utilits/model.js";
import jwt from "../utilits/jwt.js";

const SECRET = "secret-key";

const LOGIN = (req, res, next) => {
  try {
    const admins = read("admins");
    const { admin_username, password } = req.body;
    const admin = admins.find(
      (admin) =>
        admin.admin_username == admin_username && admin.password == password
    );
    if (!admin) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    res.status(200).json({
      status: 200,
      message: "Success",
      access_token: jwt.sign({ username: admins.admin_id }),
    });
  } catch (error) {
    console.log(error.message);
  }
};

const CHEKTOKEN = (req, res, next) => {
  const { access_token } = req.headers;
  if (!access_token) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  try {
    const masterclass = read("pending");
    const decoded = jwt.verify(access_token, SECRET);
    res.status(200).json(masterclass);
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
const ACTIVATE = (req, res, next) => {
  const { access_token } = req.headers;

  if (!jwt.verify(access_token, SECRET)) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const { ids } = req.query;
  const pending = read("pending");
  const active = read("active");
  const activated = "active";
  const data = pending.filter((master) => {
    const byId = ids ? master.id == ids : true;
    return byId;
  });
  const activate = active.filter((master) => {
    const byId = ids ? master.id == ids : true;
    return byId;
  });
  if (!activate[0]) {
    const newData = {
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      image: data[0].image,
      type: data[0].type,
      date: data[0].date,
      time: data[0].time,
      internal_direction: data[0].internal_direction,
      adress: data[0].adress,
      phone_number: data[0].phone_number,
      email: data[0].email,
      website: data[0].website,
      direction: data[0].direction,
      status: activated,
      created_at: data[0].created_at,
    };

    write("active", [...active, newData]);

    res.status(200).json({
      message: "added",
    });
  }
  try {
    res.status(401).json({ message: "THIS POST HAS BEEN ACTIVE BEFORE" });
  } catch (error) {
    res.status(401).json({ message: "THIS POST HAS BEEN ACTIVE BEFORE" });
  }
};
export default {
  LOGIN,
  ACTIVATE,
  CHEKTOKEN,
};
