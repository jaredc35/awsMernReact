const Link = require("../models/link");

exports.create = (req, res) => {
  const { title, url, categories, type, medium } = req.body;
  const slug = url;
  let link = new Link({ title, url, categories, type, medium, slug });
  link.postedBy = req.user._id;
  // Get the array of categories
  let arrayOfCategories = categories && categories.split(","); // split on each comma
  link.categories = arrayOfCategories;
  link.save((err, data) => {
    // Save it to mongoDB
    if (err) {
      return res.status(400).json({ error: "Link already exists." });
    }
    res.json(data);
  });
};

exports.list = (req, res) => {
  Link.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({ error: "Could not list links." });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  //
};

exports.update = (req, res) => {
  //
};

exports.remove = (req, res) => {
  //
};
