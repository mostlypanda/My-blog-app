const config={
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET : 'mysupersecretkey',
        DATABASE: 'mongodb+srv://test:test@cluster0-bi1rv.mongodb.net/blog-app?retryWrites=true&w=majority'
    }
}

exports.get=function get(env){
    return config[env]||config.default
}