const Dev = require('../models/Dev')
const Utils = require('../utils/utils')

module.exports = {

    async index(request, response) {
        const { latitude, longitude, techs } = request.query

        const techsArray = Utils.stringToArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        })

        return response.json({
            Devs: devs
        })
    }
}