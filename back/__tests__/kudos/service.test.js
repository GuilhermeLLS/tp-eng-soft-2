const service = require('../../src/kudos/service');
const repository = require('../../src/kudos/repository');
const mockKudos = require('./mocks/kudos.mocks.json');

jest.mock('../../src/kudos/repository');

describe('kudos service', () => {
  const kudosService = service.kudoService();
  it('Should return kudos order by asc', () => {
    const kudosCard = mockKudos.sort(kudosService.sortObjectArrayByDate);
    expect(kudosCard[0].message).toBe('Quarto');
    expect(kudosCard[1].message).toBe('Terceiro');
    expect(kudosCard[2].message).toBe('Segundo');
    expect(kudosCard[3].message).toBe('Primeiro');
  });

  it('Should call insert kudo', () => {
    const newKudo = { name: 'Kudo1' };
    const mockedInsertKudo = jest.fn();
    repository.kudosRepository.mockImplementation(() => {
      return { insertKudo: mockedInsertKudo };
    });

    kudosService.createKudo(newKudo);
    expect(mockedInsertKudo).toHaveBeenCalledTimes(1);
  });

  it('Should call edit kudo', () => {
    const edittedKudo = { name: 'Kudo1+1' };
    const mockedEditKudo = jest.fn();
    repository.kudosRepository.mockImplementation(() => {
      return { putKudo: mockedEditKudo };
    });

    kudosService.editKudo(edittedKudo);
    expect(mockedEditKudo).toHaveBeenCalledTimes(1);
  });

  it('Should call remove kudo', () => {
    const mockedRemoveKudo = jest.fn();
    repository.kudosRepository.mockImplementation(() => {
      return { deleteKudo: mockedRemoveKudo };
    });

    kudosService.removeKudo(1);
    expect(mockedRemoveKudo).toHaveBeenCalledTimes(1);
  });

  it('GetKudos should be sorted', () => {
    const mockedGetKudos = jest.fn(() => mockKudos);
    repository.kudosRepository.mockImplementation(() => {
      return { getKudos: mockedGetKudos };
    });

    return kudosService.getKudos().then((kudoList) => {
      expect(mockedGetKudos).toHaveBeenCalledTimes(1);
      expect(kudoList).toStrictEqual([...mockKudos].sort(kudosService.sortObjectArrayByDate));
    });
  });

  it('GetKudos can return empty list', () => {
    const mockedGetKudos = jest.fn(() => []);
    repository.kudosRepository.mockImplementation(() => {
      return { getKudos: mockedGetKudos };
    });

    return kudosService.getKudos().then((kudoList) => {
      expect(mockedGetKudos).toHaveBeenCalledTimes(1);
      expect(kudoList.length).toBe(0);
    });
  });
});
