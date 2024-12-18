import { SecondaryButton } from '@/components/core/secondary-button';
import ToggleTruncateTextTypography from '@/components/post/toggle-truncate-text-typography';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { categoryKeys } from '@/consts/factory/category';
import { useCreateCategory } from '@/hooks/mutate/category/use-create-category';
import { useDeleteCategory } from '@/hooks/mutate/category/use-delete-category';
import { useUpdateCategory } from '@/hooks/mutate/category/use-update-category';
import { useCategoriesListing, useCategory } from '@/hooks/query/category/use-category-listing';
import { useMessage } from '@/hooks/use-message';
import { useUploadFile } from '@/hooks/use-upload-file';
import { RootState } from '@/stores';
import { Category, CreateCategoryPayload } from '@/types/category/category';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Flex, Form, Image, Input, Modal, Space, Table, Typography, Upload, UploadProps } from 'antd';
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
    description: string;
};

const AdminCategoryPage = () => {
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

    const { data, isFetching } = useCategoriesListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });
    const { data: detail } = useCategory(modalState.id ?? '');
    const { mutate: createCategory, isPending: isPendingCreateCategory } = useCreateCategory();
    const { mutate: updateCategory, isPending: isPendingUpdateCategory } = useUpdateCategory(modalState.id ?? '');
    const { mutate: deleteCategory, isPending: isPendingDeleteCategory } = useDeleteCategory();

    const handleDelete = (id: string) => {
        confirm({
            title: 'Do you want to delete this category?',
            onOk() {
                deleteCategory(id, {
                    onSuccess: () => {
                        message.success('Category deleted successfully');
                        queryClient.invalidateQueries({
                            queryKey: categoryKeys.listing(),
                        });
                        setModalState({ type: 'detail', open: false });
                    },
                    onError: () => {
                        message.error('Category deletion failed');
                    },
                });
            },
            onCancel() {},
        });
    };

    const columns: ColumnsType<Category> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <Typography.Text
                    style={{
                        color: '#1890ff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setModalState({
                            type: 'detail',
                            open: true,
                            id: record.categoryId,
                        });
                    }}
                >
                    {name}
                </Typography.Text>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => <ToggleTruncateTextTypography key={description} content={description} maxLength={200} />,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image src={image} alt="category" style={{ width: '100px', height: '100px' }} />,
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
                            setModalState({ type: 'edit', open: true, id: record.categoryId });
                        }}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record?.categoryId)} />
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

    const onFinish = (values: CreateCategoryPayload) => {
        createCategory(
            {
                ...values,
                image: imgUrlList[0],
                accountId: accountInfo?.accountId ?? '',
            },
            {
                onSuccess: () => {
                    message.success('Category created successfully');
                    queryClient.invalidateQueries({
                        queryKey: categoryKeys.listing(),
                    });
                    setModalState({ type: 'add', open: false });
                    form.resetFields();
                    setFileList([]);
                    setPreviewImage('');
                },
                onError: () => {
                    message.error('Category creation failed');
                },
            },
        );
    };

    const onFinishUpdate = (values: CreateCategoryPayload) => {
        updateCategory(
            {
                ...values,
                image: imgUrlList[0],
                accountId: accountInfo?.accountId ?? '',
            },
            {
                onSuccess: () => {
                    message.success('Category updated successfully');
                    queryClient.invalidateQueries({
                        queryKey: categoryKeys.listing(),
                    });
                    setModalState({ type: 'edit', open: false });
                    form.resetFields();
                    setFileList([]);
                    setPreviewImage('');
                },
                onError: () => {
                    message.error('Category update failed');
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
                description: detail.description,
            });
            setImgUrlList([detail.image]);
            setFileList([
                {
                    uid: '-1',
                    name: detail.image,
                    status: 'done',
                    url: detail.image,
                },
            ]);
            setPreviewImage(detail.image);
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
                        Add New Category
                    </SecondaryButton>
                </Flex>

                <Table<Category>
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                    rowKey="categoryId"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Flex>

            <Modal
                title="Add New Category"
                open={modalState.type === 'add' && modalState.open}
                footer={null}
                onCancel={onCancelCreate}
            >
                <Form layout="vertical" form={form} name="category-form" onFinish={onFinish}>
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
                        label="Category Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter category name',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter description',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={5}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelCreate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingCreateCategory} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Update Category"
                open={modalState.type === 'edit' && modalState.open}
                footer={null}
                onCancel={onCancelUpdate}
            >
                <Form layout="vertical" form={form} name="category-form" onFinish={onFinishUpdate}>
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
                        label="Category Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter category name',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter description',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={5}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelUpdate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingUpdateCategory} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Category Detail"
                open={modalState.type === 'detail' && modalState.open}
                footer={null}
                onCancel={() => setModalState({ type: 'detail', open: false })}
                width={'80vw'}
            >
                <Flex gap={20}>
                    <Image
                        src={detail?.image}
                        alt="category"
                        style={{
                            objectFit: 'contain',
                            borderRadius: 16,
                            width: '100%',
                            height: '100%',
                        }}
                    />

                    <Flex vertical gap={10}>
                        <Flex justify="space-between">
                            <Typography.Title level={4}>{detail?.name}</Typography.Title>

                            <Button.Group>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setModalState({ type: 'edit', open: true, id: detail?.categoryId });
                                    }}
                                />
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(detail?.categoryId ?? '')}
                                />
                            </Button.Group>
                        </Flex>
                        <Typography.Paragraph>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detail?.description ?? '',
                                }}
                            />
                        </Typography.Paragraph>
                    </Flex>
                </Flex>
            </Modal>
        </Card>
    );
};

export default AdminCategoryPage;
