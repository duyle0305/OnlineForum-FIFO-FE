import { SecondaryButton } from '@/components/core/secondary-button';
import ToggleTruncateTextTypography from '@/components/post/toggle-truncate-text-typography';
import { DATE_FORMAT, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { categoryKeys } from '@/consts/factory/category';
import { redeemKeys } from '@/consts/factory/redeem';
import { useCreateCategory } from '@/hooks/mutate/category/use-create-category';
import { useDeleteCategory } from '@/hooks/mutate/category/use-delete-category';
import { useUpdateCategory } from '@/hooks/mutate/category/use-update-category';
import { useCreateReward } from '@/hooks/mutate/redeem/use-create-redeem';
import { useDeleteRedeem } from '@/hooks/mutate/redeem/use-delete-redeem';
import { useUpdateReward } from '@/hooks/mutate/redeem/use-update-redeem';
import { useCategoriesListing, useCategory } from '@/hooks/query/category/use-category-listing';
import { useGetRewards } from '@/hooks/query/redeem/use-my-reward';
import { useRewardDetail } from '@/hooks/query/redeem/use-redeem-documents';
import { useMessage } from '@/hooks/use-message';
import { useUploadFile } from '@/hooks/use-upload-file';
import { RootState } from '@/stores';
import { Category, CreateCategoryPayload } from '@/types/category/category';
import { RedeemDocument } from '@/types/redeem/redeem';
import { CameraOutlined, DeleteOutlined, EditOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Card,
    Col,
    Flex,
    Form,
    Image,
    Input,
    InputNumber,
    Modal,
    Row,
    Space,
    Table,
    Tooltip,
    Typography,
    Upload,
    UploadProps,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UploadFile } from 'antd/lib';
import dayjs from 'dayjs';
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
    price: number;
    description: string;
    linkSourceCode: string;
};

