import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PostModalType = 'update' | 'create' | 'draft' | 'report';

export interface PostState {
    modal: {
        open: boolean;
        type: PostModalType;
    };
    id?: string;
}

const initialStates: PostState = {
    modal: {
        open: false,
        type: 'create',
    },
};

const postSlice = createSlice({
    name: 'post',
    initialState: initialStates,
    reducers: {
        setPost(state, action: PayloadAction<Partial<PostState>>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
