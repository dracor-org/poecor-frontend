import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { getCorpus } from './api';
import { CorpusData, Poem } from './types';
import Table from './Table';

export default function Corpus() {
  const { id } = useParams<{ id: string }>();
  const [corpus, setCorpus] = useState<CorpusData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      setLoading(true);
      try {
        const resp = await getCorpus(id!);
        if (isMounted) {
          setCorpus(resp.data);
        }
      } catch (error) {
        alert('Cannot load corpus');
      }
      if (isMounted) {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const columns = useMemo<ColumnDef<Poem>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => (
          <Link className="text-lg" to={info.row.original.name}>
            {`${info.getValue()}`}
          </Link>
        ),
      },
      {
        accessorKey: 'authors',
        header: 'Author',
        accessorFn: (row) => {
          const { authors = [] } = row;
          return authors.map((a) => a.name).join(' ');
        },
        cell: (info) => info.row.original.authors.map((a) => a.name).join(', '),
      },
      {
        accessorKey: 'source',
        header: 'Source',
        cell: (info) =>
          info.row.original.sourceUrl ? (
            <Link to={info.row.original.sourceUrl}>{`${info.getValue()}`}</Link>
          ) : (
            info.getValue()
          ),
      },
    ],
    []
  );

  return (
    <div>
      <Helmet>
        <title>Corpus: {corpus?.title || 'loading...'}</title>
      </Helmet>
      {loading && <p>loading...</p>}
      {corpus && (
        <section>
          <h1>{corpus.title}</h1>
          <Table data={corpus.poems} columns={columns} />
        </section>
      )}
    </div>
  );
}
