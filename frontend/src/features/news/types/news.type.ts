/*

    News API Response Type

*/

export type NewsArticle = {
  content: string;
  description: string;
  image: string;
  publishedAt: Date;
  title: string;
  url: string;
};

export type NewsResponse = {
  articles: NewsArticle[];
};
