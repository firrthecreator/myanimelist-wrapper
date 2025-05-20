import type { Anime } from "./anime";
import type { Manga } from "./manga";
import type { Character } from "./characters";
import type { Person } from "./people";

export interface TopAnime extends Anime {
    // Additional properties specific to top anime
}

export interface TopManga extends Manga {
    // Additional properties specific to top manga
}

export interface TopCharacter extends Character {
    // Additional properties specific to top characters
}

export interface TopPerson extends Person {
    // Additional properties specific to top people
}

export interface TopReview {
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
        images: {
            jpg: {
                image_url: string;
                small_image_url?: string;
                large_image_url?: string;
            };
            webp?: {
                image_url: string;
                small_image_url?: string;
                large_image_url?: string;
            };
        };
        title: string;
    };
    user: {
        username: string;
        url: string;
        images: {
            jpg: {
                image_url: string;
            };
            webp?: {
                image_url: string;
            };
        };
    };
}

export interface TopQueryParams {
    page?: number;
    limit?: number;
    filter?: string;
    type?: string;
}
