// Access express package and workout.js file
const router = require("express").Router();
const Workout = require("../models/workout.js");

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
    console.log(req.body);
    db.Workout.findByIdAndUpdate(
      {_id: req.params.id}, 
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
    db.Workout.aggregate([
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
  
  //route to find details for last 7 workouts
  router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration"},
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
module.exports = router;