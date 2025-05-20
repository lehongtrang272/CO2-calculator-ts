import { Router } from 'express';
import { calculate } from '../controllers/calculateController';
import { asyncHandler } from '../utils/routerUtil';
const router = Router();

router.post('/calculate', asyncHandler(calculate));

export default router;
