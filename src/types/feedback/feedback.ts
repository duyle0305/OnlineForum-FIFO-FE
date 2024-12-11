import type { Account } from '../account';

export type FeedbackStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DETAIL';

export type Feedback = {
    feedbackId: string;
    title: string;
    content: string;
    status: FeedbackStatus;
    createdDate: string;
    account: Account;
};

export type CreateFeedbackPayload = {
    title: string;
    content: string;
};
