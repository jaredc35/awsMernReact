const Category = require("../models/category");
const slugify = require("slugify");
const formidable = require("formidable");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload"
      });
    }
    console.table({ err, fields, files });
    const { name, content } = fields;
    const { image } = files;
    const slug = slugify(name);
    let category = new Category({ name, content, slug });

    if (image.size > 2 * 10 ** 6) {
      return res.status(400).json({
        error: "Image should be less than 2MB."
      });
    }
    // Upload image to s3
    const params = {
      Bucket: "mernawscourse",
      Key: `category/${uuidv4()}`,
      Body: fs.readFileSync(image.path),
      ACL: "public-read",
      ContentType: "image/jpg" // jpeg images
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Upload to s3 failed." });
      }
      console.log("AWS upload response data: ", data);
      category.image.url = data.Location; // Property from data returned
      category.image.key = data.Key;
      category.save((err, success) => {
        if (err) res.status(400).json({ error: "Error saving to database." });
        return res.json(success); // Return the saved
      });
    });
  });
};

// exports.create = (req, res) => {
//   const { name, content } = req.body;
//   const slug = slugify(name);
//   const image = {
//     url: `https://via.placeholder.com/150.png?text=${process.env.CLIENT_URL}`,
//     key: "123"
//   };
//
//   const category = new Category({ name, slug, image });
//   category.postedBy = req.user._id;
//
//   category.save((err, data) => {
//     if (err) {
//       console.log("Category create error: ", err);
//       return res.status(400).json({
//         error: "Category create failed"
//       });
//     }
//     res.json(data);
//   });
// // };

exports.list = (req, res) => {
  //
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
