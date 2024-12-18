import { UserInfo } from '@/components/user/user-info';
import {
    Button,
    Card,
    Flex,
    Form,
    Image,
    Input,
    message,
    Modal,
    Select,
    Space,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';
import { OnAction } from '@/types';
import { FC, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { UpdatePostPayload } from '@/types/post/post';
import { useMessage } from '@/hooks/use-message';
import { useUpdatePost } from '@/hooks/mutate/post/use-update-post';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useUploadFile } from '@/hooks/use-upload-file';
import { TopicListingParams, useTopicsListing } from '@/hooks/query/topic/use-topics-listing';
import { useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useDispatch } from 'react-redux';
import { setPost } from '@/stores/post';
import { PaperClipOutlined } from '@ant-design/icons';
import Tiptap from '@/components/tiptap/tiptap';
import { getStorage, ref } from 'firebase/storage';

interface UpdatePostProps {
    onCancel?: OnAction;
}

const initialParams: TopicListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const UpdatePost: FC<UpdatePostProps> = ({ onCancel }) => {
    const { accountInfo } = useSelector((state: RootState) => state.account);
    const [form] = Form.useForm();
    const storage = getStorage();

    const watchContent = Form.useWatch('content', form);

    const dispatch = useDispatch();
    const { type, open } = useSelector((state: RootState) => state.post.modal);
    const queryClient = useQueryClient();
    const { success, error } = useMessage();
    const id = useSelector((state: RootState) => state.post.id);

    const { imgUrl, imgUrlList, setImgUrlList, uploadFile } = useUploadFile();
    const { imgUrlList: urlFileList, setImgUrlList: setUrlFileList, uploadFile: upLoadAnotherFile } = useUploadFile();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [anotherFileList, setAnotherFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const { data: topics, isLoading: isLoadingTopics } = useTopicsListing({ params: initialParams });
    const { data: tags, isLoading: isLoadingTags } = useTagsListing({ params: initialParams });
    const { data: detail } = useGetPost(id ?? '');
    const { mutate: updatePost, isPending: isPendingUpdatePost } = useUpdatePost(id ?? '', {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
        },
    });

    const onFinish = (values: UpdatePostPayload) => {
        updatePost(
            {
                ...values,
                ...(fileList.length > 0 && {
                    imageUrlList: fileList.map(file => ({
                        url: file.url as string,
                    })),
                }),
                ...(urlFileList.length > 0 && {
                    linkFile: urlFileList[0] as string,
                    postFileUrlRequest: [{ url: urlFileList[0] as string }],
                }),
            },
            {
                onSuccess: () => {
                    success('Post updated successfully!');
                    onCancel && onCancel();
                    dispatch(setPost({ id: undefined }));
                    form.resetFields();
                    setImgUrlList([]);
                    setUrlFileList([]);
                    setAnotherFileList([]);
                },
                onError: err => {
                    error(err.message);
                },
            },
        );
    };

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

    useEffect(() => {
        const appendFieldFileList = fileList.map((file, index) => {
            return {
                ...file,
                url: imgUrlList[index],
            };
        });
        setFileList(appendFieldFileList);
    }, [imgUrlList]);

    useEffect(() => {
        if (detail) {
            setImgUrlList(detail?.imageList?.map(image => image.url) || []);
            setFileList(
                detail?.imageList?.map(image => ({
                    uid: image.imageId,
                    name: image.url,
                    url: image.url,
                    status: 'done',
                })) || [],
            );
            form.setFieldsValue({
                title: detail?.title,
                content: detail?.content,
                topicId: detail?.topic?.topicId,
                tagId: detail?.tag?.tagId,
            });
            setUrlFileList(detail?.postFileList?.[0]?.url ? [detail?.postFileList?.[0]?.url] : []);
            setAnotherFileList(
                detail?.postFileList?.[0]?.url
                    ? [
                          {
                              uid: detail?.postFileList?.[0]?.url,
                              name: ref(storage, detail?.postFileList?.[0]?.url)?.name,
                              url: detail?.postFileList?.[0]?.url,
                              status: 'done',
                          },
                      ]
                    : [],
            );
        }
    }, [detail]);

    return (
        <Modal title="Update Post" open={type === 'update' && open} onCancel={onCancel} footer={null} width={'80vw'}>
            <Card>
                <Flex vertical gap={10}>
                    <UserInfo account={accountInfo!} />

                    <Form<UpdatePostPayload> layout="vertical" form={form} name="updatePost" onFinish={onFinish}>
                        <Form.Item<UpdatePostPayload>
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter post title!' }]}
                        >
                            <Input size="large" placeholder="Post title goes here..." />
                        </Form.Item>

                        <Form.Item<UpdatePostPayload>
                            name="topicId"
                            label="Topic"
                            rules={[{ required: true, message: 'Please select a topic!' }]}
                        >
                            <Select
                                size="large"
                                loading={isLoadingTopics}
                                placeholder="Select a topic"
                                options={topics?.map(topic => ({
                                    label: topic.name,
                                    value: topic.topicId,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item<UpdatePostPayload>
                            name="tagId"
                            label="Tags"
                            rules={[{ required: true, message: 'Please select a tag!' }]}
                        >
                            <Select
                                size="large"
                                loading={isLoadingTags}
                                placeholder="Select tags"
                                options={tags?.map(tag => ({
                                    label: tag.name,
                                    value: tag.tagId,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item<UpdatePostPayload> name="content" label="Description">
                            {/* <Input.TextArea
                                size="large"
                                rows={5}
                                placeholder="Let's share what going on your mind..."
                            /> */}
                            <Tiptap
                                onChange={content => form.setFieldValue('content', content)}
                                content={watchContent || detail?.content || ''}
                                key={detail?.content || watchContent}
                            />
                        </Form.Item>
                    </Form>

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

                    <Upload fileList={anotherFileList} onRemove={onRemoveAnotherFile} />

                    <Flex align="center" justify="space-between">
                        <Space size="large">
                            <Upload
                                customRequest={uploadFile}
                                onChange={onChangeFile}
                                onRemove={onRemoveFile}
                                showUploadList={false}
                                fileList={fileList}
                            >
                                <Button type="text" icon={<img src={GallerySvg} />} />
                            </Upload>
                            <Upload
                                customRequest={upLoadAnotherFile}
                                onChange={onChangeAnotherFile}
                                onRemove={onRemoveAnotherFile}
                                showUploadList={false}
                                fileList={anotherFileList}
                                maxCount={1}
                                accept=".zip,.rar,.7zip,.tar,.tar.gz"
                            >
                                <Button type="text" icon={<PaperClipOutlined />} />
                            </Upload>
                        </Space>

                        <Space>
                            <Button loading={isPendingUpdatePost} form="updatePost" type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Space>
                    </Flex>
                </Flex>
            </Card>
        </Modal>
    );
};
