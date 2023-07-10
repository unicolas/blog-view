export type PageDto<T> = {
  content: Array<T>;
  hasNextPage: boolean;
  nextCursor: string | null;
  pageSize: number;
};

export type PostDto = {
  authorId: string;
  content: string;
  createdAt: string;
  postId: string;
  tags: string[];
  title: string;
  updatedAt: string;
};

export type CommentDto = {
  authorId: string;
  content: string;
  createdAt: string;
  postId: string;
  commentId: string;
  title: string;
  updatedAt: string;
};
