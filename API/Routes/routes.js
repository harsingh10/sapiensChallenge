import express from "express";
const router = express.Router();
import controller from "../Controllers/controller.js";

router.get("/check", (req, res) => {
  res.send("Sapiens Assignment is working fine");
});

router.post("/signUp", controller.initiateUser);
router.post("/login", controller.loginUser);
router.get("/profile", controller.setTheme);
router.post("/setTheme", controller.getProfile);

export { router };
