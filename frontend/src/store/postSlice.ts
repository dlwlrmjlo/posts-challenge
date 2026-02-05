import { createSlice, type PayloadAction, createSelector } from '@reduxjs/toolkit';

export interface Post {
    id: number;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

interface PostsState {
    items: Post[];
    filter: string;
}

const initialState: PostsState = {
    items: [],
    filter: '',
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.items = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.items.push(action.payload);
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(post => post.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
});

export const { setPosts, addPost, removePost, setFilter } = postsSlice.actions;

export const selectAllPosts = (state: { posts: PostsState }) => state.posts.items;
export const selectFilter = (state: { posts: PostsState }) => state.posts.filter;

export const selectFilteredPosts = createSelector(
    [selectAllPosts, selectFilter],
    (posts, filter) => {
        if (!filter) return posts;
        return posts.filter(post =>
            post.name.toLowerCase().includes(filter.toLowerCase()) ||
            post.description.toLowerCase().includes(filter.toLowerCase())
        );
    }
);

export default postsSlice.reducer;
