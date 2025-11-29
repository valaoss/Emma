// Express ve router
const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// Yeni blog formu: GET /blogs/create
router.get("/create", blogController.blog_create_get);

// Blog oluşturma: POST /blogs
router.post("/", blogController.blog_post);

// Tüm bloglar: GET /blogs
router.get("/", blogController.blog_index);

// Test rotaları (Blog modeli burada ayrıca require edilmelidir)
router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.get("/single-blog", (req, res) => {
  Blog.findById("6925e50468be3f64d55c17ba")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// Tek blog detayı: GET /blogs/:id
router.get("/:id", blogController.blog_details);

// Blog silme: DELETE /blogs/:id
router.delete("/:id", blogController.blog_delete);

// Router'ı dışa aktar
module.exports = router;
