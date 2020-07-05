const Blog=require('../models/blog');
const User=require('../models/user');

// get blog by id
exports.getBlog=function(req,res){
    const id=req.query.id;

    Blog.findById(id,function(err,doc){
        if(err)return status(400).send(err);
        res.send(doc);
    })
};

// get all blogs
exports.allBlogs=function(req,res){
    Blog.find(function(err,doc){
        if(err) return res.status(400).send(err);
        res.status(200).json(doc);
    })
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
    const id=req.query.id;

    Blog.findByIdAndUpdate(id,req.body,{new: true},function(err,doc){
        if(err) return res.status(400).json(err);
        res.status(202).json(doc);

    });

};

//delete a blog
exports.deleteBlog=function(req,res){
    const id=req.query.id;

    Blog.findByIdAndDelete(id,function(err,doc){
        if(err) return res.status(400).json(err);
        res.status(200).json({succes: "true",
                doc
        });
    });
};

exports.getReviewer=function(req,res){

};
