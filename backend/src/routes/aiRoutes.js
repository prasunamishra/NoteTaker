import { Router } from 'express';
import { getNoteRecommendation } from '../controllers/aiController.js';    


const router = Router();

router.post('/generaterecommendation', getNoteRecommendation);


export default router;