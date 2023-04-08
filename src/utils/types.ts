import {
  CommentLike as CommentLikeType,
  Comment as CommentType,
  TweetLike as TweetLikeType,
  Tweet as TweetType,
  User,
} from '@prisma/client'

export type TimelineQueryKey = 'getAll' | 'getMy' | 'getLiked'

export type TweetLike = TweetLikeType & {
  author: User
}

export type CommentLike = CommentLikeType & {
  author: User
}

export type Comment = CommentType & {
  author: User
  likes: CommentLike[]
}

export type Tweet = TweetType & {
  author: User
  likes: TweetLike[]
  comments: CommentType[]
}
