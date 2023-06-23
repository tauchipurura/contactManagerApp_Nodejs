const {constants} = require('../constants')


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode:500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ 
                title:"Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
        })
            
            break;
        case constants.NOT_FOUND:
            res.json({ 
                title:"Not found", 
                message: err.message, 
                stackTrace: err.stack
        })
        case constants.UNATHORIZED:
            res.json({ 
                title:"unathorized", 
                message: err.message, 
                stackTrace: err.stack
        })
        case constants.FORBIDDEN:
            res.json({ 
                title:"forbiden", 
                message: err.message, 
                stackTrace: err.stack
        })
        case constants.SERVER_ERROR:
            res.json({ 
                title:"server error", 
                message: err.message, 
                stackTrace: err.stack
        })

        default:
            console.log('No error, All good!')
            break;
    }
}

module.exports = errorHandler