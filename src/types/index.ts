import { UploadFile } from "antd";

export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}

export type Response<T = unknown> = {
  success: boolean;
  code?: number;
  message: string;
  entity: T;
};

export type SortDirection = 'ASC' | 'DESC';

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
  sortBy?: string,
  sortDir?: SortDirection
}

export interface StatusResponse {
  status: boolean;
}

export interface ListResponse<T> {
  items: T[];
}


export interface StatusCount {
  status: string;
  count: number;
}

export type OnAction = (...args: unknown[]) => void;

export type PaginationParams = {
  page: number;
  perPage: number;
}

export type ImageResponse = {
  imageId: string;
  url: string;
}

export type FileFirebase = {
    name: string;
    bucket: string;
    generation: string;
    metageneration: string;
    contentType: string;
    timeCreated: string;
    updated: string;
    storageClass: string;
    size: string;
    md5Hash: string;
    contentEncoding: string;
    contentDisposition: string;
    crc32c: string;
    etag: string;
    downloadTokens: string;
    url: string;
};

export type FileUploaded = UploadFile & FileFirebase;
