import { SecondaryButton } from '@/components/core/secondary-button';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { topicKeys } from '@/consts/factory/topic';
import { useCreateTopic } from '@/hooks/mutate/topic/use-create-topic';
import { useDeleteTopic } from '@/hooks/mutate/topic/use-delete-topic';
import { useUpdateTopic } from '@/hooks/mutate/topic/use-update-topic';
import { useCategoriesListing } from '@/hooks/query/category/use-category-listing';
import { useTopic, useTopicsListing } from '@/hooks/query/topic/use-topics-listing';
import { useMessage } from '@/hooks/use-message';
import { useUploadFile } from '@/hooks/use-upload-file';
import { RootState } from '@/stores';
import { Topic } from '@/types/topic/topic';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Card,
    Flex,
    Form,
    Image,
    Input,
    Modal,
    Select,
    Space,
    Table,
    Typography,
    Upload,
    UploadProps,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UploadFile } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { confirm } = Modal;

interface ModalState {
    type: 'add' | 'edit' | 'detail';
    open: boolean;
    id?: string;
}

type FormValue = {
    name: string;
    categoryId: string;
};

const AdminTopicPage = () => {
    const [form] = Form.useForm();
    const message = useMessage();
    const queryClient = useQueryClient();
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const [modalState, setModalState] = useState<ModalState>({
        type: 'add',
        open: false,
    });
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const { imgUrlList, setImgUrlList, uploadFile } = useUploadFile();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data, isFetching } = useTopicsListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });
    const { data: categories, isFetching: isFetchingCategories } = useCategoriesListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });

    const { data: detail } = useTopic(modalState.id ?? '');
    const { mutate: createTopic, isPending: isPendingCreateTopic } = useCreateTopic();
    const { mutate: updateTopic, isPending: isPendingUpdateTopic } = useUpdateTopic(modalState.id ?? '');
    const { mutate: deleteTopic, isPending: isPendingDeleteTopic } = useDeleteTopic();

    const handleDelete = (id: string) => {
        confirm({
            title: 'Do you want to delete this topic?',
            onOk() {
                deleteTopic(id, {
                    onSuccess: () => {
                        message.success('Topic deleted successfully');
                        queryClient.invalidateQueries({
                            queryKey: topicKeys.listing(),
                        });
                        setModalState({ type: 'detail', open: false });
                    },
                    onError: () => {
                        message.error('Topic deletion failed');
                    },
                });
            },
            onCancel() {},
        });
    };

    const columns: ColumnsType<Topic> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => <Typography.Text>{name}</Typography.Text>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_, record) => record?.category?.name,
        },
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (image: string) => <Image src={image} alt="topic" style={{ width: '100px', height: '100px' }} />,
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setModalState({ type: 'edit', open: true, id: record.topicId });
                        }}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record?.topicId)} />
                </Space>
            ),
        },
    ];

    const uploadButton = () => <Button size="large" type="text" icon={<CameraOutlined />} />;

    const onChangeFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onRemoveFile = (file: UploadFile) => {
        const index = fileList.indexOf(file);
        if (index > -1) {
            const newImgUrlList = imgUrlList.slice();
            newImgUrlList.splice(index, 1);
            setImgUrlList(newImgUrlList);
            setFileList(fileList.filter(item => item.uid !== file.uid));
        }
    };

    const onFinish = (values: FormValue) => {
        createTopic(
            {
                ...values,
                imageUrl: imgUrlList[0],
            },
            {
                onSuccess: () => {
                    message.success('Topic created successfully');
                    queryClient.invalidateQueries({
                        queryKey: topicKeys.listing(),
                    });
                    setModalState({ type: 'add', open: false });
                    form.resetFields();
                    setFileList([]);
                    setPreviewImage('');
                },
                onError: () => {
                    message.error('Topic creation failed');
                },
            },
        );
    };

    const onFinishUpdate = (values: FormValue) => {
        updateTopic(
            {
                ...values,
                imageUrl: imgUrlList[0],
            },
            {
                onSuccess: () => {
                    message.success('Topic updated successfully');
                    queryClient.invalidateQueries({
                        queryKey: topicKeys.listing(),
                    });
                    setModalState({ type: 'edit', open: false });
                    form.resetFields();
                    setFileList([]);
                    setPreviewImage('');
                },
                onError: () => {
                    message.error('Topic update failed');
                },
            },
        );
    };

    const onCancelCreate = () => {
        setModalState({ type: 'add', open: false });
    };

    const onCancelUpdate = () => {
        setModalState({ type: 'edit', open: false });
    };

    useEffect(() => {
        if (detail) {
            form.setFieldsValue({
                name: detail.name,
                categoryId: detail.category?.categoryId,
            });
            setImgUrlList([detail.imageUrl]);
            setFileList([
                {
                    uid: '-1',
                    name: detail.imageUrl,
                    status: 'done',
                    url: detail.imageUrl,
                },
            ]);
            setPreviewImage(detail.imageUrl);
        }
    }, [detail]);

    return (
        <Card>
            <Flex vertical gap={20}>
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>Category</Typography.Title>
                    <SecondaryButton
                        onClick={() => {
                            setModalState({ type: 'add', open: true });
                            form.resetFields();
                            setFileList([]);
                            setPreviewImage('');
                        }}
                    >
                        Add New Topic
                    </SecondaryButton>
                </Flex>

                <Table<Topic>
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                    rowKey="topicId"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Flex>

            <Modal
                title="Add New Topic"
                open={modalState.type === 'add' && modalState.open}
                footer={null}
                onCancel={onCancelCreate}
            >
                <Form layout="vertical" form={form} name="topic-form" onFinish={onFinish}>
                    <Flex vertical align="center" justify="center" gap={10}>
                        <Upload
                            accept="image/*"
                            customRequest={uploadFile}
                            listType="picture-circle"
                            maxCount={1}
                            showUploadList={false}
                            onChange={onChangeFile}
                            onRemove={onRemoveFile}
                        >
                            {uploadButton()}
                        </Upload>

                        <Flex gap={10} wrap>
                            <Upload listType="picture-card" fileList={fileList} onRemove={onRemoveFile} />
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: visible => setPreviewOpen(visible),
                                        afterOpenChange: visible => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Flex>
                    </Flex>

                    <Form.Item<FormValue>
                        label="Topic Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter topic name',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Choose Category"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category',
                            },
                        ]}
                    >
                        <Select
                            size="large"
                            options={
                                categories?.map(category => ({
                                    label: category.name,
                                    value: category.categoryId,
                                })) ?? []
                            }
                            loading={isFetchingCategories}
                        />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelCreate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingCreateTopic} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Update Topic"
                open={modalState.type === 'edit' && modalState.open}
                footer={null}
                onCancel={onCancelUpdate}
            >
                <Form layout="vertical" form={form} name="topic-form" onFinish={onFinishUpdate}>
                    <Flex vertical align="center" justify="center" gap={10}>
                        <Upload
                            accept="image/*"
                            customRequest={uploadFile}
                            listType="picture-circle"
                            maxCount={1}
                            showUploadList={false}
                            onChange={onChangeFile}
                            onRemove={onRemoveFile}
                        >
                            {uploadButton()}
                        </Upload>

                        <Flex gap={10} wrap>
                            <Upload listType="picture-card" fileList={fileList} onRemove={onRemoveFile} />
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: visible => setPreviewOpen(visible),
                                        afterOpenChange: visible => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Flex>
                    </Flex>

                    <Form.Item<FormValue>
                        label="Topic Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter topic name',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Choose Category"
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category',
                            },
                        ]}
                    >
                        <Select
                            size="large"
                            options={
                                categories?.map(category => ({
                                    label: category.name,
                                    value: category.categoryId,
                                })) ?? []
                            }
                            loading={isFetchingCategories}
                        />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelUpdate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingUpdateTopic} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </Card>
    );
};

export default AdminTopicPage;
