import React, { useEffect, useState } from 'react'; //useEffect faz uma chamada a api quando o componente é exibido na tela
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) { //objeto match possui os parametros da url
    // variavel users recebera um vetor com os devs retornados da api
    const [users, setUsers] = useState([]);

    useEffect(() => { // a funcao é chamada quando o parametro da url id é alterado, faz uma requisicao a api e armazena o resultado
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data); // aqui serao armazenados os devs menos o que esta logado
        }

        loadUsers();
    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className='main-container'>
            <Link to='/'>
                <img src={logo} alt='Tindev' />
            </Link>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => ( // aqui vai percorrer o vetor e armazenar cada dev em uma variavel
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className='buttons'>
                                <button type='button' onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt='Dislike' />
                                </button>
                                <button type='button' onClick={() => handleLike(user._id)}>
                                    <img src={like} alt='Like' />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className='empty'>Acabou :(</div>
                )}
        </div>
    )
}