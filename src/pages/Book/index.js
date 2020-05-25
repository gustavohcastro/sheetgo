import React, {useEffect, useState} from 'react';

import {Container, Comments, Owner, Loading, BackButton} from './styles';
import {FaArrowLeft, FaPlus, FaEdit, FaTrash} from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';

export default function Book({match}){

    const crypto = require('crypto');
    const history = useHistory();

    const [idBook, setIdBook] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [deleted, setDeleted] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState('');
    
    const [newcomment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    
    
    

    useEffect(()=>{
        
        async function load(){
            const bookTitle =  decodeURIComponent(match.params.title);
            const data = JSON.parse(localStorage.getItem('BOOKS'));

            data.map( (item) => {
                if(item.title === bookTitle){
                    setTitle(item.title);
                    setAuthor(item.author);
                    setCategory(item.category);
                    setDeleted(item.deleted);
                    setDescription(item.description);
                    setIdBook(item.id);
                    setTimeStamp(item.timestamp);
                }
            })

            const commentsData = JSON.parse(localStorage.getItem('COMMENTS'));
            setComments(commentsData);
            setLoading(false)
        }

        load()
    },[match.params.title]);

    useEffect(()=>{
        localStorage.setItem('COMMENTS', JSON.stringify(comments))
    },[comments])

    function handleAddComment(e){
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        try{
            if (comments === ''){
                setAlert('Preencha todos os campos');
                throw new Error('Preencha todos os campos');
            }   
            const id = crypto.randomBytes(6).toString('hex');
            const data = {
                id : id,
                parentId : idBook,
                body : newcomment,
                deleted : false,
                timestamp : Date.now()
                
            }
            console.log(data);
            setComments([...comments, data]);
            setNewComment('');
        }catch(error){
            setAlert(true);
            console.log(error)
        }finally{
            setLoading(false);
        }
       
    }

    async function handleUpdate(e){
        e.preventDefault();

        const update = {
            id : idBook,
            title : title,
            deleted : deleted,
            timestamp : timeStamp,
            description : description,
            category : category,
            author : author
        }
        const data = JSON.parse(localStorage.getItem('BOOKS'));

        data.map( (item, index) => {
            if( item.id === update.id){
                data[index] = update;
            }
        });
        
       await  localStorage.setItem('BOOKS', JSON.stringify(data));

    }

    async function handleDelete(e){
        e.preventDefault();

        const update = {
            id : idBook,
            title : title,
            deleted : true,
            timestamp : timeStamp,
            description : description,
            category : category,
            author : author
        }
        const data = JSON.parse(localStorage.getItem('BOOKS'));

        data.map( (item, index) => {
            if( item.id === update.id){
                data[index] = update;
            }
        });
        
       await  localStorage.setItem('BOOKS', JSON.stringify(data));
       history.push('/');
    }

    if (loading){
        return(
        <Loading>
            <h1>Carregando</h1>
        </Loading>
        )
    }
    return(
        <Container>
            <BackButton to="/">
                <FaArrowLeft size={30} color="#0d2636"/>
            </BackButton>
            <Owner>
                <h1>{title}</h1>
                <span>Criado em : {timeStamp}</span>
                <p>{alert}</p>
                <input type="text" placeholder="Nome do Autor" value={author} onChange={e => setAuthor(e.target.value)}/>
                <textarea value={description} placeholder="Descrição do Livro" onChange={e => setDescription(e.target.value)}></textarea>
                
                <div>
                    <select value={category} onChange={ e => setCategory(e.target.value)}>
                        <option value="">Escolha uma categoria</option>
                        <option value="reading">Estou lendo</option>
                        <option value="wantToRead">Quero Ler</option>
                        <option value="read">Já lido</option>
                    </select>
                    <button onClick={handleUpdate}>Salvar</button>
                    <button onClick={handleDelete}>Excluir</button>
                </div>    
            </Owner>
            <Comments>
                <h2>Comentários</h2>
                <form>
                    <input type="text" placeholder="Digite seu comentário aqui"
                    value={newcomment} onChange={ text => setNewComment(text.target.value)}
                    />
                    <button onClick={handleAddComment}>
                        <FaPlus size={32} color="#fff"/>
                    </button>
                </form>
                <ul>
                    {comments.map( comentario => {
                    if (comentario.parentId === idBook) {
                        return (
                            <li>
                                <div>
                                    <Link>
                                        <FaEdit color="#9A1449" size={20}/>
                                    </Link>
                                    <p>{comentario.body}</p>
                                </div>
                                <Link>
                                    <FaTrash color="#9A1449" size={20}/>
                                </Link>
                            </li>
                        )
                    }else{
                        return false;
                    }
                            
                    })}
                  
                   
                </ul>
            </Comments>         
        </Container>
        
    )
}