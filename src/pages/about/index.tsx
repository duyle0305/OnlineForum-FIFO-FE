import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { Card, Divider, Flex, Image, Typography } from 'antd';
import React from 'react';
import PlaceholderSvg from '/public/placeholder.svg';

const AboutPage = () => {
    return (
        <Card>
            <PageBreadcrumbs />

            <Divider />

            <Flex vertical gap={10}>
                <Typography.Title level={2}>FIFO About</Typography.Title>

                <Flex vertical gap={6}>
                    <Typography.Title level={4}>About FIFO</Typography.Title>
                    <Typography.Paragraph>
                        Welcome to FIFO – the technology forum that connects passions and knowledge! Here, we create an
                        open space for anyone who loves technology, from programmers and engineers to those just
                        beginning to explore the digital world.
                    </Typography.Paragraph>
                </Flex>

                <Flex vertical gap={6}>
                    <Typography.Title level={4}>Why Choose FIFO?</Typography.Title>
                    <ul
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                        }}
                    >
                        <li>
                            <Typography.Paragraph>
                                Our mission is to bring together technology enthusiasts from all walks of life. We aim
                                to create a platform where everyone can share their knowledge, ask questions, and learn
                                from one another.
                            </Typography.Paragraph>
                        </li>

                        <li>
                            <Typography.Paragraph>
                                Supportive Community: FIFO is not just a forum; it's a connected community. You can
                                connect with like-minded individuals, exchange ideas, and receive support from fellow
                                members. We encourage collaboration and mutual learning.
                            </Typography.Paragraph>
                        </li>

                        <li>
                            <Typography.Paragraph>
                                Diverse Content: At FIFO, you can find information across various tech fields, including
                                programming, web design, cybersecurity, artificial intelligence, and more. We regularly
                                update new content to keep you informed about the latest trends.
                            </Typography.Paragraph>
                        </li>

                        <li>
                            <Typography.Paragraph>
                                Events and Activities: In addition to online discussions, FIFO hosts events, workshops,
                                and offline meetups to create opportunities for networking and learning among members.
                            </Typography.Paragraph>
                        </li>
                    </ul>
                </Flex>

                <Flex vertical gap={6}>
                    <Typography.Title level={4}>Join Us Today!</Typography.Title>
                    <Typography.Paragraph>
                        Become a part of the dynamic tech community at FIFO! You’ll not only expand your knowledge but
                        also have the chance to build your own professional network. We look forward to your
                        contributions and creative ideas!
                    </Typography.Paragraph>
                </Flex>

                <Image src={PlaceholderSvg} alt="about" width={800} height={400} preview={false} />
            </Flex>
        </Card>
    );
};

export default AboutPage;
