import Task from "../models/modelSchema.js";

/**READ */
const getAllTasks = async (req,res) => {
    try{
        const tasks = await Task.find({});
        res.status(200).send({tasks});
    }catch (error){
        res.status(500).json({msg : error});
    }
}

/**CREATE */
const createTask = async(req,res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({msg: error});
    }

    //res.send("create a task");
}

/**READ */
/*
Example of CRUD operation where we are getting a task with "name":"Learning Node".
First we import the Task model schema , and then use this schema to call the MongoDB 
methods "Model.findOne()" which searches our DB with the given json obj
Here below we are giving req.params as a parameter to the findOne() method
req.params is the paramters given by the user, which is visible in the URL in postman
that params is a json obj, so we are assigning it to const data and sending that as a 
parameter to findOne(data), which is equal to findOne({"name":"Nelson"})

const getTask = async (req,res) => {
    const data = req.params;
    const value = await Task.findOne(data);
               or
    const value = await Task.findOne({"name":"Nelson"});
    res.status(201).json({ value });
   // res.json({identity:req.params});
}*/
const getTask = async (req,res) => {
    try {
        //const value = await Task.findById("653b45f5fea14d60d40a8b31");
        // const value = await Task.findOne({"name":"Nelson"});
        // Here we know the URL params is /:noun so we get the name by req.params.noun;
        // We know the database schema Task has "name" obj in it, so we are searching it
        // by using Task.findOne({"name": data}). Where data is the param given by user 

        /*const data = req.params.noun;
        const value = await Task.findOne({"_id":data});*/
        //         or
        const {noun:TASKID} = req.params;
        const value = await Task.findOne({"_id":TASKID});

        // Here if there is no value in the DB , then it returns null and proceeds further
        // So we manually want it to show an error if there in no value in DB
        // Also make sure to have "return" in the if{}, because if return is not present
        // then execution goes down and it executes res.status(200).json({value})
        // If there is return, then it comes out of the function after exectuing return 
        if(!value){
            return res.status(404).json({msg: `No task with name: ${TASKID}`});
        }
        res.status(201).json({value});
    } catch (error) {
        res.status(500).json({msg: error});
    }

   // res.json({identity:req.params});
}

/**UPDATE */
const updateTask = async (req,res) => {
    try {
        const {noun:TASKID} = req.params;
        // Here by adding {new:true, runValidators:true} we are making the update function follow teh validators
        // which are set by modelSchema. i.e., if we didn't mention the runValidators:true, then if we update the 
        // name as null "name":"" . it considers it and updates in the DB, which we dont want.
        // new:true is to make it show us the updated data in the res.json({value});

        // findOneAndUpdate(--,--,--(optional)) takes 2 args, where the first is the data where you want to update
        // and 2nd arg is the new data which is to be added. Here we want the data that user types, so we are giving req.body
        const value = await Task.findOneAndUpdate({"_id":TASKID}, req.body, {
            new: true,
            runValidators: true,
        });
        if(!value){
            return res.status(404).json({msg: `No task with id: ${data}`});
        }
        res.status(200).json({value});
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

/**DELETE */
const deleteTask = async (req,res) => {
    try {
        const {noun:TASKID} = req.params;
        const value = await Task.findOneAndDelete({"_id":TASKID});
        
        if(!value){
            return res.status(404).json({msg: `No such value: ${data}`});
        }
        res.status(200).json({value});
        
    } catch (error) {
        res.status(500).json({msg : error});
    }
}

export { getAllTasks, 
        getTask, 
        createTask, 
        updateTask, 
        deleteTask };