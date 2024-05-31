import bodyParser from "body-parser";
import { Router } from "express";
import { index } from "../controllers/index.controller";
import { errorHandler } from "../middlewares/errorHandler";
import authRoutes from "./auth/auth.routes";

const router: Router = Router();
const jsonParser = bodyParser.json({'limit': '20mb'});

router.get("/api/v1", jsonParser, index);
router.use("/api/v1/auth", jsonParser, authRoutes);

router.use(errorHandler);

export default router;