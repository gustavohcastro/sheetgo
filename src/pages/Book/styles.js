import styled from 'styled-components';
import {Link} from 'react-router-dom';


export const Loading = styled.div`
    color : #fff;
    display : flex;
    justify-content : center;
    align-items : center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width : 700px;
    background : #fff;
    border-radius : 4px;
    box-shadow : 0 0 20px rgba(0,0,0,0.2);
    padding : 30px;
    margin : 80px auto;

`;

export const Owner = styled.header`
max-width : 700px;
background : #fff;
border-radius : 4px;
box-shadow : 0 0 20px rgba(0,0,0,0.2);
padding : 30px;
margin : 20px auto;
    
    span{
        color : #999;
        padding : 2px;
        
    }
    img{
        width : 150px;
        border-radius : 50%;
        margin: 20px 0;
    }
    h1{
        font-size : 30px;
        color : #0d2636;
        margin-bottom: 10px;
    }
    p{
        text-align : center;
        max-width : 400px;
    }
    input{
        margin-top : 10px;
        width : 400px;
        border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
        padding : 10px 15px;
        border-radius : 4px;
        font-size : 17px;
      
    }
   
    textarea {
        margin-top : 10px;
        width : 400px;
        border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
        padding : 10px 15px;
        border-radius : 4px;
        font-size : 17px;
        font-family : verdana;
    }
    select{
        border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
        padding : 10px 15px;
        border-radius : 4px;
        font-size : 17px;
    }
    button{
        border : 0;
        outline : 0;
        display : flex;
        justify-content : center;
        align-items : center;
        padding : 10px 20px;
        border-radius : 4px;
        background-color : #9A1449;
        color : #ffffff;

       
    }
    button + button{
        background-color : #aaa;
    }
    div{
        margin-top : 10px;
        padding: 0px;
        width : 400px;
        display : flex;
        flex-direction : row;
        justify-content : space-between;
        align-items: flex-end;
    }
  


`;

export const BackButton = styled(Link) `
    border : 0;
    outline : 0;
    background : transparent;

`;

export const Comments = styled.div`
    max-width : 700px;
    background : #fff;
    border-radius : 4px;
    box-shadow : 0 0 20px rgba(0,0,0,0.2);
    padding : 30px;
    margin : 20px auto;

    form {
        display : flex;
        flex-direction : row;
        align-items : center;
        margin-top : 10px;

        input {
            width : 400px;
            border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
            padding : 10px 15px;
            border-radius : 4px;
            font-size : 17px;
            
        }
        button {
            margin-left : 10px;
            border : 0;
            outline : 0;
            display : flex;
            justify-content : center;
            align-items : center;
            height : 40px;
            width : 40px;
            border-radius : 4px;
            background-color : #9A1449;
        }
    }
    ul{
        margin-top : 20px;
        li{
            list-style : none;
            display : flex;
            flex-direction : row;
            just-content : space-between;
            align-items : center;
            padding-bottom : 15px;
            margin-top : 15px;
            border-bottom : 1px solid #eee;
            
            div{
                display : flex;
                flex-direction : row;
                flex : 1;
                align-items : flex-end;
                max-width : 600px;

                p{
                    margin-left : 5px;
                }
            }
            button {
                border :0;
                outline : 0;
                background-color : transparent;
            }
        }
    }

`;



