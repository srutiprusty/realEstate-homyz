import express from "express";
import { createResidency, getAllResidencies, getResidency } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", jwtCheck, createResidency)
router.get("/allresd", getAllResidencies)                                   //we want even not login they can see all properties..
router.get("/:id", getResidency)
export {router as residencyRoute}