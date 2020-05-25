import styled from 'styled-components';
import {Link} from 'react-router-dom';



export const Container = styled.div`
    max-width : 1000px;
    background : #fff;
    border-radius : 4px;
    box-shadow : 0 0 20px rgba(0,0,0,0.2);
    padding : 30px;
    margin : 80px auto;

    h1{
        font-size : 20px;
        display : flex;
        flex-direction : row;
        align-items : center;

        svg{
            margin-right: 10px;
        }
    }
    
    a{
        text-decoration : none;
        display : flex;
        flex-direction : row;
        align-items : flex-end;

    
        p{
            margin-top: 20px;
            color: #9A1449;
            font-weight : bold;
        }
    }
`;



export const List = styled.ul`
    list-style : none;
    margin-top : 20px;

    li{
        padding : 15px 30px;
        display : flex;
        flex-direction : row;
        align-items : center;
        justify-content : space-between;

        span{
            align-items : center;
            display : flex;

            a{
                margin-right: 5px;
            }
        }

        && + li {
            border-top : 1px solid #eee;
        }
    }

`;

export const BackButton = styled(Link) `
    border : 0;
    outline : 0;
    background : transparent;
    display : flex;
    flex-direction : row;
    align-items : center;
    
    h1{
        color : #9A1449;
        margin-left : 10px;
    }

`;

