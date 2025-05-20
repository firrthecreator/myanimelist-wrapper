import type { Image } from "./common";

export interface Recommendation {
    mal_id: string;
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    }[];
    content: string;
    date: string;
    user: {
        url: string;
        username: string;
    };
}

export interface RecommendationQueryParams {
    page?: number;
    limit?: number;
}
