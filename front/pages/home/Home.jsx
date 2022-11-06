import { Fragment } from 'react';
import useKudos from '../../hooks/useKudos/useKudos';
import Sidebar from '../../components/sidebar/Sidebar';
import Timeline from '../../components/timeline/Timeline';

export default function Home() {
  const { kudos } = useKudos();

  return (
    <Fragment>
      <Sidebar />
      <Timeline kudos={kudos} />
    </Fragment>
  );
}
