module.exports = {

    stringToArray(stringAsArray){
        if(stringAsArray){
            return stringAsArray.split(',').map((tech) => tech.trim())
        }
    }
}