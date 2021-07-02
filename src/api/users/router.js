const { Router } = require('express')
const { fetchChatData, User } = require('../../store')

module.exports = () => {
    const router = Router()

    router.get('/:id', async (req, res, next) => {

        try {
            const data = await fetchChatData(User, req.params.id)

            res.send(data)
        } catch (err) {
            next(err)
        }
    })

    return router
}