const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    // find all categories with associated products
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    // log data along with status code
    res.status(200).json(CategoryData);
  } catch (err) {
    // logs error if status code is 500 (operation fails)
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    // finds category by primary key (which will be the same as what is entered into the request parameter), including associated products
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // if there is no category with that ID
    if (!CategoryData) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    // creates a new category using the category_name that is entered into the req.body
    const NewCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(NewCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by ID
router.put('/:id', async (req, res) => {
  try {
    // updates category by ID (taken from the req.params.id in the url) using the information taken from the req.body
    const UpdatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if there is no category with that ID
    if (!UpdatedCategory[0]) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json("Category updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // deletes a category by ID (taken from the req.params.id in the url)
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // if no category is found with that ID
    if (!CategoryData) {
      res.status(400).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
