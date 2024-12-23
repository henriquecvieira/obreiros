import { Router } from 'express'
const router = Router()

router.all('*', (request, response) => {
  response.status(400).json({
    message: 'Whoops, wrong way.'
  })
})

export default router
