const express = require('express');
const router = express.Router();
const slideModel = require("./slide");
const upload = require('./multer')
const path = require("path");
const uploadsPath = path.join(__dirname, "uploads");
router.use("/uploads", express.static(uploadsPath));

router.get('/', function (req, res) {
  res.render('addslide');
});

router.get('/addslide', function (req, res) {
  res.render('addslide');
});

router.get('/panel', async function (req, res) {
  const slide = await slideModel.find();
  res.render('panel', { slide });
});

//      -----------Create  Slide ------------------//
router.post('/addslide', upload.single('image'), async function (req, res) {
  const { title, description } = req.body;
  const imagefile = req.file ? req.file.filename : null;
  await slideModel.create({ title, description, image: imagefile });
  res.redirect('/newslide');
});

//      -----------Read  Slide ------------------//
router.get('/newslide', async function (req, res) {
  const slide = await slideModel.find();
  res.render('newslide', { slide });
});


//---------------- Update Slide  only text 📝📝📝📝📝------------------//
// router.get('/update/:id', async function (req, res) {
//   const id = req.params.id;
//   const slide = await slideModel.findOne({ _id: id });
//   // console.log(slide);
//   res.render('update', { slide });
// });

// router.post("/updateslide/:id", async function (req, res) {
//   const id = req.params.id;
//   const { title, description } = req.body;
//   await slideModel.findByIdAndUpdate(id, { title, description }, { new: true });
//   const slides = await slideModel.find();
//   res.redirect("/slide");
// });



//--------------  Update Slide  with image  👨‍✈️👩‍✈️👩‍✈️👨‍✈️👩‍✈️👩‍✈️  ------------------//

router.get('/update/:id', async function (req, res) {
  const id = req.params.id;
  const slide = await slideModel.findOne({ _id: id });
  res.render('update', { slide });
});

router.post('/updateslide/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file;
  const updatedSlide = await slideModel.findByIdAndUpdate(id, { title, description, image: image.filename }, { new: true });
  res.redirect("/panel");
});

//      ----------- Delete Slide ------------------//
router.get('/delete/:id', async function (req, res) {
  const id = req.params.id;
  await slideModel.deleteOne({ _id: id });
  const slide = await slideModel.find();
  res.render('panel', { slide });
});

module.exports = router;





//  2 image add krene ke liye ------------------

// router.post('/addslide', upload.array('images', 2), async function (req, res) {
//   const { title, description } = req.body;
//   const images = req.files;
//   const newslide = await slideModel.create({
//     title, description,
//     images: {
//       image: images[0].filename, logo: images[1].filename
//     }
//   });
//   console.log(newslide);
//   res.redirect('/slide');
// });



// router.post('/updateslide/:id', upload.array('images', 2), async function (req, res) {
//   const id = req.params.id;
//   const { title, description } = req.body;
//   const images = req.files; // Define images variable here

//   // Ensure that images were uploaded
//   if (!images || images.length < 1) {
//     return res.status(400).send('At least two images are required.');
//   }

//   try {
//     await slideModel.findByIdAndUpdate(id, {
//       title,
//       description,
//       images: {
//         logo: images[1].filename
//       }
//     }, { new: true });

//     const slides = await slideModel.find();
//     res.render('slide', { slides });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });




// me mongo dB express NodeJS or ejs templating engine ka use kr ke crud operation perform  rahu hu    jab route bana ker different page pe rendering ya rediirecting se ho jata h but jab modal banaker krte h to update route me modal ke reference me kya likhu ki jisse data ki value modal ke popup form me aa ajaye 