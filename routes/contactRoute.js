import express from 'express';
import { getQueries, getUserQueries, markQueryResolved, submitQuery } from '../controllers/contactController.js'; // Import your controller function
import { reqSignin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit-query', submitQuery); // Use the submitQuery controller function for handling the POST request
router.get('/queries', getQueries); // Route to fetch queries
router.put('/queries/:id', markQueryResolved); // Route to mark query as resolved
router.get('/user-queries', reqSignin, getUserQueries); // Route to fetch user queries

export default router;
