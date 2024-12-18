import type { RootState } from '@/stores';
import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL as string;

export const useWebSocket = () => {
    const [socket, setSocket] = useState<Socket>(() => io(URL));

    const accountInfo = useSelector((state: RootState) => state.account.accountInfo);

    useEffect(() => {
        let socket = io(URL);

        if (accountInfo?.accountId) {
            socket = io(`${URL}?accountId=${accountInfo?.accountId}`);
        }

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, [accountInfo]);

    return socket;
};
