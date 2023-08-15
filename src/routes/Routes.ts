import express from "express";
import RoleConstroller from "../controller/RoleConstroller";
import UserController from "../controller/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";

const router = express.Router();

// Role Routing
router.get("/role", Authorization.Authenticated, RoleConstroller.getRole);
router.post("/role", RoleConstroller.createRole);
router.patch("/role/:id", RoleConstroller.updateRole);
router.delete("/role/:id", RoleConstroller.deleteRole);
router.get("/role/:id", RoleConstroller.GetRoleById);

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

export default router;
