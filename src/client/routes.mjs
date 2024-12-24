import {
  createUser,
} from "../client/controllers/userController.mjs"
import {
  schedule,
} from "../client/controllers/scheduleController.mjs"

import { Router } from "express"

const router = Router()

router.route("/v1/createUser").post(createUser)
router.route("/v1/createSchedule").post(schedule)
export default router
