import express from "express";
import tasks from "./routes/tasks.js"
import "./db/connect.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";

const app = express();

// To access the request body and params, we need to use the express.json()
// By this we can access the req.body giving us the input parameters the user types in the front end
// Ex: req.body has the input users gave and req.params have the URL parameters
app.use(express.json());

//ROUTES   
app.get("/hello", (req,res)=>{
    res.send('staring task manager project');
})


// we are getting the router from the tasks.js controller. So whenever http://localhost:3000/api/v1/tasks/ is hit it calls the router function
// In the router fuction, any route set will be in addition to this route 
// ex: if router had Router.route('/hi').get((req,res)=>{res.send("saying hi")});
// then we need to hit URL as http://localhost:3000/api/v1/tasks/hi
app.use('/api/v1/tasks', tasks);

const PORT = 3000;
//We dont want our server to be started unless it is connected to the database
// So async func hopes for a promise to return, it wont disturb the rest of the code,
// i.e., if the any process in async takes time to return promise, then the JS,
// will move on to next function instead of waiting for the async to complete.
// await keyword, 

dotenv.config();
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);      
        app.listen(PORT, ()=>{ console.log(`listening to ${PORT}`); })   
    } catch (error) {
        console.log(error);
    }
}

start();

