import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { getCurrentUser, logOut, refreshAccessToken } from "../controller/auth.controller.js";
const router = Router()

router.route("/logout").get(authMiddleWare, logOut)
router.route("/current-user").get(authMiddleWare, getCurrentUser)
router.route("/refresh-token").get(refreshAccessToken)


export default router

