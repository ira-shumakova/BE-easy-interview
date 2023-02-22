import express from "express";
import controllers from "../controllers/Result";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.result.create), controllers.createResult);
router.get('/get/:resultId', controllers.readResult);
router.get('/get', controllers.readAllResults);
router.get('/filter/:candidateId', controllers.resultsByCandidate);
router.delete('/delete/:resultId', controllers.deleteResult);

export = router;