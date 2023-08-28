const User = require("../Models/User");

class UserController {
  async getUser(req, res) {
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
  }

  async addPlace(req, res) {
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
      res.status(200).json({ message: "Место успешно добавлено" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error while adding place ${error.message}` });
    }
  }

  async deletePlace(req, res) {
    const { userId, placeToDelete } = req.query;
    console.log("USER ID", userId);
    console.log(placeToDelete);
    try {
      const result = await User.updateOne(
        { _id: userId },
        { $pull: { places: placeToDelete } }
      );

      if (result.modifiedCount > 0) {
        res.json({ message: "Место было успешно удалено" });
      } else {
        res.json({ message: "Место не найдено" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error while deleting post ${error.message}` });
    }
  }
}

module.exports = new UserController();
