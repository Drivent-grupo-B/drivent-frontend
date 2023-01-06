import useAsync from '../useAsync';

import * as oathgitApi from '../../services/oathgitApi';

export default function useOathgitPost() {
  const {
    act: postOathgit
  } = useAsync(oathgitApi.postOathgit, false);
 
  return {
    postOathgit
  };
}
