// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv/config"

import express from "express"
import app from "./boot/app.mjs"

app(express())
