import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>PoeCor</title>
      </Helmet>
      <section>
        <h1>Welcome to PoeCor</h1>
      </section>
    </div>
  );
}
