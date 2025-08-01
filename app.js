if(process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const dbURL = process.env.ATLAS_DB_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbURL);
}

app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter: 24 * 3600, // time in seconds to avoid frequent updates
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});
//Session Options for Cookies
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // Helps prevent XSS attacks
  },
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});
app.get('/',(req,res)=>{
  res.redirect("/listings");
})
// app.get('/registerUser' ,async (req,res) => {
//   let fakeUser = new User({
//     email:"student@gmail.com",
//     username:"kushagra"
//   });
//   let newUser =  await User.register(fakeUser,"password");
//   res.send(newUser);
// })

app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);


app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { err });
});

//Error Handling
app.use((err,req,res,next)=>{
  let {statusCode=500,message="Something went wrong"}=err;
  res.status(statusCode).send(message);
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server is listening to port 4000");
});