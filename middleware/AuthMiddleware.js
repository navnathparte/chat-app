import jwt from "jsonwebtoken";
import constant from "./constants.js";
const secret = constant.JWTKEY;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        throw new Error("unathorized");
      }
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;
