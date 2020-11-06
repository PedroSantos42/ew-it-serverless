const env = require('env-var')

const settings = {
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    commitMessageURL: env.get('APICommitMessagesURL').required().asString(),
    dbTableName: env.get('DBTableName').required().asString()
}

module.exports = settings