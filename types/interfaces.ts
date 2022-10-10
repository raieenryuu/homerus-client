export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  tokenVersion?: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  content: string;
  story: {
    author: {
      username: string;
    };
  };
}

export interface Story {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  authorId: string;
  chapters: {
    id: string;
    title: string;
  }[];
}
