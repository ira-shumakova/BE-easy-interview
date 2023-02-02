import express from "express";
import controllers from "../controllers/Question";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post('/create',ValidateSchema(Schemas.question.create), controllers.createQuestion);
router.get('/get/:questionId', controllers.readQuestion);
router.get('/get', controllers.readAllQuestions);
router.patch('/update/:questionId', ValidateSchema(Schemas.question.update), controllers.updateQuestion);
router.delete('/delete/:questionId', controllers.deleteQuestion);

export = router;