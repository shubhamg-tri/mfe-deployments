import { useQuery } from 'react-query';

export interface Film {
  title: string;
  url: string;
  opening_crawl: string;
  director: string;
  producer: string;
  episode_id: string;
}

const getFilms = async () => {
  const res = await fetch('https://swapi.dev/api/films/');
  const data = await res.json();

  return data.results;
};

const useFilms = () => {
  return useQuery<Array<Film>>('films', getFilms, {
    staleTime: Infinity,
  });
};
export default useFilms;
