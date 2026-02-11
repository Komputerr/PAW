import {useQuery} from "@tanstack/react-query";
import type {Comment} from "../types/Comment/Comment.ts";

const getComments = async (id: string | undefined) => {
    return await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then((res) => res.json());
}
export const useComments = (id: string | undefined) => {
    return useQuery<Comment[]>(
        {
            queryKey: ['comments', id],
            queryFn: () => getComments(id)
        }
    )
}