import Validator from "validatorjs";

import { Request, Response, NextFunction } from "express";

import Helper from "../../helpers/Helper";

import User from "../../db/models/User";

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, roleId, confirmPassword } = req.body;
    const data = {
      name,
      email,
      password,
      roleId,
      confirmPassword,
    };

    const rules = {
      name: "required|string|max:50",
      email: "required|email",
      password: "required|min:8",
      roleId: "required",
      confirmPassword: "required|same:password",
    };

    const validate = new Validator(data, rules);
    if (validate.fails()) {
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", validate.errors, null));
    }

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const errorData = {
        errors: {
          email: ["Email already used"],
        },
      };
      return res
        .status(400)
        .send(Helper.ResponseData(400, "Bad Request", errorData, null));
    }

    next();
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export default { RegisterValidation };
