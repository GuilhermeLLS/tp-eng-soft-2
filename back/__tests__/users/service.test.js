const service = require('../../src/users/service');
const repository = require('../../src/users/repository');

jest.mock('../../src/users/repository');

describe('kudos service', () => {
  const userService = service.usersService();
  it('Should return Login Successfully message', () => {
    const successfullyLoginResponse = userService.succesfullyLogin();
    expect(successfullyLoginResponse.message).toBe('Login Successfully');
  });
  it('Should parse data to aws format', () => {
    const user = {
      name: 'Teste',
      email: 'teste@email.com',
      password: 'teste senha',
    };
    const awsUserFormat = userService.parseUserDataToAwsFormat(user);
    expect(awsUserFormat.Username).toBe(user.email);
    expect(awsUserFormat.Password).toBe(user.password);
    expect(awsUserFormat.UserAttributes[0].Name).toBe('name');
    expect(awsUserFormat.UserAttributes[0].Value).toBe(user.name);
  });
  it('Should return attribute value when is exist', () => {
    const attribute = [
      {
        Name: 'test',
        Value: 0,
      },
    ];
    const testValue = userService.getAtrributeValue(attribute, 'test');
    expect(testValue).toBe(0);
  });
  it('Should return undefined when attribute not exist', () => {
    const attribute = [
      {
        Name: 'test',
        Value: 0,
      },
    ];
    const testValue = userService.getAtrributeValue(attribute, 'test2');
    expect(testValue).toBe(undefined);
  });
  it('Should format user data correctly', () => {
    const attributes = [
      {
        Name: 'name',
        Value: 'nameValue',
      },
      {
        Name: 'email',
        Value: 'emailValue',
      },
    ];
    const user = [
      {
        Attributes: attributes,
      },
    ];
    const formatedUsersData = userService.formatUsersData(user);
    expect(formatedUsersData[0].email).toBe('emailValue');
    expect(formatedUsersData[0].name).toBe('nameValue');
  });
  it('Should signIn successfully', () => {
    const mockedSignIn = jest.fn(() => true);
    repository.usersRepository.mockImplementation(() => {
      return { signIn: mockedSignIn };
    });

    const attributes = [
      {
        Name: 'name',
        Value: 'nameValue',
      },
      {
        Name: 'email',
        Value: 'emailValue',
      },
    ];
    const user = [
      {
        Attributes: attributes,
      },
    ];

    return userService.signIn(user).then((response) => {
      expect(mockedSignIn).toHaveBeenCalledTimes(1);
      expect(response.message).toBe('Login Successfully');
    });
  });
  it('Should signUp successfully', () => {
    const mockedSignUp = jest.fn(() => true);
    repository.usersRepository.mockImplementation(() => {
      return { signUp: mockedSignUp };
    });

    const user = {
      name: 'Name',
      email: 'name@email.domain',
      password: 'R4ND0MP422W0RD',
    };

    return userService.signUp(user).then((response) => {
      expect(mockedSignUp).toHaveBeenCalledTimes(1);
      expect(response).toBe(true);
    });
  });
});
