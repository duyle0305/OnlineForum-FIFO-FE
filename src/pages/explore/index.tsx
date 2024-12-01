import React from 'react';
import RewardWrapper from '../reward/layout/reward-wrapper';
import RewardList from './components/reward-list';

const ExplorePage = () => {
    return (
        <RewardWrapper title='Source Code & Download'>
            <RewardList />
        </RewardWrapper>
    );
};

export default ExplorePage;
