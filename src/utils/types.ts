import { Comment, Tweet, TweetLike, User } from '@prisma/client'

export type TweetLikeType = TweetLike & {
  author: User
}

export type TweetType = Tweet & {
  comments?: Comment[]
  author: User
  likes?: TweetLikeType[]
}
