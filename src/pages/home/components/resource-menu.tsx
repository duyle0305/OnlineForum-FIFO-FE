import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { GetProp, MenuProps } from 'antd';
import WarningSvg from '/public/warning.svg';
import QuestionMarkSvg from '/public/question-mark.svg';
import OpenBookSvg from '/public/open-book.svg';
import RewardSvg from '/public/reward.svg';
import FeedbackSvg from '/public/feedback.svg';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/utils/paths';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const ResourceMenu = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const navigate = useNavigate();

    const toReward = () => {
        navigate(PATHS.REWARDS);
    };

    const toFeedback = () => {
        if (accountInfo?.role?.name === 'STAFF' || accountInfo?.role?.name === 'ADMIN') {
            navigate(PATHS.ADMIN_FEEDBACKS);
            return;
        }

        navigate(PATHS.FEEDBACKS);
    };

    const toReport = () => {
        navigate(PATHS.ADMIN_REPORTS);
    };

    const toAbout = () => {
        navigate(PATHS.ABOUT);
    };

    const toContentPolicy = () => {
        navigate(PATHS.CONTENT_POLICY);
    };

    const toHelp = () => {
        navigate(PATHS.HELP);
    };

    const items: MenuItem[] = [
        {
            key: '1',
            icon: <Icon component={() => <img src={WarningSvg} alt="warning" />} />,
            label: 'About',
            onClick: toAbout,
        },
        {
            key: '2',
            icon: <Icon component={() => <img src={QuestionMarkSvg} alt="question-mark" />} />,
            label: 'Help',
            onClick: toHelp,
        },
        {
            key: '3',
            icon: <Icon component={() => <img src={OpenBookSvg} alt="open-book" />} />,
            label: 'Content Policy',
            onClick: toContentPolicy,
        },
        {
            key: '4',
            icon: <Icon component={() => <img src={RewardSvg} alt="reward" />} />,
            label: 'Reward',
            onClick: toReward,
        },
        {
            key: '5',
            icon: <Icon component={() => <img src={FeedbackSvg} alt="feedback" />} />,
            label: 'Feedback',
            onClick: toFeedback,
        },
        ...(accountInfo?.role?.name === 'STAFF' || accountInfo?.role?.name === 'ADMIN'
            ? [
                  {
                      key: '6',
                      icon: <Icon component={() => <img src={FeedbackSvg} alt="feedback" />} />,
                      label: 'Report',
                      onClick: toReport,
                  },
              ]
            : []),
    ];

    return (
        <>
            <BaseMenu items={items} />
        </>
    );
};
