import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
dotenv.config();
import dotenv from "dotenv";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    console.log(req.headers.authorization); // Log the authorization header value

    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_Secrete
    );
    req.user = decode;
    next();
  } catch (error) { 
    console.log(error , "middlewareError");
    res.status(401).send('Unauthorized'); // Respond with unauthorized status
  }
};


//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};