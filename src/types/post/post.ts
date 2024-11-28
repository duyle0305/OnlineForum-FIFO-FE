import { ImageResponse } from '..';
import { Account } from '../account';
import { Tag } from '../tag/tag';
import { Topic } from '../topic/topic';

export enum PostStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    HIDDEN = 'HIDDEN',
    DRAFT = 'DRAFT',
}

export type Post = {
    postId: string;
    title: string;
    content: string;
    status: PostStatus;
    topic: Topic;
    createdDate: string;
    lastModifiedDate: string;
    imageList?: ImageResponse[];
    tag: Tag;
    account: Account;
    linkFile: string;
    upvoteCount: number;
    viewCount: number;
    commentCount: number;
    postFileList: {
        postFileId: string;
        url: string
    }[]
};

export type CreatePostPayload = {
    title: string;
    content: string;
    topicId: string;
    tagId: string;
    imageUrlList: { url: string }[];
    linkFile: string;
    postFileUrlRequest?: { url: string }[];
};

export type UpdatePostPayload = {
    title: string;
    content: string;
    topicId: string;
    tagId: string;
    imageUrlList: { url: string }[];
    linkFile: string;
    postFileUrlRequest?: { url: string }[];
};
