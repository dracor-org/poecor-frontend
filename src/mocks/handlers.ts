import { rest } from 'msw';
import { CorpusListEntry, CorpusData } from '../types';

const corpora: CorpusListEntry[] = require('./data/corpora.json');
const postdata: CorpusData = require('./data/postdata.json');

const apiBase = process.env.REACT_APP_POECOR_API;
const delay = parseInt(process.env.REACT_APP_MOCK_API_DELAY || '0');

const corpusData: { [index: string]: CorpusData } = { postdata };

export const handlers = [
  rest.get(`${apiBase}/corpora`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(delay), ctx.json(corpora));
  }),

  rest.get(`${apiBase}/corpora/:corpusId`, (req, res, ctx) => {
    const { corpusId } = req.params;
    const corpus = corpusData[corpusId as string];
    if (corpus) {
      return res(ctx.status(200), ctx.delay(delay), ctx.json(corpus));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),

  rest.get(`${apiBase}/corpora/:corpusId/poem/:poemName`, (req, res, ctx) => {
    const { corpusId, poemName } = req.params;
    const corpus = corpusData[corpusId as string];
    if (corpus) {
      const poem = corpus.poems.find((p) => p.name === poemName);
      if (poem) {
        return res(ctx.status(200), ctx.delay(delay), ctx.json(poem));
      }
      return res(ctx.status(404), ctx.json({ message: 'no such poem' }));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'no such corpus' }));
    }
  }),
];
