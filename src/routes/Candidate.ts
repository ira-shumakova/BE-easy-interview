import express from "express";
import controllers from "../controllers/Candidate";

const router = express.Router();

router.post('/create', controllers.createCandidate);
router.get('/get/:candidateId', controllers.readCandidate);
router.get('/get', controllers.readAllCandidates);
router.patch('/update/:candidateId', controllers.updateCandidate);
router.delete('/delete/:candidateId', controllers.deleteCandidate);

export = router;