import { useFilm } from '@films/api';
import { Card, Loading } from '@ui';
import { useParams } from 'react-router-dom';

interface Film {
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  episode_id: string;
}

const Film = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data } = useFilm(id);

  if (isLoading || !data) return <Loading />;

  return (
    <Card title={data.title} description={data.opening_crawl}>
      <FilmInfo {...data} />
    </Card>
  );
};

const FilmInfo = (props: Film) => (
  <>
    <p>Director: {props.director}</p>
    <p>Producers: {props.producer}</p>
    <p>Episode: {props.episode_id}</p>
  </>
);

export default Film;
