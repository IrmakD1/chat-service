const { Router } = require('express')
const { fetchChatData, Conversation } = require('../../store')

module.exports = () => {
    const router = Router()

    router.get('/:id', async (req, res, next) => {

        try {
            const data = await fetchChatData(Conversation, req.params.id)

            res.send(data)
        } catch (err) {
            next(err)
        }
    })

    return router
}