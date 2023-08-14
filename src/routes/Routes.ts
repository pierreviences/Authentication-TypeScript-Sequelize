import express from "express";
import RoleConstroller from "../controller/RoleConstroller";
import UserController from "../controller/UserController";

const router = express.Router();

// Role Routing
router.get("/role", RoleConstroller.getRole);
router.post("/role", RoleConstroller.createRole);
router.patch("/role/:id", RoleConstroller.updateRole);
router.delete("/role/:id", RoleConstroller.deleteRole);
router.get("/role/:id", RoleConstroller.GetRoleById);

// User Routing
router.post("/user/register", UserController.Register);

export default router;
