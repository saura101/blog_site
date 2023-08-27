//jshint esversion:6
//initial commit for branch feature 

import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const homeStartingContent = ".";
const aboutContent = "A remarkable about page is genuine, approachable, and distinguished. Visitors should get a glimpse into what working with you might be like. You can include personal interests, stories, and photos that convey the unique story of your business. You may also include information about who’s on your team and what their roles are. About pages are personal to you and your company, so the structure of your about page will vary based on what you want to highlight. However, you’ll start with the same writing process.";
const contactContent = "At Website Builder Expert, we value our readers above all else, and your feedback is necessary to make sure we’re creating and updating the content that matters most. After all, our mission is to help people get online and improve their digital presence. All of our recommendations, guides, and reviews, are there to support readers on this journey. If you have specific comments about our reviews, or any of the pages on our website, we’d encourage you to leave a comment. You can find the comment section below each of our articles, and we respond to these weekly. It’s a great way for us to share and exchange ideas with our community, and we love when readers share feedback! ";

await mongoose.connect(process.env.MONGODB_URL);

const blogSchema = new mongoose.Schema ({
  name : {
    type : String,
    required : [true]
  },
  content : {
    type : String,
    required : [true]
  }
});

const Blog = mongoose.model("Blog",blogSchema);

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/", async(req,res)=> {
  const data = await Blog.find({});
  posts=data;
  //console.log(posts);
  res.render("home.ejs",{con:homeStartingContent,
    blogs: posts
  });

});

app.get("/about",(req,res) =>{
  res.render("about.ejs" ,{con:aboutContent });
});

app.get("/contact", (req,res)=> {
  res.render("contact.ejs", {con :contactContent });
});

app.get("/compose" ,(req,res)=> {
  res.render("compose.ejs");
});

app.get("/posts/:text" ,(req,res)=> {
  //console.log(posts.length);
  for(let i=0;i<posts.length;i++)
  {
    if(_.lowerCase(posts[i].name)===_.lowerCase(req.params.text))
    {
      res.render("post.ejs", { blog : posts[i]});
      break;
    }
  }
});

app.post("/compose", async(req,res) =>{
  //console.log(req.body.blog);
  const post={
    title : req.body.blogtitle,
    blog : req.body.blog
  };
  //posts.push(post);
  const blog = new Blog ({
    name : post.title,
    content : post.blog
  });

  await blog.save();

  res.redirect("/");
});

app.post("/delete", async(req,res)=> {
  console.log(req.body);
  try {
    await Blog.findByIdAndRemove(req.body.blogid);
    console.log("successfully deleted!");
    res.redirect("/");
  } catch(err) {
    console.log(err.message);
    //res.redirect("/");
  }
  
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
