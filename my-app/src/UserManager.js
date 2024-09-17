import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserManager from './UserManager';

// Mock de axios
jest.mock('axios');

describe('UserManager', () => {
  test('renders UserManager component', () => {
    render(<UserManager />);
    expect(screen.getByText('Register User')).toBeInTheDocument();
  });

  test('fetches and displays users', async () => {
    const users = [
      [1, 'nicole', 'nicole.gomez01@usa.edu.co'],
      [2, 'rodolfo', 'radolfo_ama_jesus@gmail.com']
    ];

    axios.get.mockResolvedValue({ data: users });

    render(<UserManager />);

    await waitFor(() => {
      expect(screen.getByText('nicole - nicole.gomez01@usa.edu.co')).toBeInTheDocument();
      expect(screen.getByText('rodolfo - radolfo_ama_jesus@gmail.com')).toBeInTheDocument();
    });
  });

  test('submits form and clears input fields', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User added successfully!' } });

    render(<UserManager />);

    fireEvent.change(screen.getByPlaceholderText('Nombre Usuario'), { target: { value: 'juan' } });
    fireEvent.change(screen.getByPlaceholderText('Correo'), { target: { value: 'juan@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Add User'));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Nombre Usuario').value).toBe('');
      expect(screen.getByPlaceholderText('Correo').value).toBe('');
      expect(screen.getByPlaceholderText('Contraseña').value).toBe('');
    });
  });
});
