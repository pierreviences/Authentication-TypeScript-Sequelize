import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";
import Jwt from "../helpers/Jwt";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    if (token === null) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unathorized", null, null));
    }
    const result = Jwt.ExtractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unathorized", null, null));
    }
    res.locals.userEmail = result?.email;

    next();
  } catch (error: any) {
    res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export default { Authenticated };
