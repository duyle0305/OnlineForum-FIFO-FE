import type { RootState } from '@/stores';
import type { GetProp, MenuProps } from 'antd';

import Icon from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import BaseMenu from '@/components/core/menu';
import { PATHS } from '@/utils/paths';

import AboutSvg from '../../../assets/icons/About.svg';
import ContentPolicySvg from '../../../assets/icons/Content-Policy.svg';
import FeedbackSvg from '../../../assets/icons/Feedback.svg';
import HelpSvg from '../../../assets/icons/Help.svg';
import ReportSvg from '../../../assets/icons/Report.svg';
import RewardSvg from '../../../assets/icons/Reward.svg';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const ResourceMenu = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const navigate = useNavigate();
    const location = useLocation();

    const toReward = () => {
        navigate(PATHS.ADMIN_REWARDS);
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

    useEffect(() => {
        const selectedItems = document.getElementsByClassName('ant-menu-item-selected');

        Array.from(selectedItems).forEach(item => {
            if (item.getAttribute('title') !== location.pathname) {
                item.classList.remove('ant-menu-item-selected');
            }
        });
    }, [location]);

    const items: MenuItem[] = [
        {
            key: PATHS.ABOUT,
            icon: <Icon component={() => <img src={AboutSvg} alt="warning" />} />,
            label: 'About',
            onClick: toAbout,
            title: PATHS.ABOUT,
        },
        {
            key: PATHS.HELP,
            icon: <Icon component={() => <img src={HelpSvg} alt="question-mark" />} />,
            label: 'Help',
            onClick: toHelp,
            title: PATHS.HELP,
        },
        {
            key: PATHS.CONTENT_POLICY,
            icon: <Icon component={() => <img src={ContentPolicySvg} alt="open-book" />} />,
            label: 'Content Policy',
            onClick: toContentPolicy,
            title: PATHS.CONTENT_POLICY,
        },
        ...(accountInfo?.role?.name === 'STAFF'
            ? [
                  {
                      key: PATHS.REWARDS,
                      icon: <Icon component={() => <img src={RewardSvg} alt="reward" />} />,
                      label: 'Reward',
                      onClick: toReward,
                      title: PATHS.REWARDS,
                  },
              ]
            : []),
        {
            key: PATHS.FEEDBACKS,
            icon: <Icon component={() => <img src={FeedbackSvg} alt="feedback" />} />,
            label: 'Feedback',
            onClick: toFeedback,
            title: PATHS.FEEDBACKS,
        },
        ...(accountInfo?.role?.name === 'STAFF' || accountInfo?.role?.name === 'ADMIN'
            ? [
                  {
                      key: PATHS.ADMIN_REPORTS,
                      icon: <Icon component={() => <img src={ReportSvg} alt="feedback" />} />,
                      label: 'Report',
                      onClick: toReport,
                      title: PATHS.ADMIN_REPORTS,
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
