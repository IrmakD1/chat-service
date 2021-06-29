const { Router } = require('express')
const userRouter = require('./users')
const conversationRouter = require('./conversations')

module.exports = () => {
    const router = Router()
    router.use('/user', userRouter())
    router.use('/conversation', conversationRouter())


    return router
}