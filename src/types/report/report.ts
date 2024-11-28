import { Account } from "../account";
import { FeedbackStatus } from "../feedback/feedback";

export type ReportAccountReasons =
    | 'HATE'
    | 'ABUSE_AND_HARASSMENT'
    | 'VIOLENT_SPEECH'
    | 'CHILD_SAFETY'
    | 'PRIVACY'
    | 'SPAM'
    | 'SUICIDE_OR_SELF_HARM'
    | 'SENSITIVE_OR_DISTURBING_MEDIA'
    | 'IMPERSONATION'
    | 'VIOLENT_AND_HATEFUL_ENTITIES'
   

export const reportAccountReasons: ReportAccountReasons[] = [
    'HATE',
     'ABUSE_AND_HARASSMENT',
     'VIOLENT_SPEECH',
     'CHILD_SAFETY',
     'PRIVACY',
     'SPAM',
     'SUICIDE_OR_SELF_HARM',
     'SENSITIVE_OR_DISTURBING_MEDIA',
     'IMPERSONATION',
     'VIOLENT_AND_HATEFUL_ENTITIES',
];

export type ReportType =
    | 'SPAM'
    | 'INAPPROPRIATE'
    | 'HARASSMENT'
    | 'MISINFORMATION'
    | 'HATE_SPEECH'
    | 'COPYRIGHT'
    | 'IMPERSONATION'
    | 'VIOLENCE'
    | 'SELF_HARM'
    | 'SCAM'
    | 'OFFENSIVE_LANGUAGE'
    | 'ADULT_CONTENT'
    | 'TERRORISM'
    | 'ILLEGAL_ACTIVITIES'
    | 'PRIVACY_VIOLATION'
    | 'FAKE_NEWS'
    | 'BULLYING'
    | 'FALSE_ADVERTISING'
    | 'DRUGS'
    | 'CHILD_ENDANGERMENT'
    | 'MALWARE'
    | 'FRAUD'
    | 'DISCRIMINATION'
    | 'IDENTITY_THEFT'
    | 'UNAUTHORIZED_SALES'
    | 'HARMFUL_CONTENT'
    | 'OTHER';

export const reportReasons: ReportType[] = [
    'SPAM',
    'INAPPROPRIATE',
    'HARASSMENT',
    'MISINFORMATION',
    'HATE_SPEECH',
    'COPYRIGHT',
    'IMPERSONATION',
    'VIOLENCE',
    'SELF_HARM',
    'SCAM',
    'OFFENSIVE_LANGUAGE',
    'ADULT_CONTENT',
    'TERRORISM',
    'ILLEGAL_ACTIVITIES',
    'PRIVACY_VIOLATION',
    'FAKE_NEWS',
    'BULLYING',
    'FALSE_ADVERTISING',
    'DRUGS',
    'CHILD_ENDANGERMENT',
    'MALWARE',
    'FRAUD',
    'DISCRIMINATION',
    'IDENTITY_THEFT',
    'UNAUTHORIZED_SALES',
    'HARMFUL_CONTENT',
    'OTHER',
];

export type PostReport = {
    reportId: string;
    title: string;
    description: string;
    reportTime: string;
    status: FeedbackStatus;
    postId: string;
    postTitle: string;
    postContent: string;
    postCreatedDate: string;
    account: Account
}

export type AccountReport = {
    reportAccountId: string;
    title: string;
    reason: string;
    reportTime: string;
    status: FeedbackStatus;
    reporter: Account;
    reported: Account;
}
