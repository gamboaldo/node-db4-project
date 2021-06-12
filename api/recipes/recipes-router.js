const router = require("express").Router();
const Recipe = require("./recipes-model");

// const { checkRecipeId } = require("./recipes-middleware");

router.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

router.get("/:recipe_id", (req, res, next) => {
  Recipe.getById(req.params.recipe_id)
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch(next);
});

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: "something went wrong in the recipes router",
    message: err.message,
    stack: err.stack,
  });
});
module.exports = router;
