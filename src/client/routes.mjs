import { Router } from "express";
import { createUser } from "../client/controllers/userController.mjs";
import { listWorkers, schedule, taskAssignment, confirmTaskAssignment } from "../client/controllers/scheduleController.mjs";

const router = Router();

router.route("/v1/createUser").post(createUser);
router.route("/v1/obreiro/list").get(listWorkers);
router.route("/v1/escala/create").post(schedule);
router.route("/v1/task/assign").post(taskAssignment);
router.route("/v1/task/confirm/:scheduleId").post(confirmTaskAssignment);

export default router;
