import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import styles from './Register.module.css';
import loginImage from '../login/login.svg';
import SvgLogo from '../../components/logo/SvgLogo';
import { EMAIL_REGEX } from '../../utils/constants';
import useAuth from '../../hooks/useAuth/useAuth';
import useUsers from '../../hooks/useUsers/useUsers';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useUsers();
  const { authenticate } = useAuth();

  const onRegisterSubmit = (data) => {
    try {
      createUser(data);
      authenticate({ token: Date.now(), userInfo: data.email });
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algum erro ocorreu! Tente novamente. ' + error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundSection}>
        <img src={loginImage} className={styles.image} alt="Pessoas celebrando" loading="lazy" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.logoWrapper}>
          <SvgLogo />
        </div>
        <form onSubmit={handleSubmit(onRegisterSubmit)}>
          <div className={styles.formWrapper}>
            <label htmlFor="name">Nome</label>
            <input
              {...register('name', {
                required: 'Nome é obrigatório.',
              })}
              type="text"
              className={styles.input}
              placeholder="Coloque aqui seu nome..."
            />
            <span className={styles.errorAlert} role="alert">
              {errors?.name?.message}
            </span>
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: 'Email é obrigatório.',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Insira um email válido.',
                },
              })}
              type="email"
              className={styles.input}
              placeholder="Coloque aqui seu email..."
            />
            <span className={styles.errorAlert} role="alert">
              {errors?.email?.message}
            </span>
            <label htmlFor="password">Senha</label>
            <input
              {...register('password', {
                required: 'Senha é obrigatória.',
                minLength: {
                  value: 7,
                  message: 'A senha deve possuir no mínimo 7 caracteres.',
                },
              })}
              type="password"
              className={styles.input}
              placeholder="Coloque aqui sua senha..."
            />
            <span className={styles.errorAlert} role="alert">
              {errors?.password?.message}
            </span>
            <button type="submit" className={styles.submitButton}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
