import {
  CommentLike,
  Comment as CommentType,
  TweetLike as TweetLikeType,
  Tweet as TweetType,
  User,
} from '@prisma/client'

export type TweetLike = TweetLikeType & {
  author: User
}

export type Tweet = TweetType & {
  author: User
  likes: TweetLike[]
  comments: CommentType[]
}

export type Comment = CommentType & {
  author: User
  likes: CommentLike[]
}
