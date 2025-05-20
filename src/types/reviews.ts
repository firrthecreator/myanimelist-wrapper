import type { Image } from "./common";

export interface Review {
    mal_id: number;
    url: string;
    type: string;
    reactions: {
        overall: number;
        nice: number;
        love_it: number;
        funny: number;
        confusing: number;
        informative: number;
        well_written: number;
        creative: number;
    };
    date: string;
    review: string;
    score: number;
    tags: string[];
    is_spoiler: boolean;
    is_preliminary: boolean;
    episodes_watched?: number;
    chapters_read?: number;
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
    user: {
        username: string;
        url: string;
        images: Image;
    };
}

export interface ReviewQueryParams {
    page?: number;
    limit?: number;
    preliminary?: boolean;
    spoiler?: boolean;
}
