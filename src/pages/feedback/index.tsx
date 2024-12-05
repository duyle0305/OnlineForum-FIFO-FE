import { SecondaryButton } from '@/components/core/secondary-button';
import { useCreateFeedback } from '@/hooks/mutate/feedback/use-create-feedback';
import { useMessage } from '@/hooks/use-message';
import { CreateFeedbackPayload } from '@/types/feedback/feedback';
import { isPending } from '@reduxjs/toolkit';
import { Flex, Form, Input, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import React from 'react';
import FeedbackWrapper from './layout/feedback-wrapper';

const FeedbackPage = () => {
    const [form] = Form.useForm();

    const { success, error } = useMessage();

    const { mutate: createFeedback, isPending: isPendingFeedback } = useCreateFeedback();

    const onFinish = (values: CreateFeedbackPayload) => {
        createFeedback(values, {
            onSuccess: () => {
                success('Feedback submitted successfully!');
                form.resetFields();
            },
            onError: err => {
                error(err.message);
            },
        });
    };

    return (
        <FeedbackWrapper>
            <Flex justify="center" vertical gap={24}>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Fill the form to submit your feedback
                </Typography.Title>

                <Form<CreateFeedbackPayload> form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item<CreateFeedbackPayload>
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title!',
                            },
                        ]}
                    >
                        <Input placeholder="Title" size="large" />
                    </Form.Item>

                    <Form.Item<CreateFeedbackPayload>
                        label="Content"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the content!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={5}
                            placeholder="If you have any additional feedback, please type it in here..."
                            size="large"
                        />
                    </Form.Item>

                    <Flex justify="center">
                        <SecondaryButton
                            htmlType="submit"
                            style={{ justifyItems: 'center' }}
                            loading={isPendingFeedback}
                        >
                            Submit Feedback
                        </SecondaryButton>
                    </Flex>
                </Form>
            </Flex>
        </FeedbackWrapper>
    );
};

export default FeedbackPage;
