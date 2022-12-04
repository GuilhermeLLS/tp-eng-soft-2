import { SWRConfig } from 'swr';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Home';
import useAuth from '../../hooks/useAuth/useAuth';
import useKudos from '../../hooks/useKudos/useKudos';
import useUsers from '../../hooks/useUsers/useUsers';

jest.mock('../../hooks/useAuth/useAuth');
jest.mock('../../hooks/useKudos/useKudos');
jest.mock('../../hooks/useUsers/useUsers');

beforeEach(() => {
  useAuth.mockReturnValue({
    getLoggedUser: () => 'test@test.com',
    isAuthenticated: true,
    logout: jest.fn(),
    authenticate: jest.fn(),
  });
  useKudos.mockReturnValue({
    kudos: [
      {
        sender: { value: 'test@test.com', label: 'test' },
        date: '2022-02-12T20:30:59.943Z',
        recipient: { value: 'larasilva@gmail.com', label: 'lara silva' },
        message: 'Deu bom suas changes',
        id: '458796ee-9a3d-4731-b175-7212950a4a2a',
      },
    ],
    createKudo: jest.fn(),
    deleteKudo: jest.fn(),
  });
  useUsers.mockReturnValue({
    users: [
      { email: 'test@test.com', name: 'test' },
      { email: 'john@gmail.com', name: 'John Lennon' },
    ],
  });
});

describe('Testing Home Page', () => {
  test('should render components correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route
                index
                element={
                  <>
                    <ToastContainer />
                    <Home />
                  </>
                }
              />
            </Route>
          </Routes>
        </SWRConfig>
      </MemoryRouter>
    );

    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Escreva um kudo!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();

    screen.getAllByRole('heading', { name: 'Kudo4Us' }).forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeVisible();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Escreva seu kudo...');

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Para: lara silva')).toBeInTheDocument();
    expect(screen.getByText('Deu bom suas changes')).toBeInTheDocument();
  });

  test('should add kudo', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route
                index
                element={
                  <>
                    <ToastContainer />
                    <Home />
                  </>
                }
              />
            </Route>
          </Routes>
        </SWRConfig>
      </MemoryRouter>
    );

    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Escreva um kudo!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();

    screen.getAllByRole('heading', { name: 'Kudo4Us' }).forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeVisible();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Escreva seu kudo...');

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Para: lara silva')).toBeInTheDocument();
    expect(screen.getByText('Deu bom suas changes')).toBeInTheDocument();

    await selectEvent.select(screen.getByRole('combobox'), ['John Lennon']);

    userEvent.type(screen.getByRole('textbox'), 'teste');
    expect(screen.getByRole('textbox')).toHaveValue('teste');
    expect(screen.getByRole('button', { name: 'Publicar!' })).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Publicar!' }));
    });
    expect(await screen.findByText('Kudo publicado com sucesso!')).toBeInTheDocument();
  });

  test('should delete kudo', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route
                index
                element={
                  <>
                    <ToastContainer />
                    <Home />
                  </>
                }
              />
            </Route>
          </Routes>
        </SWRConfig>
      </MemoryRouter>
    );

    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Escreva um kudo!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument();

    screen.getAllByRole('heading', { name: 'Kudo4Us' }).forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeVisible();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Escreva seu kudo...');

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('Para: lara silva')).toBeInTheDocument();
    expect(screen.getByText('Deu bom suas changes')).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(screen.getByLabelText('deletar kudo'));
    });

    expect(await screen.findByText('Kudo removido com sucesso!')).toBeInTheDocument();
  });
});
