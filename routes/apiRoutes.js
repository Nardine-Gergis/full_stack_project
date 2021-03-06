const router = require("express").Router();
const db = require("../models");
//Route for finding book by title
router.get("/:book", (req,res) => {
    const findBook = db.Book.findOne({where: {title: req.params.book}});
    const { title, author, description } = findBook;
    res.json({ title,author, description });
})
// Route for finding books by author
router.get("/:author", (req,res) => {
    const findBook = db.Book.findOne({where: {author: req.params.author}});
    const { title, author, description } = findBook;
    res.json({ title, author, description });
})
// Route for posting(adding) books to database
router.post("/book", (req,res) => {
    db.Book.create(req.body).then(function(dbBook) {
        res.json(dbBook);
    });
})

// Get all books
router.get("/all/:id", function(req, res) {

    // Finding all Books, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    db.Book.findAll({
        where: {
           UserId: req.params.id
        }
    }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });

  });

module.exports = router;
