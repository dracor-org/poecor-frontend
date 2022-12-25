export interface Author {
  name: string;
  uri: string;
}

export interface Analysis {
  numOfStanzas: number;
  numOfLines: number;
  numOfWords: number;
  numOfLinesInStanzas: number[];
  rhymeSchemesOfStanzas: string[];
  numOfMetricalSyllables: number;
  numOfGrammaticalSyllables: number;
  numOfMetricalSyllablesInStanzas: string[][];
  numOfGrammaticalSyllablesInStanzas: string[][];
  numOfWordsInStanzas: string[][];
  grammaticalStressPatternsInStanzas: string[][];
  metricalPatternsInStanzas: string[][];
}

export interface Poem {
  id: string;
  name: string;
  uri: string;
  authors: Author[];
  title: string;
  source: string;
  sourceUrl: string;
  analysis?: Analysis;
}

export interface CorpusMetrics {
  authors: number;
  poems: number;
  stanzas: number;
  verses: number;
  words: number;
  grammaticalSyllables: number;
  metricalSyllables: number;
}

export interface CorpusListEntry {
  name: string;
  title: string;
  description: string;
  metrics: CorpusMetrics;
}

export interface CorpusData {
  name: string;
  title: string;
  description: string;
  poems: Poem[];
}
