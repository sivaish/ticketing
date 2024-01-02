import useSWR from 'swr';

export default function useUser() {

  const fetcher = (url: string) => fetch(url).then((res) => {
    console.log('res :: ', res);
    return res.json()
  });

  const { data, mutate, error } = useSWR('https://ticketing.dev/api/users/currentuser', fetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}
