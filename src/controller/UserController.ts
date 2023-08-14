import User from "../db/models/User";
import express from "express";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";
const Register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, cofirmPassword } = req.body;
    const passwordHashed = await PasswordHelper.passwordHashing(password);
    const user = await User.create({
      name,
      email,
      password: passwordHashed,
      active: true,
      verified: true,
      roleId: 1,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "Created User", null, user));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

export default { Register };
