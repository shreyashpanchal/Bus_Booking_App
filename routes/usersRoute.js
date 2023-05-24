const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const register = require("../controllers/users/RegisterController");
const login = require("../controllers/users/LoginController");
const getAllUsers = require("../controllers/users/AllUsersController");
const UserById = require("../controllers/users/UserByIdController");
const changeUserPermission = require("../controllers/users/UserPermissionController");
const deleteUser = require("../controllers/users/DeleteUserController");

router.post("/register", register);

router.post("/login", login);

router.post("/get-user-by-id", authMiddleware, UserById);

router.post("/get-all-users", authMiddleware, getAllUsers);

router.post("/update-user-permissions", authMiddleware, changeUserPermission);

router.post("/delete-by-id", authMiddleware, deleteUser);

module.exports = router;
