import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import callbackChatRouter from "./callbackChat";
import subscribersRouter from "./subscribers";
import storageRouter from "./storage";
import seoStatusRouter from "./seoStatus";
import outreachRouter from "./outreach";
import outreachWebhooksRouter from "./outreachWebhooks";
import clientJobsRouter from "./clientJobs";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(callbackChatRouter);
router.use(subscribersRouter);
router.use(storageRouter);
router.use(seoStatusRouter);
router.use(outreachRouter);
router.use(outreachWebhooksRouter);
router.use(clientJobsRouter);

export default router;
