import express from 'express'

export default {
  boot: (app) => {
    app.enable('trust proxy')
    app.use(express.urlencoded({ limit: '2mb', extended: true, parameterLimit: 2000 }));
    app.use(express.json({ limit: '2mb' }));
  }
}
