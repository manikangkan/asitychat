const {
  signIn,
  signUp,
  getAllUsers,
  setAvatar,
  signOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/signout/:id", signOut);

module.exports = router;
