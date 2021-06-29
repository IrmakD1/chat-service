const { Router } = require('express')

module.exports = () => {
    const router = Router()

    router.get('/', (req, res, next) => {
        res.send('Hello from the user Router!')
    })

    return router
}