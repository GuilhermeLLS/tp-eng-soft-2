const service = require('../../src/kudos/service');
const repository = require('../../src/kudos/repository');
const mockKudos = require('./mocks/kudos.mocks.json');


jest.mock('../../src/kudos/repository');

describe('kudos service', () => {
    const kudosService = service.kudoService()
    it('Should return kudos order by asc', () => {
        const kudosCard = mockKudos.sort(kudosService.sortObjectArrayByDate);
        expect(kudosCard[0].message).toBe('Quarto');
        expect(kudosCard[1].message).toBe('Terceiro');
        expect(kudosCard[2].message).toBe('Segundo');
        expect(kudosCard[3].message).toBe('Primeiro');
    });

    it('Should call insert kudo', () => {
       const newKudo = {name: 'Kudo1'};
       const mockedInsertKudo =  jest.fn();
       repository.kudosRepository.mockImplementation(() => {
        return {insertKudo: mockedInsertKudo}
       });

        const kudosCard = kudosService.createKudo(newKudo)
        expect(mockedInsertKudo).toHaveBeenCalledTimes(1);
    });
});

