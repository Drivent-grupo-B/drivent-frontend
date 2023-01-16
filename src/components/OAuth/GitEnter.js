import git from '../../assets/images/git.svg';
import { Label } from '../Auth';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import useOathgitCode from '../../hooks/api/useOauthGitCode';
import useOathgitPost from '../../hooks/api/useOathgitPost';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonGitEnter from './ButtonGitEnter';

export default function GitEnter() {
  const { setUserData } = useContext(UserContext);
  const { postOathgit } = useOathgitPost();

  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');

  if (code) {
    window.history.pushState('object or string', 'Title', '/sign-in');
    loginGit();
  }

  async function loginGit() {
    try {
      const oathgitPost = await postOathgit(code);
      if (!oathgitPost) return Error;
      setUserData(oathgitPost);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast('Não foi possível fazer o login!');
    }
  }  
  return(
    <ButtonGitEnter variant='contained' onClick={ useOathgitCode } color='primary' fullWidth>
      <img src={ git } alt='GitHub Button'/>
      <Label>Entrar com GitHub</Label>  
    </ButtonGitEnter>
  );
};
