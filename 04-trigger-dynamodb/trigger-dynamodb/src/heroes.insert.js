const { v1 } = require('uuid')
const Joi = require('@hapi/joi')
const decoratorValidator = require('./util/decoratorValidator')
const globalEnum = require('./util/globalEnum')

class Handler {
  constructor({ dynamoDbSvc }) {
    this.ddb = dynamoDbSvc
    this.ddbTable = process.env.DYNAMODB_TABLE
  }

  static validator() {
    return Joi.object({
      name: Joi.string().min(2).max(100).required(),
      power: Joi.string().max(20).required()
    })
  }

  async insertItem(params) {
    return await this.ddb.put(params).promise()
  }

  prepareData(data) {
    const params = {
      TableName: this.ddbTable,
      Item: {
        ...data,
        id: v1(),
        createdAt: new Date().toISOString()
      }
    }

    return params
  }

  handlerSuccess(data) {
    const result = {
      statusCode: 200,
      body: JSON.stringify(data)
    }

    return result
  }

  handlerError(data) {
    const result = {
      statusCode: data.statusCode || 501,
      headers: { 'Content-type': 'text/plain' },
      body: 'Couldn\'t create item!'
    }

    return result
  }

  async main(event) {
    try {
      // DECORATOR modifies event.body to JSON
      const data = event.body

      const ddbParams = this.prepareData(data)

      await this.insertItem(ddbParams)

      return this.handlerSuccess(ddbParams.Item)
    } catch (error) {
      console.log('error: ', error)
      return this.handlerError({ statusCode: 500 })
    }
  }
}

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()
const handler = new Handler({
  dynamoDbSvc: ddb
})

module.exports = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  globalEnum.ARG_TYPE.BODY)
