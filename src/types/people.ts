import type { Image } from "./common";

export interface Person {
    mal_id: number;
    url: string;
    images: Image;
    name: string;
    given_name: string | null;
    family_name: string | null;
    alternate_names: string[];
    birthday: string | null;
    favorites: number;
    about: string | null;
    anime: {
        position: string;
        anime: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
        };
    }[];
    manga: {
        position: string;
        manga: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
        };
    }[];
    voices: {
        role: string;
        anime: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
        };
        character: {
            mal_id: number;
            url: string;
            images: Image;
            name: string;
        };
    }[];
}

export interface PersonPicture {
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

export interface PersonQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: "mal_id" | "name" | "birthday" | "favorites";
    sort?: "desc" | "asc";
    letter?: string;
}
