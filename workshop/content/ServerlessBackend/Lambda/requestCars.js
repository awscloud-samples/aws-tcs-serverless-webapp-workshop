const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'Cars'
}

async function listCars(){
  console.log("Starting query to fetch cars data.")
  try {
    const data = await ddb.scan(params).promise()
    console.log("Data retrieved, Printing Data from Cars table......")
    console.log(data)
    return data
  } catch (err) {
      console.log("Error occurred while retrieving cars......" + err)
    return err
  }
}

exports.handler = async (event, context, callback) => {
    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }

    const rideId = toUrlString(randomBytes(16));
    console.log('Received event (', rideId, '): ', event);

    // Because we're using a Cognito User Pools authorizer, all of the claims
    // included in the authentication token are provided in the request context.
    // This includes the username as well as other attributes.
    const username = event.requestContext.authorizer.claims['cognito:username'];

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    const requestBody = JSON.parse(event.body);

    const pickupLocation = requestBody.PickupLocation;
    
    const car = await findCar(pickupLocation);
    
    return recordRide(rideId, username, car).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                RideId: rideId,
                Car: car,
                CarName: car.carName,
                Eta: '30 seconds',
                Rider: username,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error("printing error on record ride: "+ err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback)
    });
   
};

// This is where you would implement logic to find the optimal car for
// this ride (possibly invoking another Lambda function as a microservice.)
// For simplicity, we'll just pick a car at random.
async function findCar(pickupLocation) {
    console.log('Finding car for ', pickupLocation.Latitude, ', ', pickupLocation.Longitude);
    const cars = await listCars();
    return cars.Items[Math.floor(Math.random() * cars.Count)];
}

function recordRide(rideId, username, car) {
    console.log("Car inside recordRide function" + car.carName)
    return ddb.put({
        TableName: 'Rides',
        Item: {
            RideId: rideId,
            User: username,
            Car: car,
            CarName: car.carName,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}