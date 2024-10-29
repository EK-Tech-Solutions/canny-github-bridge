import express from 'express';
const router = express.Router();


// Import the verification function from the canny.util.js file
import { verify } from '../utils/canny.util.js';

// Import the webhook function from the canny.controller.js file
import { webhook } from '../controllers/canny.controller.js';

// POST request to /canny/ will be handled by the webhook function in the canny.controller.js file
router.post('/', verify, webhook);


export default router;