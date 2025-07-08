import { Router } from "express";
import passport from "passport";
import { googleAuth ,failure, logOut, getCurrentUser} from "../controller/auth.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const router = Router();

// 1. Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);

// 2. Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failure"
  }),
  googleAuth 
);


router.route("/failure").get(failure)



export default router;
