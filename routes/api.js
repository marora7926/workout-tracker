// Access express package and workout.js file
const router = require("express").Router();
const Workout = require("../models/Workout.js");

// Creating a new workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


// Updating the exisitng entry by id
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
      req.params.id, 
      { $push: {exercises: req.body} },
      { upsert: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  //route to find all workouts
  router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration"},
        },
      },
    ])
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  //route to find the stats
  router.get("/api/workouts/range", (req, res) => {
    Workout.find({})    
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

module.exports = router;