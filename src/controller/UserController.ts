import User from "../db/models/User";
import express from "express";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";
import Jwt from "../helpers/Jwt";
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

const Login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unathorized", null, null));
    }

    const matched = await PasswordHelper.passwordCompare(
      password,
      user.password
    );
    if (!matched) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unathorized", null, null));
    }

    const dataUser = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
    };
    const token = Jwt.GenerateToken(dataUser);
    const refreshToken = Jwt.GenerateRefreshToken(dataUser);

    user.accessToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const responseUser = {
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      verified: user.verified,
      active: user.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helper.ResponseData(200, "OK", null, responseUser));
  } catch (error: any) {
    return res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const RefreshToken = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unatuhorized", null, null));
    }

    const decodedUser = Jwt.ExtractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unatuhorized", null, null));
    }
    const token = Jwt.GenerateToken({
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });
    const resultUser = {
      name: decodedUser.name,
      email: decodedUser.email,
      roleId: decodedUser.roleId,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token,
    };

    return res
      .status(200)
      .send(Helper.ResponseData(200, "OK", null, resultUser));
  } catch (error) {
    res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const UserDetail = async (req: express.Request, res: express.Response) => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(Helper.ResponseData(404, "User Not Found", null, null));
    }

    user.password = "";
    user.accessToken = "";

    return res.status(200).send(Helper.ResponseData(200, "OK", null, user));
  } catch (error) {
    res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};

const UserLogout = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(200)
        .send(Helper.ResponseData(200, "User logout", null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(Helper.ResponseData(200, "User logout", null, null));
    }

    await user.update({ accessToken: null }, { where: { email: email } });
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .send(Helper.ResponseData(200, "User logout", null, null));
  } catch (error) {
    res.status(500).send(Helper.ResponseData(500, "", error, null));
  }
};
export default { Register, Login, RefreshToken, UserDetail, UserLogout };
