import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { getPoem } from './api';
import { Poem as PoemData } from './types';

export default function Poem() {
  const { corpusId, poemId } = useParams<{
    corpusId: string;
    poemId: string;
  }>();
  const [poem, setPoem] = useState<PoemData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getPoem(corpusId!, poemId!);
        if (isMounted) {
          setPoem(resp.data);
        }
      } catch (error) {
        alert('Cannot load poem');
      }
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const authors = poem?.authors?.map((a) => a.name).join(', ');
  const authorTitle = poem ? `${authors}: ${poem.title}` : '';

  return (
    <div>
      <Helmet>
        <title>{authorTitle}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {poem && (
        <section>
          <h2>{authors}</h2>
          <h1>{poem.title}</h1>
          {poem.source && (
            <p>
              Source: <a href={poem.sourceUrl}>{poem.source}</a>
            </p>
          )}
        </section>
      )}
    </div>
  );
}
