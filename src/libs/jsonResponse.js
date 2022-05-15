const jsonResponse = ({statuscode, message, result}) => {
    return {
        statuscode,
        message,
        result 
    }
}

module.exports = jsonResponse; 