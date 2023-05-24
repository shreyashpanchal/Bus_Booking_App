const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const addBus = require("../controllers/buses/AddBusController");
const deleteBus = require("../controllers/buses/DeleteBusController");
const updateBus = require("../controllers/buses/EditBusController");
const getAllBuses = require("../controllers/buses/AllBusController");
const getBusById = require("../controllers/buses/BusIdController");

router.post("/add-bus", authMiddleware, addBus);

router.post("/update-bus", authMiddleware, updateBus);

router.post("/delete-bus", authMiddleware, deleteBus);

router.post("/get-all-buses", authMiddleware, getAllBuses);

router.post("/get-bus-by-id", authMiddleware, getBusById);

module.exports = router;
