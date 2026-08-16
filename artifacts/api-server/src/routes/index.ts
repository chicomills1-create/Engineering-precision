import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import callbackChatRouter from "./callbackChat";
import subscribersRouter from "./subscribers";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(callbackChatRouter);
router.use(subscribersRouter);
router.use(storageRouter);

export default router;
