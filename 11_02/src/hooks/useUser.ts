import {useQuery} from "@tanstack/react-query";
import type {User} from "../types/User/User.ts";
import type {Post} from "../types/Post/Post.ts";
import {getPost} from "./usePost.ts";

const getUser = async (id: string | undefined) => {
    const post: Post = await getPost(id)
    return await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then((res) => res.json());
}
export const useUser = (id: string | undefined) => {
    return useQuery<User>(
        {
            queryKey: ['user', id],
            queryFn: () => getUser(id)
        }
    )
}