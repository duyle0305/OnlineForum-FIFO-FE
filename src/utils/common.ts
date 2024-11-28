import type { PageData } from '@/types';
import { NavigateFunction, NavigationType } from "react-router-dom"


export function getStrTimesIndex(str: string, cha: string, num: number) {
    let x = str.indexOf(cha);

    for (let i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
    }

    return x;
}

export function getFirstPathCode(path: string) {
    const index0 = getStrTimesIndex(path, '/', 0);
    const index1 = getStrTimesIndex(path, '/', 1);

    const activeKey = path.slice(index0 + 1, index1 > 0 ? index1 : path.length);

    return activeKey;
}


export const getTableData = <T extends any[]>(pageNum = 1, pageSize = 10, totalData: T) => {
    const total: number = totalData.length;
    const tableData: PageData<T[0]> = {
        data: [],
        pageNum,
        pageSize,
        total,
    };

    if (pageSize >= total) {
        tableData.data = totalData;
        tableData.pageNum = 1;
    } else {
        const num = pageSize * (pageNum - 1);

        if (num < total) {
            const startIndex = num;
            const endIndex = num + pageSize - 1;

            tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex);
        } else {
            const size = Math.ceil(total / pageSize);
            const rest = total % pageSize;

            if (rest > 0) {
                tableData.pageNum = size + 1;
                tableData.data = totalData.filter((_, index) => index >= pageSize * size && index <= total);
            } else if (rest === 0) {
                tableData.pageNum = size;
                tableData.data = totalData.filter((_, index) => index >= pageSize * (size - 1) && index <= total);
            }
        }
    }

    return tableData;
};

export function getGlobalState() {
    const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP';
    const collapsed = device !== 'DESKTOP';

    return {
        device,
        collapsed,
    } as const;
}


interface HistoryNavigationType {
    navigate?: any,
    location?: any
}

export const historyNavigation = {
    navigate: null,
    location: null
} as HistoryNavigationType;
