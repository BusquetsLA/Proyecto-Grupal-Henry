const { Router } = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
} = require('../controllers/categoryControllers');

const router = Router();

router.get("/", getCategories);
router.get("/detail/:id", getCategory);
router.post("/create", createCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/update/", updateCategory);

module.exports = router;
