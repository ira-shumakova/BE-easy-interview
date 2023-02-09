import express from "express";
import controllers from "../controllers/Candidate";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.candidate.create), controllers.createCandidate);
router.get('/get/:candidateId', controllers.readCandidate);
router.get('/get', controllers.readAllCandidates);
router.get('/show/:page', controllers.readCandidatesByPages);
router.get('/find/:username', controllers.findCandidate);
router.patch('/update/:candidateId', ValidateSchema(Schemas.candidate.update), controllers.updateCandidate);
router.delete('/delete/:candidateId', controllers.deleteCandidate);

export = router;