import { DataList, Loading } from '@ui';
import { useFilms } from '@films/api';

const Films = () => {
  const { isLoading, data } = useFilms();
  if (isLoading || !data) return <Loading />;

  return (
    <div>
      <h1>Welcome to Films!</h1>
      <DataList
        items={data.map((item) => ({ title: item.title, url: item.url }))}
      />
    </div>
  );
};

export default Films;
