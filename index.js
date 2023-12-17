import bodyParser from 'body-parser';
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import BlogPost from './post.js';




const app = express();
const port = 3000;
const __dir = dirname(fileURLToPath(import.meta.url));

const blogPost = new BlogPost();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


let firstPost = {body:{
    author: "Travis Schlief",
    title: "First Post",
    content: "Hello readers! Welcome to the first-ever blog post on our exciting new blog. We're thrilled to have you here and can't wait to share all sorts of interesting content with you.",
}
}

blogPost.createPost(firstPost);



app.listen(3000, (e)=> {
    if(e) throw e;
    console.log(`Server listening on port ${port}`);
})

app.get("/", (req, res)=>{
    
    res.render(__dir + "/views/index.ejs", {posts: blogPost.posts});

})

app.get("/compose", (req, res)=>{
    res.render(__dir + "/views/compose.ejs");

})

app.get("/about", (req, res)=>{
    
    res.render(__dir + "/views/about.ejs");

})
app.get("/post*", (req, res)=>{
    let id = parseInt(req.query.id);
    res.render(__dir + "/views/post.ejs", {post: blogPost.getPost(id)});

})

app.get("/delete*", (req, res)=>{
    let id = parseInt(req.query.id);
    blogPost.deletePost(id);
    res.redirect("/")

})

app.get("/edit*", (req, res)=>{
    
    let id = parseInt(req.query.id);
    res.render(__dir + "/views/compose.ejs", {post: blogPost.getPost(id)});
})

app.post("/create-post", (req, res)=>{
    
    blogPost.createPost(req);
    res.redirect("/")

})

app.post("/edit-post*", (req, res)=>{
    
    blogPost.editPost(req);
    res.redirect("/")

})