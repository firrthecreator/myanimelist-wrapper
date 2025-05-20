import type { Image } from "./common";

export interface Character {
    mal_id: number;
    url: string;
    images: Image;
    name: string;
    name_kanji: string | null;
    nicknames: string[];
    favorites: number;
    about: string | null;
    animeography: {
        role: string;
        anime: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
        };
    }[];
    mangaography: {
        role: string;
        manga: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
        };
    }[];
    voices: {
        language: string;
        person: {
            mal_id: number;
            url: string;
            images: Image;
            name: string;
        };
    }[];
}

export interface CharacterPicture {
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
}

export interface CharacterQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: "mal_id" | "name" | "favorites";
    sort?: "desc" | "asc";
    letter?: string;
}
