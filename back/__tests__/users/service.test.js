const service = require('../../src/users/service');
describe('kudos service', () => {
    const userService = service.usersService()
    it('Should return Login Successfully message', () => {
        const successfullyLoginResponse = userService.succesfullyLogin();
        expect(successfullyLoginResponse.message).toBe('Login Successfully');
    });
    it('Should parse data to aws format', () => {
        const user =  {
            name: 'Teste',
            email: 'teste@email.com',
            password: 'teste senha'
        };
        const awsUserFormat = userService.parseUserDataToAwsFormat(user)
        expect(awsUserFormat.Username).toBe(user.email);
        expect(awsUserFormat.Password).toBe(user.password);
        expect(awsUserFormat.UserAttributes[0].Name).toBe('name');
        expect(awsUserFormat.UserAttributes[0].Value).toBe(user.name);
    });
    it('Should return attribute value when is exist', () => {
        const attribute = [{
            Name: "test",
            Value: 0
        }]
        const testValue = userService.getAtrributeValue(attribute, 'test')
        expect(testValue).toBe(0);
    });
    it('Should return undefined when attribute not exist', () => {
        const attribute = [{
            Name: "test",
            Value: 0
        }]
        const testValue = userService.getAtrributeValue(attribute, 'test2')
        expect(testValue).toBe(undefined);
    });
    it('Should format user data correctly', () => {
        const attributes = [
            {
              Name: "name",
              Value: "nameValue",
            },
            {
              Name: "email",
              Value: "emailValue",
            },
        ];
        const user = [
            {
              Attributes: attributes
            },
        ];
        const formatedUsersData = userService.formatUsersData(user)
        expect(formatedUsersData[0].email).toBe('emailValue');
        expect(formatedUsersData[0].name).toBe('nameValue');
    });
});
