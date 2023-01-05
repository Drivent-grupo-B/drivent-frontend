import styled from 'styled-components';
import git from '../../assets/images/git.svg';
import { Label } from '../Auth';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import useOathgitCode from '../../hooks/api/useOauthGitCode';
import useOathgitPost from '../../hooks/api/useOathgitPost';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function GitEnter() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  if( code ) {
    try {
      const { oathgitPost } = useOathgitPost(code);
      setUserData(oathgitPost);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');  
    } catch (error) {
      toast('Não foi possível fazer o login!');
    }
  }  
  return(
    <GitContainer onClick={ useOathgitCode }>
      <img src={git}/>
      <Label>Logar com o github</Label>  
    </GitContainer>
  );
};

const GitContainer = styled.div`
  height: 80px;
  width: 100% ;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3f51b5;
  border-radius: 5px;
  margin: 0px 0px 10px 0px ;
  
  img{
    margin-right: 10px;
    height: 100px;
    width: 90px ;
  }
`;
