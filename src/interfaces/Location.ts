export interface Location {
    id: number;
    title: string;
    description: string;
    rating: number;
    address: string;
    createdAt: Date;
    images?: Array<{
        id: number;
        url: string;
    }>;
}