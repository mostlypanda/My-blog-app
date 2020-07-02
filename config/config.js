const config={
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET : 'mysupersecretkey',
        DATABASE: 'mongodb://localhost:27017/blog-app'
    }
}

exports.get=function get(env){
    return config[env]||config.default
}