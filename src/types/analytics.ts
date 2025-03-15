export interface WordAlignment {
    word: string;
    alignment: number;
  }

export interface SearchAnalyticsResult {
    nResults: number;
    pairs: WordAlignment[];
    maxAlignment: number;
}
  

export interface PaperMetadata{
  url: string
  title: string
  authors: string
  abstract: string
} 
