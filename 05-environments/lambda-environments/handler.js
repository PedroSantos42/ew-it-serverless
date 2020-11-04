'use strict';

module.exports.scheduler = async event => {
  console.log('ENVIRONMENT')
  console.log('')
  console.log(process.env)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
