const kudosService = require('./src/kudos/service');
const usersService = require('./src/users/service');

const requestManager = (response, statusCode = 200) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: statusCode,
    body: JSON.stringify({ content: response }),
  };
};

const fnHandler = async (_ = context, event) => {
  try {
    const func = FUNCTION_PATH[event.routeKey];
    return await func(event);
  } catch (ex) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Bad request ${ex}`,
      }),
    };
  }
};

const createKudoHandler = (event) => {
  const kudoData = JSON.parse(event.body);
  return Promise.resolve(kudosService.kudoService().createKudo(kudoData)).then((id) => {
    return requestManager({ ...JSON.parse(event.body), id });
  });
};

const getKudos = () => {
  return Promise.resolve(kudosService.kudoService().getKudos()).then((response) =>
    requestManager(response)
  );
};

const editKudoHandler = (event) => {
  const kudoData = JSON.parse(event.body);
  return Promise.resolve(kudosService.kudoService().editKudo(kudoData)).then((id) => {
    return requestManager({ ...JSON.parse(event.body), id });
  });
};

const removeKudo = (event) => {
  const id = event.pathParameters.id;
  return Promise.resolve(kudosService.kudoService().removeKudo(id)).then(() => {
    return requestManager({}, 204);
  });
};

const getUsers = () => {
  return Promise.resolve(usersService.usersService().getUsers()).then((response) =>
    requestManager(response)
  );
};

const signUpUser = (event) => {
  const userData = JSON.parse(event.body);
  return Promise.resolve(usersService.usersService().signUp(userData)).then((response) =>
    requestManager(response)
  );
};

const signIn = (event) => {
  const userData = JSON.parse(event.body);
  return Promise.resolve(usersService.usersService().signIn(userData)).then((response) =>
    requestManager(response)
  );
};

const FUNCTION_PATH = {
  'POST /kudo': createKudoHandler,
  'PUT /kudo': editKudoHandler,
  'GET /kudos': getKudos,
  'DELETE /kudos/{id}': removeKudo,
  'GET /users': getUsers,
  'POST /user': signUpUser,
  'POST /sign-in': signIn,
};

module.exports.handler = async (event, context, callback) => {
  const response = await fnHandler(context, event);
  callback(null, response);
};
