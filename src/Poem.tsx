import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getPoem } from './api';
import { Poem as PoemData } from './types';

function AnalysisRow({
  label,
  data,
}: {
  label: string;
  data: string | number | JSX.Element;
}) {
  return (
    <tr>
      <th className="border-b">{label}</th>
      <td className="border-b">{data}</td>
    </tr>
  );
}

function List({ data }: { data: string[] | number[] }) {
  return (
    <ol>
      {data.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ol>
  );
}

function ListOfLists({ data }: { data: string[][] | number[][] }) {
  return (
    <ol>
      {data.map((list, i) => (
        <li key={i}>{list.join(', ')}</li>
      ))}
    </ol>
  );
}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authors = poem?.authors?.map((a) => a.name).join(', ');
  const authorTitle = poem ? `${authors}: ${poem.title}` : '';
  const ana = poem?.analysis;

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
          <p>
            PoeCor ID: <em>{poem.id}</em>
          </p>
          {poem.source && (
            <p>
              Source: <a href={poem.sourceUrl}>{poem.source}</a>
            </p>
          )}
          {ana && (
            <table className="table-auto">
              <tbody>
                <AnalysisRow
                  data={ana.numOfStanzas}
                  label="Number of stanzas"
                />
                <AnalysisRow data={ana.numOfLines} label="Number of lines" />
                <AnalysisRow data={ana.numOfWords} label="Number of words" />
                <AnalysisRow
                  data={ana.numOfLinesInStanzas.join(', ')}
                  label="Number of lines in stanzas"
                />
                <AnalysisRow
                  data={<List data={ana.rhymeSchemesOfStanzas} />}
                  label="Rhyme schemes of stanzas"
                />
                <AnalysisRow
                  data={<ListOfLists data={ana.numOfWordsInStanzas} />}
                  label="Number of words in stanzas"
                />
                <AnalysisRow
                  data={ana.numOfMetricalSyllables}
                  label="Number of metrical syllables"
                />
                <AnalysisRow
                  data={ana.numOfGrammaticalSyllables}
                  label="Number of grammatical syllables"
                />
                <AnalysisRow
                  data={
                    <ListOfLists data={ana.numOfMetricalSyllablesInStanzas} />
                  }
                  label="Number of metrical syllables in stanzas"
                />
                <AnalysisRow
                  data={
                    <ListOfLists
                      data={ana.numOfGrammaticalSyllablesInStanzas}
                    />
                  }
                  label="Number of grammatical syllables in stanzas"
                />
                <AnalysisRow
                  data={
                    <ListOfLists
                      data={ana.grammaticalStressPatternsInStanzas}
                    />
                  }
                  label="Grammatical stress patterns in stanzas"
                />
                <AnalysisRow
                  data={<ListOfLists data={ana.metricalPatternsInStanzas} />}
                  label="Metrical patterns in stanzas"
                />
              </tbody>
            </table>
          )}
        </section>
      )}
    </div>
  );
}
