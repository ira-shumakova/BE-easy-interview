import express from "express";
import controllers from "../controllers/Question";

const router = express.Router();

router.post('/create', controllers.createQuestion);
router.get('/get/:questionId', controllers.readQuestion);
router.get('/get', controllers.readAllQuestions);
router.patch('/update/:questionId', controllers.updateQuestion);
router.delete('/delete/:questionId', controllers.deleteQuestion);

export = router;