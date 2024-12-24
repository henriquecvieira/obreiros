/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
  createUser,
  // loginUser,
  // updateUserForm,
  // addUserService,
  // createAdminUser,
  // getUser,
  // getManyUsers,
  // resetPassword,
  // recoverPassword,
  // getApp,
  // logicalDeleteUser,
} from "../client/controllers/userController.mjs"
import { getLogsByAction, getLogsByDate, getLogsByUserId } from "../client/controllers/logContoller.mjs"
import { schedule } from "../client/controllers/scheduleController.mjs"
import applicationToken from "../../infra/json_webtoken/applicationToken.mjs"
import validateToken from "../../infra/json_webtoken/authToken.mjs"
import validateTokenId from "../../infra/json_webtoken/authTokenId.mjs"
import recoverPasswordAuthToken from "../../infra/json_webtoken/recoverPasswordAuthToken.mjs"

import { Router } from "express"

const router = Router()

router.route("/v1/createUser").post(applicationToken, createUser)
router.route("/v1/createUser").post(validateToken, schedule)

export default router
