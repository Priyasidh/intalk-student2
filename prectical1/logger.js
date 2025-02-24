const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(
            { 
                filename: 'error.log', 
                level: 'info',  
                format: winston.format.combine(
                    winston.format.json(),
                    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
                    winston.format.prettyPrint()
                ),
            }),
        new winston.transports.File(
            { 
                filename: 'combined.log', 
                level: 'error', 
                format: winston.format.combine(
                    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), 
                    winston.format.json(),
                    winston.format.prettyPrint()
                
                ) }),
    ],
})

module.exports = { logger }