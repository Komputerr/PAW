import {useQuery} from "@tanstack/react-query";
import type {Post} from "../types/Post/Post.ts";

const getPosts = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
}
export const usePosts = () => {
    return useQuery<Post[]>(
        {
            queryKey: ['posts'],
            queryFn: getPosts
        }
    )
}