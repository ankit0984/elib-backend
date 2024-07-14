module.exports = {
    apps: [{
        name: "elib",
        Script: "./dist/server.js",
        instances: "max",
        exec: {
            NODE_ENV: "development"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }]
} 
