const express = require("express");
const router = express.Router();
const API = require("../controllers/product.controller");
const multer = require("multer");

// multer middleware (lưu trữ file upload)
let storage = multer.diskStorage({
    //hàm function nhận yêu cầu đối số và 1 lệnh gọi lại
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

// tải hình ảnh lên
let upload = multer({
    storage: storage,
}).single("image");

router.get("/", API.fetchAllProduct);
router.get("/:id", API.fetchProductByID);
router.post("/", upload, API.createProduct);
router.patch("/:id", upload, API.updateProduct);
router.delete("/:id", API.deleteProduct);

module.exports = router;