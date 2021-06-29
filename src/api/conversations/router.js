const { Router } = require('express')

module.exports = () => {
    const router = Router()

    router.get('/', (res, req, next) => {
        res.send('Hello from the conversation Router!')
    })

    return router
}