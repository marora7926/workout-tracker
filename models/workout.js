// call for required package (i.e., mongoose)
const mongoose = require("mongoose");

// create const Schema
const Schema = mongoose.Schema;

// create const workoutSchema and add content based on seed.js file
const WorkoutSchema = new Schema(
    {
        day: {
            type: Date, //day - include type as date and default as current date and time
            default: Date.now
        },
        exercises: [ // exercise - include the following:
            {
                type: { 
                    type: String, // type as string
                    trim: true,
                },
                name: { 
                    type: String, // name as string
                    trim: true,
                },
                duration: {
                    type: Number, // duration as number
                },
                weight: {
                    type: Number, // weight as number
                },
                reps: {
                    type: Number, // reps as number
                },
                sets: {
                    type: Number, // sets as number
                },
            }
        ],
        totalDuration: {
            type: Number,
            default: 0,
        }            
    }
);

// create mongoose model
const Workout = mongoose.model("Workout", WorkoutSchema);

// export module
module.exports = Workout;