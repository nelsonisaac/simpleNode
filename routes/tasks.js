import express from "express";
import {    getAllTasks,
            createTask,
            deleteTask,
            getTask,
            updateTask } from "../controllers/tasksList.js";

const router = express.Router();

// Router routes/handles specific type of requests like app.get() handles GET method
// app.post() handles POST method requests
// Here we are routing '/' to call getAllTasks and createTask API
// Also , /:name is one of the params. i.e., req.params
router.route('/').get(getAllTasks).post(createTask);
router.route('/:noun').get(getTask).delete(deleteTask).patch(updateTask);

export default router;
