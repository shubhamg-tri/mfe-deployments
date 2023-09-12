import { useQuery } from 'react-query';
import { Film } from './useFilms';

const getFilm = async (id: string | undefined) => {
  const res = await fetch(`https://swapi.dev/api/films/${id}`);
  const data = await res.json();

  return data;
};

const useFilm = (id: string | undefined) => {
  return useQuery<Film>(`film/${id}`, () => getFilm(id), {
    staleTime: Infinity,
  });
};
export default useFilm;
