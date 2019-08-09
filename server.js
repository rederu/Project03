const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


//MongoDB
// Connect to the Mongo DB
mongoose
.connect(process.env.MONGODB_URI || "mongodb://localhost/itemstock", {useNewUrlParser: true})
.then(() => console.log("MongoDB connected"))
.catch (err => console.log ("Error: ", err))


// Define API routes here
const item = require("./routes/item");


app.use("/", item);

app.use((req,res,next)=>{
  const error = new Error("Unable to manage the request");
  //send a status code error
  error.status= 404;
  //forward the request with the error
  next(error);
})

//------------- error message
app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
      "error": {
          "message": error.message
      }
  })
});
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
