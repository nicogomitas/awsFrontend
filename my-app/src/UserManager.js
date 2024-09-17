import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de que el archivo CSS esté importado

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showSparkle, setShowSparkle] = useState(false); // Estado para controlar el efecto de brillitos

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://ec2-35-174-220-50.compute-1.amazonaws.com:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://ec2-35-174-220-50.compute-1.amazonaws.com:5000/add_user', {
        nombre_usuario: nombreUsuario,
        correo,
        contrasena
      });
      setNombreUsuario('');
      setCorreo('');
      setContrasena('');
      fetchUsers(); // Refrescar la lista de usuarios

      // Mostrar el efecto de brillitos
      setShowSparkle(true);
      
      // Eliminar el efecto de brillitos después de 1 segundo
      setTimeout(() => {
        setShowSparkle(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="App">
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
        <button type="submit" className={`sparkles ${showSparkle ? 'sparkle-active' : ''}`}>
          Add User
          <span className="sparkle-effect"></span>
        </button>
      </form>

      <div className="user-list-container">
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.nombre_usuario} - {user.correo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManager;
