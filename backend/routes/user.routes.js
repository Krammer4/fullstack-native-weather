const { Router } = require("express");
const User = require("../Models/User");
const router = Router();

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while fetching user data ${error.message}` });
  }
});

router.post("/user/add-place", async (req, res) => {
  const { place, userId } = req.body;
  console.log(place);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.places.includes(place)) {
      return res
        .status(400)
        .json({ message: "Это место уже было добавлено вами" });
    }

    user.places.push(place);
    await user.save();
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while adding place ${error.message}` });
  }
});

module.exports = router;
