const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll({
      include: [
        { model: Product },
        { model: ProductTag }
      ],
    });

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id {
      include: [
        { model: Product },
        { model: ProductTag }
      ],
    });

    if (!TagData) {
      res.status(404).json({ message: "No tag found with that ID!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const NewTag = await Tag.create({
      tag_name = req.body.tag_name,
    });
    res.status(200).json(NewTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const UpdatedTag = await Tag.update(req.body {
      where: {
        id: req.params.id,
      },
    });

    if (!UpdatedTag[0]) {
      res.status(404).json({ message: "No tag found with that ID!" });
      return;
    }

    res.status(200).json("Tag added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
