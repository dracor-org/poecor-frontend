import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>PoeCor</title>
      </Helmet>
      <Navigate to="/corpora" />
    </div>
  );
}
