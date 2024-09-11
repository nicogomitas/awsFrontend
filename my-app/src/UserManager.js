import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://ec2-18-207-226-171.compute-1.amazonaws.com:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://ec2-18-207-226-171.compute-1.amazonaws.com:5000/add_user', {
        nombre_usuario: nombreUsuario,
        correo,
        contrasena
      });
      setNombreUsuario('');
      setCorreo('');
      setContrasena('');
      fetchUsers(); // Refresh the list of users
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.nombre_usuario}>{user.nombre_usuario} - {user.correo}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManager;
