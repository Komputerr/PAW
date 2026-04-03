import { useQuery } from '@tanstack/react-query';
import type { Post } from '../types/Post/Post.ts';

const getPosts = async (): Promise<Post[]> => {
    const res = await fetch('/api/post');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
};

export const usePosts = () => {
    return useQuery<Post[]>({ queryKey: ['posts'], queryFn: getPosts });
};