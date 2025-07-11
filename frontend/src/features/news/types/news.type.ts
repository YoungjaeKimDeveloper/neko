/*

    News API Response Type

*/

// News Article
export type NewsArticle = {
  title: string;
  description: string;
  image: string;
  publishedAt: Date;
  url: string;
};

// News Response
export type NewsResponse = {
  articles: NewsArticle[];
};
