import { useQuery } from '@tanstack/react-query';
import type { Post } from '../types/Post/Post.ts';

const getPost = async (id: string | undefined): Promise<Post> => {
    const res = await fetch(`/api/post/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
};

export const usePost = (id: string | undefined) => {
    return useQuery<Post>({
        queryKey: ['post', id],
        queryFn: () => getPost(id),
        enabled: !!id
    });
};