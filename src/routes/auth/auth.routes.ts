import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { index, create, login, getUserByAccountNumber, getUserByIdentityNumber } from "../../controllers/auth/auth.controller";
import { validate } from "../../middlewares/validator";
import { createUserSchema } from "../../schemas/user.schema";

const router = Router();

router.get("/", verifyToken, index);
router.post("/create", validate(createUserSchema), create);
router.post("/login", login);
router.post("/search/accountNumber", getUserByAccountNumber);
router.post("/search/identityNumber", getUserByIdentityNumber);

export default router;