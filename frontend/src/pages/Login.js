import React, { useState } from 'react'; //useState recebe os dados do formulario
import './Login.css';

import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return (
        // esta classe é formatada em login.css, quando clicar no botao chama a funcao handleSubmit
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='Tindev' />
                <input 
                    placeholder='Digite seu usuário no Github' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Enviar</button>
            </form>
        </div>
    ); 
}