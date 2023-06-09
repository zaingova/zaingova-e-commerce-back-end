const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
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

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
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

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const NewTag = await Tag.create({
      tag_name = req.body.tag_name,
    });
    res.status(200).json(NewTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
