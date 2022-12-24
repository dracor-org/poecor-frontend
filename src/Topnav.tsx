import { Link } from 'react-router-dom';

export default function Topnav() {
  return (
    <nav>
      <h1>
        <Link to="/">PoeCor</Link>
      </h1>
      <ul>
        <li>
          <Link to="/corpora">Corpora</Link>
        </li>
      </ul>
    </nav>
  );
}
