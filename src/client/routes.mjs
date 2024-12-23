/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
  createUser,
  loginUser,
  updateUserForm,
  addUserService,
  createAdminUser,
  getUser,
  getManyUsers,
  resetPassword,
  recoverPassword,
  getApp,
  logicalDeleteUser,
} from "../client/controllers/userController.mjs"
import { getLogsByAction, getLogsByDate, getLogsByUserId } from "../client/controllers/logContoller.mjs"
import applicationToken from "../../infra/json_webtoken/applicationToken.mjs"
import validateToken from "../../infra/json_webtoken/authToken.mjs"
import validateTokenId from "../../infra/json_webtoken/authTokenId.mjs"
import recoverPasswordAuthToken from "../../infra/json_webtoken/recoverPasswordAuthToken.mjs"

import { Router } from "express"

const router = Router()

router.route("/v1/createUser").post(applicationToken, createUser)
router.route("/v1/loginUser").post(applicationToken, loginUser)
router.route("/v1/:id/updateUserForm").post(validateTokenId, updateUserForm)
router.route("/v1/:id/service").post(validateToken, addUserService)
router.route("/v1/admin/create-user").post(createAdminUser)
router.route("/v1/:_id/user").get(validateTokenId, getUser)
router.route("/v1/users").get(validateToken, getManyUsers)
router.route("/v1/users/reset-password").post(validateToken, resetPassword)
router
  .route("/v1/users/recover-password")
  .post(recoverPasswordAuthToken, recoverPassword)
router
  .route("/v1/users/logicalDeleteUser")
  .post(validateToken, logicalDeleteUser)
router.route("/v1/me").get(validateToken, getApp)
router.route("/v1/user/getLogsByAction").get(validateToken, getLogsByAction)
router.route("/v1/user/getLogsByDate").get(validateToken, getLogsByDate)
router.route("/v1/user/getLogsByUserId").get(validateToken, getLogsByUserId)

export default router
