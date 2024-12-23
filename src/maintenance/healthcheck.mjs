import { Router } from "express"
const router = Router()

router
  .route("/healthcheck")
  .get((request, response) => response.json({ status: "healthy" }))

export default router
