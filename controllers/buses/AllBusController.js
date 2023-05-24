const Bus = require("../../models/busModel");

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find(req.body);
    return res.status(200).send({
      success: true,
      message: "Buses fetched successfully",
      data: buses,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = getAllBuses;
