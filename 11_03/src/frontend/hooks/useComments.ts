import { useQuery } from '@tanstack/react-query';
import type { Comment } from '../types/Comment/Comment.ts';

const getComments = async (id: string | undefined): Promise<Comment[]> => {
    const res = await fetch(`/api/comment/post/${id}`);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
};

export const useComments = (id: string | undefined) => {
    return useQuery<Comment[]>({
        queryKey: ['comments', id],
        queryFn: () => getComments(id),
        enabled: !!id
    });
};