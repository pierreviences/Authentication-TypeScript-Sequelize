import express from "express";
import RoleConstroller from "../controller/RoleConstroller";
import UserController from "../controller/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

// Role Routing
router.get("/role", Authorization.Authenticated, RoleConstroller.getRole);
router.post(
  "/role",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleConstroller.createRole
);
router.patch(
  "/role/:id",
  Authorization.Authenticated,
  Authorization.AdminRole,
  RoleConstroller.updateRole
);
router.delete(
  "/role/:id",

  Authorization.Authenticated,
  Authorization.SuperUser,
  RoleConstroller.deleteRole
);
router.get(
  "/role/:id",
  Authorization.Authenticated,
  RoleConstroller.GetRoleById
);

/*
noted :
- delete : superUser
- create, update: adminRole
- get : basicUser
*/

// User Routing
router.post(
  "/user/register",
  UserValidation.RegisterValidation,
  UserController.Register
);
router.post("/user/login", UserController.Login);
router.get("/user/refresh-token", UserController.RefreshToken);
router.get(
  "/user/current-user",
  Authorization.Authenticated,
  UserController.UserDetail
);
router.get(
  "/user/logout",
  Authorization.Authenticated,
  UserController.UserLogout
);

export default router;
