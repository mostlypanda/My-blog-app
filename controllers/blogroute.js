const Blog=require('../models/blog');
const User=require('../models/user');

// get blog by id
exports.getBlog=function(req,res){
    
};

// get all blogs
exports.allBlogs=function(req,res){

};

// create a blog
exports.createBlog=function(req,res){
    const blog=new Blog(req.body);

    blog.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(201).json({
            post : true,
            blogId : doc._id
        });
    });
};

//update a blog
exports.updateBlog=function(req,res){

};

//delete a blog
exports.deleteBlog=function(req,res){

};

exports.getReviewer=function(req,res){

};
