import { SecondaryButton } from '@/components/core/secondary-button';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { tagKeys } from '@/consts/factory/tag';
import { useCreateTag } from '@/hooks/mutate/tag/use-create-tag';
import { useDeleteTag } from '@/hooks/mutate/tag/use-delete-tag';
import { useUpdateTag } from '@/hooks/mutate/tag/use-update-tag';
import { useTag, useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { useMessage } from '@/hooks/use-message';
import { useUploadFile } from '@/hooks/use-upload-file';
import { RootState } from '@/stores';
import { Tag } from '@/types/tag/tag';
import { CameraOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Card,
    ColorPicker,
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
import { Color } from 'antd/es/color-picker';
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
    backgroundColorHex: Color;
    textColorHex: Color;
};

const AdminTagPage = () => {
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

    const { data, isFetching } = useTagsListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });

    const { data: detail } = useTag(modalState.id ?? '');
    const { mutate: createTag, isPending: isPendingCreateTag } = useCreateTag();
    const { mutate: updateTag, isPending: isPendingUpdateTag } = useUpdateTag(modalState.id ?? '');
    const { mutate: deleteTag, isPending: isPendingDeleteTag } = useDeleteTag();

    const handleDelete = (id: string) => {
        confirm({
            title: 'Do you want to delete this tag?',
            onOk() {
                deleteTag(id, {
                    onSuccess: () => {
                        message.success('Tag deleted successfully');
                        queryClient.invalidateQueries({
                            queryKey: tagKeys.listing(),
                        });
                        setModalState({ type: 'detail', open: false });
                    },
                    onError: () => {
                        message.error('Tag deletion failed');
                    },
                });
            },
            onCancel() {},
        });
    };

    const columns: ColumnsType<Tag> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => <Typography.Text>{name}</Typography.Text>,
        },
        {
            title: 'Background Color Hex',
            dataIndex: 'backgroundColorHex',
            key: 'backgroundColorHex',
            render: (backgroundColorHex, record) => <ColorPicker format="hex" value={backgroundColorHex} disabled />,
        },
        {
            title: 'Text Color Hex',
            dataIndex: 'textColorHex',
            key: 'textColorHex',
            render: (backgroundColorHex, record) => <ColorPicker format="hex" value={backgroundColorHex} disabled />,
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
                            setModalState({ type: 'edit', open: true, id: record.tagId });
                        }}
                    />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record?.tagId)} />
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
        createTag(
            {
                ...values,
                backgroundColorHex:
                    typeof values.backgroundColorHex === 'string'
                        ? values.backgroundColorHex
                        : values.backgroundColorHex.toHexString(),
                textColorHex:
                    typeof values.textColorHex === 'string' ? values.textColorHex : values.textColorHex.toHexString(),
            },
            {
                onSuccess: () => {
                    message.success('Topic created successfully');
                    queryClient.invalidateQueries({
                        queryKey: tagKeys.listing(),
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
        updateTag(
            {
                ...values,
                backgroundColorHex:
                    typeof values.backgroundColorHex === 'string'
                        ? values.backgroundColorHex
                        : values.backgroundColorHex.toHexString(),
                textColorHex:
                    typeof values.textColorHex === 'string' ? values.textColorHex : values.textColorHex.toHexString(),
            },
            {
                onSuccess: () => {
                    message.success('Topic updated successfully');
                    queryClient.invalidateQueries({
                        queryKey: tagKeys.listing(),
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
                backgroundColorHex: detail.backgroundColorHex,
                textColorHex: detail.textColorHex,
            });
        }
    }, [detail]);

    return (
        <Card>
            <Flex vertical gap={20}>
                <Flex justify="space-between" align="center">
                    <Typography.Title level={4}>Tag</Typography.Title>
                    <SecondaryButton
                        onClick={() => {
                            setModalState({ type: 'add', open: true });
                            form.resetFields();
                            setFileList([]);
                            setPreviewImage('');
                        }}
                    >
                        Add New Tag
                    </SecondaryButton>
                </Flex>

                <Table<Tag>
                    loading={isFetching}
                    columns={columns}
                    dataSource={data}
                    rowKey="tagId"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                />
            </Flex>

            <Modal
                title="Add New Tag"
                open={modalState.type === 'add' && modalState.open}
                footer={null}
                onCancel={onCancelCreate}
            >
                <Form layout="vertical" form={form} name="topic-form" onFinish={onFinish}>
                    <Form.Item<FormValue>
                        label="Tag Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter tag name',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Background Color Hex"
                        name="backgroundColorHex"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose background color',
                            },
                        ]}
                    >
                        <ColorPicker format="hex" size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Text Color Hex"
                        name="textColorHex"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose text color',
                            },
                        ]}
                    >
                        <ColorPicker format="hex" size="large" />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelCreate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingCreateTag} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Update Tag"
                open={modalState.type === 'edit' && modalState.open}
                footer={null}
                onCancel={onCancelUpdate}
            >
                <Form layout="vertical" form={form} name="topic-form" onFinish={onFinishUpdate}>
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
                        label="Background Color Hex"
                        name="backgroundColorHex"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category',
                            },
                        ]}
                    >
                        <ColorPicker format="hex" size="large" />
                    </Form.Item>

                    <Form.Item<FormValue>
                        label="Text Color Hex"
                        name="textColorHex"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose category',
                            },
                        ]}
                    >
                        <ColorPicker format="hex" size="large" />
                    </Form.Item>

                    <Flex justify="end">
                        <Button htmlType="button" onClick={onCancelUpdate}>
                            Cancel
                        </Button>
                        <Button type="primary" loading={isPendingUpdateTag} htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </Card>
    );
};

export default AdminTagPage;
