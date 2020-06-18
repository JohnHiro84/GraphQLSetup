const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys');




const Post = require("./models/post");
const User = require("./models/user");

const expressGraphQL = require('express-graphql');
const schema = require("./schema/schema");



mongoose
.connect(db.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to MongoDB successfully'))
  .catch(err => console.log(err));

///added
app.use(bodyParser.json());

app.use(
  "/graphql", expressGraphQL({
    schema,
    graphiql: true
  })
);



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }))

app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router();
//
// const createNewUser = router.post("/new", (req, res) =>{
//   User.findOne({ email: req.body.email}).then(user => {
//     if(user){
//       return res
//         .status(400)
//         .json({ email: "A user has already registered with that address"});
//     } else {
//       console.log(req.body);
//       const newUserObj = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });
//
//       newUserObj
//       .save()
//       .then(savedUser => res.json(savedUser))
//       .catch(err => console.log(err))
//     }
//   });
// });
// app.use("/users", createNewUser);
//
//


const createNewPost = router.post("/new", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    date: req.body.date,
    author: req.body.author
  });

  newPost
    .save()
    .then(savedPost => res.json(savedPost))
    .catch(err => console.log(err));
});

app.use("/posts", createNewPost);

app.listen(5000, () => console.log('server is running on port 5000'));
