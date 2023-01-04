import QueryString from 'qs';

export default function useOathgitCode() {
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.WDS_SOCKET_HOST,
    redirect_uri: process.env.WDS_SOCKET_PATH,
    response_type: 'code',
    scope: 'user'
  };
  window.location.href = GITHUB_URL+'?'+QueryString.stringify(params);
}
