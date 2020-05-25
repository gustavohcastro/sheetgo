import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {Container, List, BackButton} from './styles';
import {FaBars, FaArrowLeft} from 'react-icons/fa'


export default function Category({match}) {
    
    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState('');
    
    useEffect( ()=>{
        async function loadData(){
            var categoryParams =  decodeURIComponent(match.params.category);
            if (categoryParams === "nocategory"){
                setCategory("Sem Categoria");
            }
            if (categoryParams === "read"){
                setCategory("Já Lido");
            }
            if (categoryParams === "reading"){
                setCategory("Estou Lendo");
            }
            if (categoryParams === "wantToRead"){
                setCategory("Quero Ler");
            }
            const data = await JSON.parse(localStorage.getItem('BOOKS'));
            if (data){
                if (categoryParams === 'nocategory'){
                    categoryParams = '';
                }
                const validBooks = data.filter( item => item.category === categoryParams && item.deleted === false);
                await setBooks(validBooks);
      
            }
        }
        loadData();
    }, []) 

 return (
   <Container>
            <BackButton to="/">
                <FaArrowLeft size={20} color="#0d2636"/>
                <h1>{category}</h1>
            </BackButton>
       <List>
            {books.map( book => (
                <li key={book.id}>
                    <span>
                        <Link to={`/book/${book.title}`}>
                            <FaBars color="#9A1449" size={20}/>
                        </Link>
                        {book.title}
                    </span>
                </li>
                
            ))}
           
        </List>
     
          
   </Container>
 );
}