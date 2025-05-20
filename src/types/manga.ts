import type { DateRange, Image, Title } from "./common";

export interface Manga {
    mal_id: number;
    url: string;
    images: Image;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string | null;
    chapters: number | null;
    volumes: number | null;
    status: string | null;
    publishing: boolean;
    published: DateRange;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    authors: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    serializations: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    explicit_genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    themes: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    demographics: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}

export interface MangaCharacter {
    character: {
        mal_id: number;
        url: string;
        images: Image;
        name: string;
    };
    role: string;
}

export interface MangaNews {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_username: string;
    author_url: string;
    forum_url: string;
    images: Image;
    comments: number;
    excerpt: string;
}

export interface MangaForum {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_username: string;
    author_url: string;
    comments: number;
    last_comment: {
        url: string;
        author_username: string;
        author_url: string;
        date: string;
    };
}

export interface MangaPicture {
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

export interface MangaStatistics {
    reading: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_read: number;
    total: number;
    scores: {
        score: number;
        votes: number;
        percentage: number;
    }[];
}

export interface MangaRecommendation {
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
    url: string;
    votes: number;
}

export interface MangaUserUpdate {
    user: {
        username: string;
        url: string;
        images: Image;
    };
    status: string;
    score: number | null;
    chapters_read: number | null;
    chapters_total: number | null;
    volumes_read: number | null;
    volumes_total: number | null;
    date: string;
}

export interface MangaReview {
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
    chapters_read: number | null;
    user: {
        username: string;
        url: string;
        images: Image;
    };
}

export interface MangaRelation {
    relation: string;
    entry: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}

export interface MangaExternal {
    name: string;
    url: string;
}

export interface MangaQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    type?:
        | "manga"
        | "novel"
        | "lightnovel"
        | "oneshot"
        | "doujin"
        | "manhwa"
        | "manhua";
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming";
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    order_by?:
        | "mal_id"
        | "title"
        | "start_date"
        | "end_date"
        | "chapters"
        | "volumes"
        | "score"
        | "scored_by"
        | "rank"
        | "popularity"
        | "members"
        | "favorites";
    sort?: "desc" | "asc";
    letter?: string;
    magazines?: string;
}
