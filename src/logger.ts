import pino from 'pino'

const Logger = pino({
    prettyPrint: true,
    level: process.env.LOG_LEVEL || 'info'
})

export default Logger
