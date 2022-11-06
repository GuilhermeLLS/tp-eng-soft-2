import axios from 'axios';
import useSWR from 'swr';

export default function useUsers() {
  const { data, loading, error, mutate } = useSWR('/users');

  const createUser = (body) => {
    axios
      .post('/user', body)
      .then(() => mutate())
      .catch((e) => console.error(e));
  };

  return {
    users: data,
    usersLoading: loading,
    usersError: error,
    mutateUsers: mutate,
    createUser,
  };
}
