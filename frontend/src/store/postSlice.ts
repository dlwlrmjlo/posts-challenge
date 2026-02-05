import { createSlice, createAsyncThunk, type PayloadAction, createSelector } from '@reduxjs/toolkit';

import { postService } from "../services/api";

export interface Post {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PostsState {
    items: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    filter: string;
    error: string | null;
}

const initialState: PostsState = {
    items: [],
    status: 'idle',
    filter: '',
    error: null,
}

//async actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await postService.getAll();
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost: { name: string, description: string }) => {
    const response = await postService.create(newPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
    await postService.delete(id);
    return id;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch posts';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload);
            });
    }
});

export const { setFilter } = postsSlice.actions;

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.items;

export const selectFilter = (state: { posts: PostsState }) => state.posts.filter;

export const selectFilteredPosts = (state: { posts: PostsState }) => {
    const filter = state.posts.filter.toLowerCase();
    return state.posts.items.filter(post =>
        post.name.toLowerCase().includes(filter) ||
        post.description.toLowerCase().includes(filter)
    );
};

export default postsSlice.reducer;

