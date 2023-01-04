import useAsync from '../useAsync';

import * as oathgitApi from '../../services/oathgitApi';

export default function useOathgitPost(code) {
  const {
    data: oathgitPost,
    loading: oathgitPostLoading,
    error: oathgitPostError,
    act: postOathgit
  } = useAsync(oathgitApi.postOathgit(code));

  return {
    oathgitPost,
    oathgitPostLoading,
    oathgitPostError,
    postOathgit
  };
}
