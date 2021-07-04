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

module.exports = router;