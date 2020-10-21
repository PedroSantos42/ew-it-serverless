const decoratorValidator = (fn, schema, argsType) => {
    return async function (event) {
        const data = JSON.parse(event[argsType])
        
        const { error, value } = await schema.validate(
            data, { abortEarly: true }
        )
        // alter instance of arguments
        event[argsType] = value
        // arguments is meant to pass forward the income data
        // .apply() will return a function, which is going to be called later
        if (!error) return fn.apply(this, arguments)

        return {
            statusCode: 422, // unProcessable entity
            body: error.message
        }
    }
}

module.exports = decoratorValidator
