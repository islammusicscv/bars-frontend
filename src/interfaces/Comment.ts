export interface Comment {
    id: number;
    content: string;
    createdAt: Date | string;
    location_id: number;
    // Dodaj še user_id ali user objekt, če ga backend vrača
}