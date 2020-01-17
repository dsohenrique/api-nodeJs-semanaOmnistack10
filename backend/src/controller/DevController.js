const axios = require('axios')
const Dev = require('../models/Dev')
const Utils = require('../utils/utils')

module.exports = {
 
    async index(request, response){
        return response.json(await Dev.find())
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body
    
        let  dev = await Dev.findOne({github_username})
        
        if(!dev){

            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
            const { name = login, avatar_url, bio} = githubResponse.data
        
            const techsArray = Utils.stringToArray(techs)
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
             dev =  await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }

        return response.json(dev)
        
    }
    
}