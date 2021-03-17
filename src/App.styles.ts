import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/bg.jpg';

export const GlobalStyle = createGlobalStyle`
    html{
        height:100%;
    }
    body{
        background-image:url(${BGImage});
        background-size:cover;
        margin:0;
        padding:0 20px;
        display:flex;
        justify-content:center;
    }
    *{
        box-sizing:border-box;        
    }
`;

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
>p{
    color:#fff;
}
.score{
    color:fff;
    font-size:2rem;
    margin:0;
}

.start, .next{
    cursor:pointer;
    backgound:linear-gradient(180deg,#fff, #ffcc91);
    border:2px solid #d8558;
    box-shadow:0px 5px 10px rgba(0,0,0,0.25);
    boder-radius:10px;
    height:40px;
    margin:20px;
    padding:0 40px;
}
.start{
    max_width:200px;
}
h1{
    color:#fff;
}
`;