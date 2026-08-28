const express = require("express");
const { createDepartmentValidator, updateDepartmentValidator } = require("../validators/departmentValidator");
const validateMiddleware = require("../middleware/validateMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getAllDepartments, getOneDepartment, createDepartment, updateDepartment, deleteDepartment } = require("../controllers/departmentController");

const router = express.Router();

router.get("/", roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), getAllDepartments);
router.get("/:id", roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), getOneDepartment);
router.post("/", createDepartmentValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), createDepartment);
router.patch("/:id", updateDepartmentValidator, validateMiddleware, roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), updateDepartment);
router.delete("/:id", roleMiddleware("SUPER_ADMIN", "COMPANY_ADMIN"), deleteDepartment);

module.exports = router;