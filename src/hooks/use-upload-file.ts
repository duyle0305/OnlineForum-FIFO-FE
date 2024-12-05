import { useState } from 'react';
import { storage } from '@/utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const useUploadFile = () => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imgUrlList, setImgUrlList] = useState<string[]>([]);


    const uploadFile = (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                onProgress(
                    {
                        percent: progress,
                    },
                    file,
                );
            },
            error => {
                onError({ err: error });
            },
            () => {
                onSuccess('Ok');
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    setImgUrl(downloadURL as any);
                    setImgUrlList([...imgUrlList, downloadURL]);
                });
            },
        );
    };

    return {
        imgUrl,
        setImgUrl,
        imgUrlList,
        setImgUrlList,
        uploadFile,
    };
};
