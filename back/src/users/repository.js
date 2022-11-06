const AWS = require('aws-sdk');
const CognitoIdentity = require('amazon-cognito-identity-js')
const uuid = require('uuid');

module.exports.usersRepository = () => {
  const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'us-east-1' });
  const clientId = '755ao9cj8j257b9u605of5huff';
  const userPoolId = 'us-east-1_AF5l44Ear';

  return {
    signIn: async (user) => {
      if (!user || !user.email || !user.password) {
          throw('Invalid parameters.');
      }

      const poolData = {
          UserPoolId: userPoolId,
          ClientId: clientId
      };
      const userPool = new CognitoIdentity.CognitoUserPool(poolData);
      const authData = {
          Username: user.email,
          Password: user.password
      };
      const authDetails = new CognitoIdentity.AuthenticationDetails(authData);
      const userData = {
          Username: user.email,
          Pool: userPool
      };

      const cognitoUser = new CognitoIdentity.CognitoUser(userData);
      return new Promise(function(resolve, reject) { 
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: resolve,
          onFailure: reject
        });
      });
    },
    signUp: async (user) => {
      const param = {
        ...user,
        ClientId: clientId,
      };
      cognito.signUp(param, function (err, data) {
        if (err) throw ('Unable to signUp. Error:', JSON.stringify(err, null, 2)); // an error occurred
        else return { response: "User successfully registered" };           // successful response
      });
    },
    getUsers: async () => {
      const params = {
        UserPoolId: 'us-east-1_AF5l44Ear',
        AttributesToGet: [
          "email",
          "name"
        ],
        Limit: 0
      };
      const data = await cognito.listUsers(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else return data;           // successful response
      }).promise();
      return data.Users;
    }
  };
};
