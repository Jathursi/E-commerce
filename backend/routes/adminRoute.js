const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/user-details", adminController.fetchUser);
router.post("/add-user", adminController.addUser);
router.delete("/user/:id", adminController.deleteUser);

module.exports = router;
