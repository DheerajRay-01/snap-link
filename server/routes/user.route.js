import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { getCurrentUser, logOut } from "../controller/auth.controller.js";
const router = Router()

router.route("/logout").get(authMiddleWare, logOut)
router.route("/current-user").get(authMiddleWare, getCurrentUser)


export default router

