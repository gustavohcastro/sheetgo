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
            //Carrega o livro exibido e os comentarios do mesmo
            const bookTitle =  decodeURIComponent(match.params.title);
            const data = JSON.parse(localStorage.getItem('BOOKS'));

            //inicia os estados com os valores do livro
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

    //ComponentDidUpdate - Quando a lista é atualiza, atualiza o storage
    useEffect(()=>{
        localStorage.setItem('COMMENTS', JSON.stringify(comments))
    },[comments])

    // Compõe um novo comentário
    function handleAddComment(e){
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        try{
            if (comments === ''){
                //Validação
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
            //Organiza os comentários
            setComments([...comments, data]);
            setNewComment('');
        }catch(error){
            setAlert(true);
            console.log(error)
        }finally{
            setLoading(false);
        }
       
    }

    // Atualiza estados e compõe um novo objeto atualizado
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

        //localiza o item correto na lista de livros
        data.map( (item, index) => {
            if( item.id === update.id){
                data[index] = update;
            }
        });
        
        // atualiza os livros
       await  localStorage.setItem('BOOKS', JSON.stringify(data));

    }

    //Deixa de exibir o livro na Home - Controle booleano
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

        //localiza o item correto e atualiza o mesmo na lista
        data.map( (item, index) => {
            if( item.id === update.id){
                data[index] = update;
            }
        });
        
       //persiste os dados no storage e redireciona para a home 
       await  localStorage.setItem('BOOKS', JSON.stringify(data));
       history.push('/');
    }

     //Deixa de exibir o comentario na lista - Controle booleano
    function handleDeleteComment(item){
        item.deleted = true;
        const commentsList = JSON.parse(localStorage.getItem('COMMENTS'));
        commentsList.map( (comentario, index) => {
            if (item.id === comentario.id) {
                commentsList[index] = item;
            }
        })
        setComments(commentsList);
    }

    //Edita o comentário e atualiza a lista
    async function handleEditComment(item){
        const updateComment = prompt("Editando o seu comentário!");

        const update = {
            id : item.id,
            parentId : item.parentId,
            deleted : item.deleted,
            body : updateComment,
            timestamp : item.timestamp
           
        }
        const data = JSON.parse(localStorage.getItem('COMMENTS'));

        //localiza qual o comentário que deve ser atualizado
        data.map( (item, index) => {
            if( item.id === update.id){
                data[index] = update;
            }
        });
        
       //persiste os dados atualizados e atualiza a lista de comentários
        await  localStorage.setItem('COMMENTS', JSON.stringify(data));
        setComments(data);
        
    }
    //caso não tenha carregado os dados do storage, o sistema renderiza uma tela de carregamento
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
                    {
                    comments.map( comentario => {
                    if (comentario.parentId === idBook && comentario.deleted === false) {
                        return (
                            <li key={comentario.id}>
                                <div>
                                    <button onClick={() => {handleEditComment(comentario)}}>
                                        <FaEdit color="#9A1449" size={20}/>
                                    </button>
                                    <p>{comentario.body}</p>
                                </div>
                                <button onClick={()=> {handleDeleteComment(comentario)}}>
                                    <FaTrash color="#9A1449" size={20}/>
                                </button>
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