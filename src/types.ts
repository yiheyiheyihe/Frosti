export interface Post {
<<<<<<< HEAD
  [x: string]: any;
=======
>>>>>>> e996142fd1822200230f96d4058aa6478006f78f
  data: {
    [x: string]: any;
    title: string;
    image: string;
    description: string;
    pubDate: Date;
    badge: string;
    categories: string[];
    tags: string[];
  };
<<<<<<< HEAD
  remarkPluginFrontmatter: {
    totalCharCount: string;
    readingTime: string;
  };
=======
>>>>>>> e996142fd1822200230f96d4058aa6478006f78f
  slug: string;
}

export interface Page {
  url: {
    prev?: string;
    next?: string;
  };
  data: Post[];
  total: number;
  size: number;
  current: string;
}

export interface CardInfo {
  title: string;
  image?: string;
  pubDate?: Date;
  badge?: string;
  categories?: string[];
  tags?: string[];
<<<<<<< HEAD
  word?: string;
  time?: string;
=======
>>>>>>> e996142fd1822200230f96d4058aa6478006f78f
  isBlog: boolean;
  url?: string;
}

export interface EnvelopeInfo {
  title: string;
  desc: string;
  image?: string;
  pubDate?: Date;
  badge?: string;
  categories?: string[];
  tags?: string[];
<<<<<<< HEAD
  word?: string;
  time?: string;
=======
>>>>>>> e996142fd1822200230f96d4058aa6478006f78f
  isBlog: boolean;
  url: string;
}
