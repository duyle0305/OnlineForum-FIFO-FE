import { ReportAccountReasons } from '@/types/report/report';
import { Button, Flex, Form, Radio, Typography } from 'antd';
import React from 'react';

interface ReportReasonProps {
    reason: ReportAccountReasons;
    selectedReason: ReportAccountReasons | undefined;
    setSelectedReason: (value: ReportAccountReasons) => void;
}

const mapReportReasonDescription = (reason: ReportAccountReasons) => {
    switch (reason) {
        case 'HATE':
            return 'Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos';
        case 'ABUSE_AND_HARASSMENT':
            return 'Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment';
        case 'VIOLENT_SPEECH':
            return 'Violent Threats, Wish of Harm, Glorification of Violence, Incitement of Violence, Coded Incitement of Violence';
        case 'CHILD_SAFETY':
            return 'Child sexual exploitation, grooming, physical child abuse, underage user';
        case 'PRIVACY':
            return 'Sharing private information, threatening to share/expose private information, sharing non-consensual intimate images, sharing images of me that I don’t want on the platform';
        case 'SPAM':
            return 'Fake engagement, scams, fake accounts, malicious links';
        case 'SUICIDE_OR_SELF_HARM':
            return 'Encouraging, promoting, providing instructions or sharing strategies for self-harm';
        case 'SENSITIVE_OR_DISTURBING_MEDIA':
            return 'Graphic Content, Gratuitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia, Media depicting a deceased individual';
        case 'IMPERSONATION':
            return 'Pretending to be someone else, including non-compliant parody/fan accounts';
        case 'VIOLENT_AND_HATEFUL_ENTITIES':
            return 'Violent extremism and terrorism, hate groups & networks';
        default:
            return '';
    }
};

const mapReportReasonTitle = (reason : ReportAccountReasons) => {
     switch (reason) {
         case 'HATE':
             return 'Hate';
         case 'ABUSE_AND_HARASSMENT':
             return 'Abuse & Harassment';
         case 'VIOLENT_SPEECH':
             return 'Violent Speech';
         case 'CHILD_SAFETY':
             return 'Child Safety';
         case 'PRIVACY':
             return 'Privacy';
         case 'SPAM':
             return 'Spam';
         case 'SUICIDE_OR_SELF_HARM':
             return 'Suicide or self-harm';
         case 'SENSITIVE_OR_DISTURBING_MEDIA':
             return 'Sensitive or disturbing media';
         case 'IMPERSONATION':
             return 'Impersonation';
         case 'VIOLENT_AND_HATEFUL_ENTITIES':
             return 'Violent & hateful entities';
         default:
             return '';
     }
}

const ReportReason = ({ reason, selectedReason, setSelectedReason }: ReportReasonProps) => {
    return (
        <Flex justify="space-between" align="flex-start">
            <Flex vertical>
                <Typography.Title level={5}>{mapReportReasonTitle(reason)}</Typography.Title>
                <Typography.Paragraph type="secondary">{mapReportReasonDescription(reason)}</Typography.Paragraph>
            </Flex>

            <Radio value={reason} checked={reason === selectedReason} onChange={() => setSelectedReason(reason)} />
        </Flex>
    );
};

export default ReportReason;
