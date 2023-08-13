import express from "express";
import RoleConstroller from "../controller/RoleConstroller";

const router = express.Router();

router.get("/role", RoleConstroller.getRole);
router.post("/role", RoleConstroller.createRole);
router.patch("/role/:id", RoleConstroller.updateRole);
router.delete("/role/:id", RoleConstroller.deleteRole);
router.get("/role/:id", RoleConstroller.GetRoleById);

export default router;
