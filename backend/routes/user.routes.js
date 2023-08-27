const { Router } = require("express");
const User = require("../Models/User");
const UserController = require("../Controllers/UserController");
const router = Router();

router.get("/user/:userId", UserController.getUser);

router.post("/user/add-place", UserController.addPlace);

router.delete("/user/delete-place", UserController.deletePlace);

module.exports = router;
