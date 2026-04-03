export interface Comment {
    id: number;
    createdAt: string;
    content: string | null;
    author: string;
    postId: number;
}