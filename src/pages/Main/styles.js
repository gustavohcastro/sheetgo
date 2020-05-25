import styled, {keyframes, css} from 'styled-components';


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

export const Form = styled.form`
    margin-top : 30px;
    display : flex;
    flex-direction : row;

    input{
        margin-right : 5px;
        flex : 1;
        border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
        padding : 10px 15px;
        border-radius : 4px;
        font-size : 17px;
    }
    select {
        flex : 1;
        border : 1px solid ${props => (props.error ? '#ff0000': '#eee')};
        padding : 10px 15px;
        border-radius : 4px;
        font-size : 17px;
    }
`;
//Criando animação do botao

const animate = keyframes`
    from{
        transform : rotate(0deg);
    }
    to{
        transform : rotate(360deg);
    }

`

export const SubmitButton = styled.button.attrs(props => ({
    type : 'submit',
    disabled : props.loading,
}))`
    background : #9A1449;
    border : 0;
    border-radius  : 4px;
    margin-left : 10px;
    padding : 0 15px;
    display : flex;
    justify-content : center;
    align-items : center;

    &[disabled]{
        cursor : not-allowed;
        opacity : 0.5
    }

    ${props => props.loading &&
    css `
        svg{
            animation : ${animate} 2s linear infinite;
        }
        `
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

export const DeleteButton = styled.button.attrs({
    type : 'button'
})`
    margin-left : 6px;
    background : transparent;
    color : #9A1449;
    border : 0;
    padding : 8px 7px;
    border-radius: 4px;
    outline : 0;
`

export const SortView = styled.div`
    max-width : 1000px;
    background : #fff;
    border-radius : 4px;
    padding : 20px 0px;
    margin : 10px auto;

    label : {
        font-size : 14px;
    }
    select{
        border : 0;
        outline : 0;
    }
   
    }
`;