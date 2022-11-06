const repository = require('./repository');

module.exports.kudoService = () => {
  const sortObjectArrayByDate = (a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  };

  return {
    createKudo: (kudo) => {
      return repository.kudosRepository().insertKudo(kudo);
    },
    editKudo: (kudo) => {
      return repository.kudosRepository().putKudo(kudo);
    },
    getKudos: async () => {
      const data = await repository.kudosRepository().getKudos();
      return data.sort(sortObjectArrayByDate);
    },
    removeKudo: (id) => {
      return repository.kudosRepository().deleteKudo(id);
    },
    sortObjectArrayByDate,
  };
};
