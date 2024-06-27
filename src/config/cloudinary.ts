import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';

    // Configuration
    cloudinary.config({ 
        // cloud_name: config.cloudname, 
        // api_key: config.cloudapikey, 
        // api_secret: config.cloudsecret // Click 'View Credentials' below to copy your API secret
        cloud_name: 'dpg78zw9q', 
        api_key: '366177341355391', 
        api_secret: '5ute7_pC_joX--4un2w4I2Mi4qE' 
    });
    



export default cloudinary;