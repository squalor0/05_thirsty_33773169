// Create a new router
const express = require("express");
const router = express.Router();

// Define our data
var shopData = {
  shopName: "The Name Shop",
  productCategories: ["Beer", "Wine", "Soft Drinks", "Hot Drinks"],
  shops: [
    {
      name: "Greenwich",
      manager: "Alice Smith",
      address: ["123 High Street", "Greenwich, London", "SE10 9LS"]
    },
    {
      name: "Camden",
      manager: "Ben Turner",
      address: ["47 Market Road", "Camden, London", "NW1 9JX"]
    },
    {
      name: "Brixton",
      manager: "Chloe Martin",
      address: ["2 Atlantic Road", "Brixton, London", "SW9 8HX"]
    }
  ]
};



// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", shopData)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData)
});

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData)
});

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);
 });

router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
router.post("/registered", (req,res) => { 
  res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! We will send an email to you at '+ req.body.email);    
}); 

// GET /survey – show the survey page
router.get("/survey", (req, res) => {
  res.render("survey.ejs", shopData);
});

// POST /survey_submitted – show the submitted answers tidily
router.post("/survey_submitted", (req, res) => {
  const survey = {
    first: req.body.first || "",
    last: req.body.last || "",
    email: req.body.email || "",
    age: req.body.age || "",
    category: req.body.category || "",              // radio value
    student: req.body.student === "on" ? "Yes" : "No" // checkbox -> Yes/No
  };

  // Pass both shopData and survey to the result template
  res.render("survey_results.ejs", { ...shopData, survey });
});

// Export the router object so index.js can access it
module.exports = router;
