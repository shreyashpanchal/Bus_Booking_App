const router = require("express").Router();
const allBookings = require("../controllers/bookings/AllBookingController");
const bookSeat = require("../controllers/bookings/BookSeatController");
const BookingById = require("../controllers/bookings/BookingByIdController");
const paymentGateWay = require("../controllers/bookings/PaymentContoller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book-seat", authMiddleware, bookSeat);

router.post("/make-payment", authMiddleware, paymentGateWay);

router.post("/get-bookings-by-user-id", authMiddleware, BookingById);

router.post("/get-all-bookings", authMiddleware, allBookings);

module.exports = router;
