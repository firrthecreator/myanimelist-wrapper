import type { DateRange, Image, Title } from "./common";

export interface Anime {
    mal_id: number;
    url: string;
    images: Image;
    trailer: {
        youtube_id: string | null;
        url: string | null;
        embed_url: string | null;
        images: {
            image_url: string | null;
            small_image_url: string | null;
            medium_image_url: string | null;
            large_image_url: string | null;
            maximum_image_url: string | null;
        };
    };
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: string[];
    type: string | null;
    source: string | null;
    episodes: number | null;
    status: string | null;
    airing: boolean;
    aired: DateRange;
    duration: string | null;
    rating: string | null;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    season: string | null;
    year: number | null;
    broadcast: {
        day: string | null;
        time: string | null;
        timezone: string | null;
        string: string | null;
    };
    producers: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    licensors: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    studios: {
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

export interface AnimeCharacter {
    character: {
        mal_id: number;
        url: string;
        images: Image;
        name: string;
    };
    role: string;
    favorites: number;
    voice_actors: {
        person: {
            mal_id: number;
            url: string;
            images: Image;
            name: string;
        };
        language: string;
    }[];
}

export interface AnimeStaff {
    person: {
        mal_id: number;
        url: string;
        images: Image;
        name: string;
    };
    positions: string[];
}

export interface AnimeEpisode {
    mal_id: number;
    url: string | null;
    title: string | null;
    title_japanese: string | null;
    title_romanji: string | null;
    duration: number | null;
    aired: string | null;
    filler: boolean;
    recap: boolean;
    forum_url: string | null;
}

export interface AnimeNews {
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

export interface AnimeForum {
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

export interface AnimeVideo {
    promo: {
        title: string;
        trailer: {
            youtube_id: string | null;
            url: string | null;
            embed_url: string | null;
            images: {
                image_url: string | null;
                small_image_url: string | null;
                medium_image_url: string | null;
                large_image_url: string | null;
                maximum_image_url: string | null;
            };
        };
    }[];
    episodes: {
        mal_id: number;
        url: string | null;
        title: string | null;
        episode: string | null;
        images: Image;
    }[];
}

export interface AnimePicture {
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

export interface AnimeStatistics {
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
    total: number;
    scores: {
        score: number;
        votes: number;
        percentage: number;
    }[];
}

export interface AnimeRecommendation {
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
    url: string;
    votes: number;
}

export interface AnimeUserUpdate {
    user: {
        username: string;
        url: string;
        images: Image;
    };
    status: string;
    score: number | null;
    episodes_seen: number | null;
    episodes_total: number | null;
    date: string;
}

export interface AnimeReview {
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
    episodes_watched: number | null;
    user: {
        username: string;
        url: string;
        images: Image;
    };
}

export interface AnimeRelation {
    relation: string;
    entry: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}

export interface AnimeTheme {
    openings: string[];
    endings: string[];
}

export interface AnimeExternal {
    name: string;
    url: string;
}

export interface AnimeStreaming {
    name: string;
    url: string;
}

export interface AnimeQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
    score?: number;
    min_score?: number;
    max_score?: number;
    status?: "airing" | "complete" | "upcoming";
    rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx";
    sfw?: boolean;
    genres?: string;
    genres_exclude?: string;
    order_by?:
        | "mal_id"
        | "title"
        | "type"
        | "rating"
        | "start_date"
        | "end_date"
        | "episodes"
        | "score"
        | "scored_by"
        | "rank"
        | "popularity"
        | "members"
        | "favorites";
    sort?: "desc" | "asc";
    letter?: string;
    producers?: string;
}
