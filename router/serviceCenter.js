import express from "express";
import * as centerController from '../controller/serviceCenter.js';
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get('/announcement', isAuth, centerController.getAnnounceMent);
router.post('/announcement', isAuth, centerController.createAnnouncement);
router.put('/announcement/:id', isAuth, centerController.updateAnnouncement);
router.delete('/announcement/:id', isAuth, centerController.removeAnnouncement);

export default router;