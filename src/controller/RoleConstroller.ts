import Role from "../db/models/Role";
import express from "express";

const getRole = async (req: express.Request, res: express.Response) => {
  try {
    const role = await Role.findAll({
      where: {
        active: true,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "ok",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errores: error,
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Eror",
      errors: error,
    });
  }
};

const createRole = async (req: express.Request, res: express.Response) => {
  try {
    const { roleName, active } = req.body;

    if (!roleName || !active) {
      return res.status(400).json({
        status: 400,
        message: "isi data dengan benar!!",
      });
    }
    const create = await Role.create({
      roleName,
      active,
    });

    return res.status(201).json({
      status: 201,
      message: "Created",
      data: create,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errores: error,
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Eror",
      errors: error,
    });
  }
};

const updateRole = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        data: null,
      });
    }

    role.roleName = roleName;
    role.active = active;
    await role.save();

    return res.status(200).json({
      status: 200,
      message: "OK",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errores: error,
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Eror",
      errors: error,
    });
  }
};

const deleteRole = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        data: null,
      });
    }

    await role.destroy();

    return res.status(200).json({
      status: 200,
      message: "Deleted",
      data: null,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errores: error,
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Eror",
      errors: error,
    });
  }
};

const GetRoleById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { roleName, active } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data berhasil ditemukan",
      data: role,
    });
  } catch (error: any) {
    if (error != null && error instanceof Error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
        errores: error,
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Internal Server Eror",
      errors: error,
    });
  }
};

export default { getRole, createRole, updateRole, deleteRole, GetRoleById };
