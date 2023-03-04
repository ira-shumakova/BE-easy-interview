import express from "express";
import controllers from "../controllers/User";
import extractJWT from "../middleware/extractJWT";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.get('/validate', extractJWT , controllers.validateToken);
router.post('/register', ValidateSchema(Schemas.users.create), controllers.register);
router.post('/login', controllers.login);

export = router;