const AdminRewardPage = () => {
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
    const { imgUrlList: urlFileList, setImgUrlList: setUrlFileList, uploadFile: upLoadAnotherFile } = useUploadFile();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [anotherFileList, setAnotherFileList] = useState<UploadFile[]>([]);

    const { data, isFetching } = useGetRewards();

    const { data: detail } = useRewardDetail(modalState.id ?? '');
    const { mutate: createReward, isPending: isPendingCreateReward } = useCreateReward();
    const { mutate: updateReward, isPending: isPendingUpdateReward } = useUpdateReward(modalState.id ?? '');
    const { mutate: deleteReward, isPending: isPendingDeleteCategory } = useDeleteRedeem();

    const handleDelete = (id: string) => {
        confirm({
            title: 'Do you want to delete this reward?',
            onOk() {
                deleteReward(id, {
                    onSuccess: () => {
                        message.success('Reward deleted successfully');
                        queryClient.invalidateQueries({
                            queryKey: redeemKeys.listing(),
                        });
                        setModalState({ type: 'detail', open: false });
                    },
                    onError: () => {
                        message.error('Reward deletion failed');
                    },
                });
            },
            onCancel() {},
        });
    };

    const columns: ColumnsType<RedeemDocument> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image src={image} alt="category" style={{ width: '100px', height: '100px' }} />,
        },
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
                            id: record.rewardId,
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
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate: string) => dayjs(createdDate).format(DATE_FORMAT),
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
                            setModalState({ type: 'edit', open: true, id: record.rewardId });
                        }}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record?.rewardId)} />
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

    const onChangeAnotherFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setAnotherFileList(newFileList);
    };

    const onRemoveAnotherFile = (file: UploadFile) => {
        const index = anotherFileList.indexOf(file);
        if (index > -1) {
            const newImgUrlList = urlFileList.slice();
            newImgUrlList.splice(index, 1);
            setUrlFileList(newImgUrlList);
            setAnotherFileList(anotherFileList.filter(item => item.uid !== file.uid));
        }
    };

    const onFinish = (values: FormValue) => {
        createReward(
            {
                ...values,
                image: imgUrlList[0],
                linkSourceCode: urlFileList[0]
            },
            {
                onSuccess: () => {
                    message.success('Reward created successfully');
                    queryClient.invalidateQueries({
                        queryKey: redeemKeys.listing(),
                    });
                    setModalState({ type: 'add', open: false });
                    form.resetFields();
                    setFileList([]);
                    setAnotherFileList([]);
                    setPreviewImage('');
                },
                onError: (err) => {
                    message.error(err?.message || 'Reward creation failed');
                },
            },
        );
    };

    const onFinishUpdate = (values: FormValue) => {
        updateReward(
            {
                ...values,
                image: imgUrlList[0],
                linkSourceCode: urlFileList[0],
            },
            {
                onSuccess: () => {
                    message.success('Reward updated successfully');
                    queryClient.invalidateQueries({
                        queryKey: redeemKeys.listing(),
                    });
                    setModalState({ type: 'edit', open: false });
                    form.resetFields();
                    setFileList([]);
                    setAnotherFileList([]);
                    setPreviewImage('');
                },
                onError: (err) => {
                    message.error(err?.message || 'Reward update failed');
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
                price: detail.price,
                linkSourceCode: detail.linkSourceCode
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
            setUrlFileList([detail.linkSourceCode]);
            setAnotherFileList([
                {
                    uid: '-1',
                    name: detail.linkSourceCode,
                    status: 'done',
                    url: detail.linkSourceCode,
                },
            ]);
            setPreviewImage(detail.image);
        }
    }, [detail]);

    return (
        <Card>
            <Flex vertical gap={20}>
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>Reward</Typography.Title>
                    <SecondaryButton
                        onClick={() => {
                            setModalState({ type: 'add', open: true });
                            form.resetFields();
                            setFileList([]);
                            setAnotherFileList([]);
                            setPreviewImage('');
                        }}
                    >
                        Add New Reward
                    </SecondaryButton>
                </Flex>

                <Table<RedeemDocument>
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                    rowKey="rewardId"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Flex>

            <Modal
                title="Add New Reward"
                open={modalState.type === 'add' && modalState.open}
                footer={null}
                onCancel={onCancelCreate}
                width={'80vw'}
            >
                <Form layout="vertical" form={form} name="reward-form" onFinish={onFinish}>
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

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormValue>
                                label="Reward Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter reward name',
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item<FormValue>
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter reward price',
                                    },
                                ]}
                            >
                                <InputNumber size="large" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
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
                                <Input
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item<FormValue> label="Link Source Code" name="linkSourceCode">
                                <Upload
                                    customRequest={upLoadAnotherFile}
                                    onChange={onChangeAnotherFile}
                                    onRemove={onRemoveAnotherFile}
                                    showUploadList={false}
                                    fileList={anotherFileList}
                                    maxCount={1}
                                    accept=".zip,.rar,.7zip,.tar,.tar.gz"
                                >
                                    <Tooltip title="Upload File">
                                        <Button icon={<PaperClipOutlined />}>Upload Source Code</Button>
                                    </Tooltip>
                                </Upload>
                            </Form.Item>
                            <Upload fileList={anotherFileList} onRemove={onRemoveAnotherFile} />
                        </Col>
                    </Row>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelCreate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingCreateReward} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Update Reward"
                open={modalState.type === 'edit' && modalState.open}
                footer={null}
                onCancel={onCancelUpdate}
                width={'80vw'}
            >
                <Form layout="vertical" form={form} name="reward-form" onFinish={onFinishUpdate}>
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

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormValue>
                                label="Reward Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter reward name',
                                    },
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item<FormValue>
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter reward price',
                                    },
                                ]}
                            >
                                <InputNumber size="large" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
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
                                <Input
                                    size="large"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item<FormValue> label="Link Source Code" name="linkSourceCode">
                                <Upload
                                    customRequest={upLoadAnotherFile}
                                    onChange={onChangeAnotherFile}
                                    onRemove={onRemoveAnotherFile}
                                    showUploadList={false}
                                    fileList={anotherFileList}
                                    maxCount={1}
                                    accept=".zip,.rar,.7zip,.tar,.tar.gz"
                                >
                                    <Tooltip title="Upload File">
                                        <Button icon={<PaperClipOutlined />}>Upload Source Code</Button>
                                    </Tooltip>
                                </Upload>
                            </Form.Item>
                            <Upload fileList={anotherFileList} onRemove={onRemoveAnotherFile} />
                        </Col>
                    </Row>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelCreate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingCreateReward} htmlType="submit">
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
                                        setModalState({ type: 'edit', open: true, id: detail?.rewardId });
                                    }}
                                />
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(detail?.rewardId ?? '')}
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

export default AdminRewardPage;
