import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {FaBook, FaChevronRight, FaPlus, FaSpinner, FaBars} from 'react-icons/fa'
import {Container, Form, SubmitButton, List, SortView} from './styles';

export default function Main(){

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const crypto = require('crypto');

    //DidMount
    useEffect(()=>{
        const repoStorage = JSON.parse(localStorage.getItem('BOOKS'));

        if (repoStorage){
            setRepositorios(repoStorage);
        }

    },[])
    
    //DidUpdate
    useEffect(()=>{
        localStorage.setItem('BOOKS', JSON.stringify(repositorios))
    },[repositorios])

    
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setAlert(null);

        try{
            if (title === '' && author === '' && category === '' ){
                setAlert('Preencha todos os campos');
                throw new Error('Preencha todos os campos');
            }   
                
            const hasRespo = repositorios.find(repo => repo.title === title)

            if (hasRespo){
                setAlert('Livro já existe')
                throw new Error('Livro já existe');
            }
            const id = crypto.randomBytes(6).toString('hex');
            const data = {
                id : id,
                title : title,
                author : author,
                category : category,
                description : '',
                deleted : false,
                timestamp : new Date(Date.now()).toLocaleString()
                
            }

            setRepositorios([...repositorios, data]);
            setTitle('');
            setAuthor('');
        }catch(error){
            setAlert(true);
            console.log(error)
        }finally{
            setLoading(false);
        }
       
    }

    function handleSort(e){
        // const data = 
        // console.log(data)
    }

    return(
      <Container>
        <h1>
            <FaBook size={25}/>
            Meus Livros
        </h1>

        <Form onSubmit={handleSubmit} error={alert}>
            <input type="text" placeholder="Nome do Livro" 
             onChange={e => setTitle(e.target.value)}/>

            <input type="text" placeholder="Autor" 
             onChange={e => setAuthor(e.target.value)}/>

            <select onChange={ e => setCategory(e.target.value)}>
                <option value="">Escolha uma categoria</option>
                <option value="reading">Estou lendo</option>
                <option value="wantToRead">Quero Ler</option>
                <option value="read">Já lido</option>
            </select>
            <SubmitButton loading={loading ? 1 : 0}>
                {
                    loading ? (
                        <FaSpinner color="#FFF" size={14}/>
                    ) : (
                        <FaPlus color="#fff" size={14}/>
                    )
                }
            </SubmitButton>
        </Form>
        <SortView>
            <label>Ordenar por:</label>
            <select onChange={handleSort}>
                <option value="time">Data de Criação</option>
                <option value="alf">Alfábetico</option>
            </select>
        </SortView>
        <Link to="/categories/nocategory">
        <FaChevronRight size={20} color="#9A1449"/>
        <p>Sem Categoria</p>
        </Link>
        <List>
           {repositorios.map(repo => {
                if(repo.category !== '') {
                    return "";
                  }
                  else if(repo.deleted === false){
                  return (
                        <li key={repo.id}>
                        <span>
                            <Link to={`/book/${repo.title}`}>
                                <FaBars color="#9A1449" size={20}/>
                            </Link>
                            {repo.title}
                        </span>
                    
                    </li>
                  )
                }})}
           
        </List>
        <Link to="/categories/reading">
            <FaChevronRight size={20} color="#9A1449"/>
            <p>Estou Lendo</p>
        </Link>
        <List>
           {repositorios.map(repo => {
                if(repo.category === 'reading' && repo.deleted === false) {
                    return (
                        <li key={repo.id}>
                        <span>
                        <Link to={`/book/${repo.title}`}>
                            <FaBars color="#9A1449" size={20}/>
                        </Link>
                            {repo.title}
                        </span>
                      
                    </li>
                  )
                   
                  }
                  else{
                    return "";
                }})}
           
        </List>
        <Link to="/categories/wantToRead">
            <FaChevronRight size={20} color="#9A1449"/>
            <p>Irei Ler</p>
        </Link>
        <List>
           {repositorios.map(repo => {
                if(repo.category === 'wantToRead' && repo.deleted === false) {
                    return (
                        <li key={repo.id}>
                        <span>
                        <Link to={`/book/${repo.title}`}>
                            <FaBars color="#9A1449" size={20}/>
                        </Link>
                            {repo.title}
                        </span>
                       
                    </li>
                  )
                   
                  }
                  else{
                    return "";
                }})}
           
        </List>
        <Link to="/categories/read">
            <FaChevronRight size={20} color="#9A1449"/>
            <p>Já lidos</p>
        </Link>
        <List>
           {repositorios.map(repo => {
                if(repo.category === 'read' && repo.deleted === false) {
                    return (
                        <li key={repo.id}>
                        <span>
                        <Link to={`/book/${repo.title}`}>
                            <FaBars color="#9A1449" size={20}/>
                        </Link>
                            {repo.title}
                        </span>
                        
                    </li>
                  )
                   
                  }
                  else{
                    return "";
                }})}
           
        </List>
        

      </Container>
    )
}