import { Router } from "express";
import { deleteQr, fetchQr, generateQR } from "../controller/qr.controller.js";
import { 
    createShortLink, 
    redirectToOriginalUrl, 
    protectedLinks, 
    urlDetails,
    toggleActive,
    updateLinkDetails,
    deleteLink,
    fetchMyLinks,
    createShortLinkByGuest,  
} from "../controller/link.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { clickMiddleware } from "../middleware/click.middleware.js";
const router = Router()

// router.route("/create",createShortLink)

router.route("/details/:slug").get(urlDetails)
router.route("/create").post( authMiddleWare,createShortLink)
router.route("/create-by-guest").post(createShortLinkByGuest)
router.route("/protected").post(clickMiddleware, protectedLinks)
router.route("/redirect/:slug").get(clickMiddleware ,redirectToOriginalUrl)

router.route("/generate-qr").post(authMiddleWare,generateQR)
router.route("/all-qr").get(authMiddleWare,fetchQr)
router.route("/delete-qr/:slug").get(authMiddleWare,deleteQr)
router.route("/update-status").patch(authMiddleWare,toggleActive)
router.route("/my-links").get(authMiddleWare,fetchMyLinks)
router.route("/update-details/:slug").post(authMiddleWare,updateLinkDetails)
router.route("/delete/:slug").delete(authMiddleWare,deleteLink)




export default router

