import connectDB from './db/indexDB.js'
import app from "./app.js";
import dotenv from 'dotenv'


dotenv.config({
  path: "./.env",
});

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log('server listening on port 3000');

})
}).catch((error)=>{
    console.log("error in db connection : ", error)
    process.exit(1)
})