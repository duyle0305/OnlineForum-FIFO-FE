export type Tag = {
    tagId: string;
    name: string;
    backgroundColorHex: string;
    textColorHex: string;
};

export type CreateTagPayload = {
    name: string;
    backgroundColorHex: string;
    textColorHex: string;
}