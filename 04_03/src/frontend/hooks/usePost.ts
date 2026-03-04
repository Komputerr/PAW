import {useQuery} from "@tanstack/react-query";
import type {Post} from "../types/Post/Post.ts";

export const getPost = async (id: string | undefined) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json());
}
export const usePost = (id: string | undefined) => {
    return useQuery<Post>(
        {
            queryKey: ['post', id],
            queryFn: () => getPost(id)
        }
    )
}