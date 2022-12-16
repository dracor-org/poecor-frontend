import axios, {
  AxiosRequestConfig,
  Method,
  CancelTokenSource,
  AxiosResponse,
} from 'axios';
import { CorpusData, CorpusListEntry, Poem } from './types';

const apiUrl = process.env.REACT_APP_POECOR_API;

const defaultOpts: AxiosRequestConfig = {
  withCredentials: true,
};

async function fetchData<T>(
  url: string,
  options?: {
    data?: object;
    method?: Method;
    cancelTokenSource?: CancelTokenSource;
  }
): Promise<AxiosResponse<T>> {
  return await axios(url, {
    ...defaultOpts,
    data: options?.data,
    method: options?.method,
    cancelToken: options?.cancelTokenSource?.token,
  });
}

export async function getCorpora(): Promise<AxiosResponse<CorpusListEntry[]>> {
  const url = `${apiUrl}/corpora`;
  return await fetchData<CorpusListEntry[]>(url);
}

export async function getCorpus(
  name: string
): Promise<AxiosResponse<CorpusData>> {
  const url = `${apiUrl}/corpora/${name}`;
  return await fetchData<CorpusData>(url);
}

export async function getPoem(
  corpusName: string,
  poemName: string
): Promise<AxiosResponse<Poem>> {
  const url = `${apiUrl}/corpora/${corpusName}/poem/${poemName}`;
  return await fetchData<Poem>(url);
}
