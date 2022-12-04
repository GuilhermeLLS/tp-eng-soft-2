import Select from 'react-select';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import styles from './Composer.module.css';
import useAuth from '../../hooks/useAuth/useAuth';
import useKudos from '../../hooks/useKudos/useKudos';
import useUsers from '../../hooks/useUsers/useUsers';

export default function Composer() {
  const { getLoggedUser } = useAuth();
  const { users } = useUsers();
  const { createKudo } = useKudos();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  console.log('');
  const loggedUser = getLoggedUser();
  const displayableUsers = users?.reduce((acc, curr) => {
    if (acc.email !== loggedUser) {
      acc.push({
        value: curr.email,
        label: curr.name,
      });
    }
    return acc;
  }, []);

  const onSubmit = (data) => {
    const sender = users.find(({ email }) => email === loggedUser);
    try {
      createKudo({ ...data, sender: { value: sender.email, label: sender.name } });
      toast.info('Kudo publicado com sucesso!');
    } catch (error) {
      toast.error('Erro ao publicar Kudo ' + error);
    }
    reset();
  };

  return (
    <form className={styles.composer} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="recipient"
        rules={{ required: 'Campo obrigatorio!' }}
        render={({ field }) => (
          <Select
            isClearable
            isSearchable
            value={field.value}
            onChange={field.onChange}
            options={displayableUsers}
            placeholder="Kudo para..."
          />
        )}
      />
      <textarea
        className={styles.textarea}
        cols={25}
        rows={5}
        placeholder="Escreva seu kudo..."
        {...register('message', { required: 'Campo obrigatorio!' })}
      />
      <span role="alert">{errors?.message?.message}</span>
      <button className={styles.composerButton} type="submit">
        Publicar!
      </button>
    </form>
  );
}
