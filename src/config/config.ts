import { config as conf } from 'dotenv'

conf(); // This will load the .env file into process.env

const _config={
    port: process.env.PORT,
    dburi: process.env.MONGOURI,
    env: process.env.Node_ENV,
    jwtsecret: process.env.JWT_SECRET,
    cloudname: process.env.CLOUD_NAME,
    cloudapikey: process.env.API_KEY,
    cloudsecret: process.env.API_SECRET
}

export const config = Object.freeze(_config); //by using Object.freeze() we can make sure that the object is immutable. This means that we can't change the properties of the object after it has been created. This is a good practice to ensure that the configuration object is not accidentally modified during runtime.