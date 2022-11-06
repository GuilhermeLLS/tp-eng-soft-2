const service = require('../../src/kudos/service');
const mockKudos = require('./mocks/kudos.mocks.json')

describe('kudos service', () => {
    const kudosService = service.kudoService()
    it('Should return kudos order by asc', () => {
        const kudosCard = mockKudos.sort(kudosService.sortObjectArrayByDate);
        expect(kudosCard[0].message).toBe('Quarto');
        expect(kudosCard[1].message).toBe('Terceiro');
        expect(kudosCard[2].message).toBe('Segundo');
        expect(kudosCard[3].message).toBe('Primeiro');
    });
});
