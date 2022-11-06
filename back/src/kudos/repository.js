const AWS = require('aws-sdk');
const uuid = require('uuid');

module.exports.kudosRepository = () => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  const TableName = 'kudos';
  return {
    insertKudo: (kudo) => {
      const id = uuid.v4();
      const params = {
        TableName,
        Item: {
          id,
          date: new Date().toISOString(),
          ...kudo,
        },
      };
      try {
        dynamoDB.put(params, function (err, data) {
          if (err) {
            throw ('Unable to add kudo. Error JSON:', JSON.stringify(err, null, 2));
          } else {
            console.log(`Added kudo:" ${JSON.stringify(data, null, 2)}`);
          }
        });
      } catch (err) {
        console.log(err);
      }
      return id;
    },
    putKudo: (kudo) => {
      const params = {
        TableName,
        Item: {
          ...kudo,
        },
      };
      try {
        dynamoDB.put(params, function (err, data) {
          if (err) {
            throw ('Unable to put kudo. Error JSON:', JSON.stringify(err, null, 2));
          } else {
            console.log(`Editted kudo:" ${JSON.stringify(data, null, 2)}`);
          }
        });
      } catch (err) {
        console.log(err);
      }
      return kudo.id;
    },
    getKudos: async () => {
      const params = {
        TableName,
        Select: 'ALL_ATTRIBUTES',
      };
      const data = await dynamoDB
        .scan(params, function (err, data) {
          if (err) {
            throw ('Unable to query. Error:', JSON.stringify(err, null, 2));
          } else {
            console.log(`Query succeeded, ${data.Items.length} returned.`);
          }
        })
        .promise();
      return data.Items;
    },
    deleteKudo: (id) => {
      const params = {
        TableName,
        Key: {
          id: id,
        },
      };
      dynamoDB.delete(params, function (err, data) {
        if (err) {
          throw ('Unable to delete kudo. Error JSON:', JSON.stringify(err, null, 2));
        } else {
          console.log(`Removed kudo:" ${JSON.stringify(data, null, 2)}`);
        }
      });
    },
  };
};
