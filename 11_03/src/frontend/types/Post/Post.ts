export interface Post {
    id: number;
    createdAt: string;
    title: string;
    content: string | null;
    author: string;
}