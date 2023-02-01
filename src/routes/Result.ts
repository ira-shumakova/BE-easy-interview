import express from "express";
import controllers from "../controllers/Result";

const router = express.Router();

router.post('/create', controllers.createResult);
router.get('/get/:resultId', controllers.readResult);
router.get('/get', controllers.readAllResults);
router.patch('/update/:resultId', controllers.updateResult);
router.delete('/delete/:resultId', controllers.deleteResult);

export = router;