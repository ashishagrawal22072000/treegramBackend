import mongoose from "mongoose";

const connection = () =>
  mongoose
    .connect(
      "mongodb+srv://ashish:ashish123@cluster0.n8lqmm7.mongodb.net/?retryWrites=true&w=majority",
    )
    .then(() => {
      console.log(`DATABASE CONNECTED SUCCESSFULLY`);
    })
    .catch((err) => {
      console.log(`DATABASE ERROR: ${err.message}`);
    });

//   mongoose.connection.on('error', (err) => {});
// mongoose.connection.on('connection', (connect)=>{})
export default connection;
