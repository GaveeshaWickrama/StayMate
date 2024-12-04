const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const userController = require("../controllers/userController");
const { authToken, requireRole } = require("../middleware/authProvider");


//get the profile of a single user
router.get(
  "/:id",
  authToken,
  requireRole("user", "admin", "guest", "host", "technician", "moderator"),
  userController.viewProfile
);

//get the profile of me
router.get(
  "/myProfile",
  authToken,
  requireRole("user", "admin", "guest", "host", "technician", "moderator"),
  userController.getUser
);

//update profile
router.patch(
  "/editProfile",
  authToken,
  requireRole("user", "admin", "guest", "host", "technician", "moderator"),
  upload.single("photo"),
  userController.editProfile
);



//update accountno
router.patch(
  "/addAccountNo",
  authToken,
  requireRole("host"),
  userController.addAccountNo
);

//haven't used the below

//get all users
router.get("/", authToken, requireRole("admin"), userController.getUsers);

//get a single user
// router.get('/:id',authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'),userController.getUser)

//delete a user
router.delete("/:id", userController.deleteUser);

// // patch self user info (id stored in jwt token)
// router.patch('/:id', authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.updateUser);


//to get properties of the host by his id
router.get("/getHostProperties/:id",authToken,requireRole("user", "admin", "guest", "host", "technician", "moderator"),userController.getProperties)

//to get ratings of the host of all properties listed by him
router.get("/getHostRatings/:id",authToken,requireRole("user", "admin", "guest", "host", "technician", "moderator"),userController.getRatings)

module.exports = router;
