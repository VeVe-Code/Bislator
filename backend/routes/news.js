const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const NewsController = require("../controller/NewsController");
const handleerrormsg = require("../middleware/handleerrormsg");
const AuthMiddleware = require("../middleware/authmiddleware");
const upload = require("../helper/upload");

router.get("/api/news", NewsController.index);
router.get("/api/news/:id", NewsController.show);
  AuthMiddleware
router.post(
  "/api/news",

  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("about").notEmpty(),
  ],
  handleerrormsg,
  NewsController.store
);

router.patch("/api/news/:id",AuthMiddleware, NewsController.update);

router.delete("/api/news/:id", AuthMiddleware, NewsController.destroy);

router.post(
  "/api/news/:id/upload",
AuthMiddleware,
  upload.single("photo"),
  NewsController.upload
);

module.exports = router;
