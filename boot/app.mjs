import AppProvider from "./providers/AppProvider.mjs"
import Application from "../config/app.mjs"
import Compression from "./middlewares/Compression.mjs"
import CoreProvider from "../src/core/providers/EventProvider.mjs"
import ExceptionHandler from "./exception/ExceptionHandler.mjs"
import QueryString from "./middlewares/QueryString.mjs"
import RouteProvider from "./providers/RouteProvider.mjs"
import cors from "cors"
import swaggerDocument from "../infra/documents/swagger.js"
import swaggerUi from "swagger-ui-express"
import "../src/events/eventListener.mjs"

// Date.prototype.toJSON = function () {
//   this.setUTCHours(this.getUTCHours() - 3)
//   return this.toISOString()
// }

async function registerProviders(express) {
  AppProvider.boot(express)
  RouteProvider.boot(express)
  CoreProvider.boot(express)
}

function boot(express) {
  return express.listen(Application.port, () => {
    console.log(`Aplicação inicializada na porta ${Application.port}.`)
  })
}

export default async (express) => {
  express.use(Compression())
  express.use(cors())
  express.use(QueryString)
  express.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        docExpansion: "none",
      },
    })
  )

  await registerProviders(express)

  ExceptionHandler.handle(express)

  boot(express)
}
