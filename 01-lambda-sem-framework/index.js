async function handler(event, context) {
    console.log('Hello World from ew.it !!!', JSON.stringify(process.env, null, 2))
    console.log('event: ', JSON.stringify(event, null, 2))

    return {
        message: 'Hello from EW-IT SLS Course'
    }
}

module.exports = {
    handler
}