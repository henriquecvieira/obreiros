import healthCheck from "../../src/maintenance/healthcheck.mjs"
import wrongWay from "../../src/maintenance/wrongWay.mjs"
import user from "../../src/client/routes.mjs"

function registerRoutes(app) {
  app.use(healthCheck)
  app.use(user)
  app.use(wrongWay)
}

export default {
  boot: (app) => {
    registerRoutes(app)
  },
}
