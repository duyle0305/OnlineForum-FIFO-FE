import { Flex, Typography } from 'antd';
import React from 'react';

const PrivatePolicy = () => {
    return (
        <Flex vertical gap={20}>
            <Typography.Title level={2}>FIFO Private Policy</Typography.Title>

            <Typography.Paragraph>
                We are FIFO ("we", "our", "us"). We’re committed to protecting and respecting your privacy. If you have
                questions about your personal information please <u>contact us</u>.
            </Typography.Paragraph>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>What information we hold about you</Typography.Title>
                <Typography.Paragraph>The type of data that we collect and process includes:</Typography.Paragraph>
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    <li>
                        <Typography.Paragraph>Your name or username.</Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>Your email address.</Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>Your IP address.</Typography.Paragraph>
                    </li>
                </ul>

                <Typography.Paragraph>
                    Further data may be collected if you choose to share it, such as if you fill out fields on your
                    profile.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    We collect some or all of this information in the following cases:
                </Typography.Paragraph>
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    <li>
                        <Typography.Paragraph>You register as a member on this site.</Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>You fill out our contact form.</Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>You browse this site. See "Cookie policy" below.</Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>You fill out fields on your profile.</Typography.Paragraph>
                    </li>
                </ul>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>How your personal information is used</Typography.Title>
                <Typography.Paragraph>We may use your personal information in the following ways:</Typography.Paragraph>
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    <li>
                        <Typography.Paragraph>
                            For the purposes of making you a registered member of our site, in order for you to
                            contribute content to this site.
                        </Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>
                            We may use your email address to inform you of activity on our site.
                        </Typography.Paragraph>
                    </li>
                    <li>
                        <Typography.Paragraph>
                            Your IP address is recorded when you perform certain actions on our site. Your IP address is
                            never publicly visible.
                        </Typography.Paragraph>
                    </li>
                </ul>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Other ways we may use your personal information</Typography.Title>
                <Typography.Paragraph>
                    In addition to notifying you of activity on our site which may be relevant to you, from time to time
                    we may wish to communicate with all members any important information such as newsletters or
                    announcements by email. You can opt-in to or opt-out of such emails in your profile.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    We may collect non-personally identifiable information about you in the course of your interaction
                    with our site. This information may include technical information about the browser or type of
                    device you're using. This information will be used purely for the purposes of analytics and tracking
                    the number of visitors to our site.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Keeping your data secure</Typography.Title>
                <Typography.Paragraph>
                    We are committed to ensuring that any information you provide to us is secure. In order to prevent
                    unauthorized access or disclosure, we have put in place suitable measures and procedures to
                    safeguard and secure the information that we collect.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Cookie policy</Typography.Title>
                <Typography.Paragraph>
                    Cookies are small text files which are set by us on your computer which allow us to provide certain
                    functionality on our site, such as being able to log in, or remembering certain preferences.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    We have a detailed cookie policy and more information about the cookies that we set on this page.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Rights</Typography.Title>
                <Typography.Paragraph>
                    You have a right to access the personal data we hold about you or obtain a copy of it. To do so
                    please <u>contact us</u>. If you believe that the information we hold for you is incomplete or
                    inaccurate, you may <u>contact us</u> to ask us to complete or correct that information.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    You also have the right to request the erasure of your personal data. Please <u>contact us</u> if
                    you would like us to remove your personal data.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Acceptance of this policy</Typography.Title>
                <Typography.Paragraph>
                    Continued use of our site signifies your acceptance of this policy. If you do not accept the policy
                    then please do not use this site. When registering we will further request your explicit acceptance
                    of the privacy policy.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Changes to this policy</Typography.Title>
                <Typography.Paragraph>
                    We may make changes to this policy at any time. You may be asked to review and re-accept the
                    information in this policy if it changes in the future.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>Analytics</Typography.Title>
                <Typography.Paragraph>
                    We use the newest version of Google Analytics (Google Analytics 4), which is privacy-focused (things
                    like IP addresses are not logged or stored and no personally identifiable information is used). This
                    allows us to better understand how users use the site so we can improve their experience. We use
                    Better Analytics, a custom addon built by the developers of <u>I/O Labs</u>.
                </Typography.Paragraph>
            </Flex>

            <Flex vertical gap={10}>
                <Typography.Title level={3}>PWA application</Typography.Title>
                <Typography.Paragraph>
                    Our PWA app had improvements made by the developers of the <u>App for Cloudflare®</u> (a free plugin
                    for WordPress). Our privacy policy also applies to our progressive web application.
                </Typography.Paragraph>
            </Flex>
        </Flex>
    );
};

export default PrivatePolicy;
