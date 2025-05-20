import type { Image } from "./common";

export interface User {
    mal_id: number;
    username: string;
    url: string;
    images: Image;
    last_online: string;
    gender: string | null;
    birthday: string | null;
    location: string | null;
    joined: string;
}

export interface UserProfile {
    mal_id: number;
    username: string;
    url: string;
    images: Image;
    last_online: string;
    gender: string | null;
    birthday: string | null;
    location: string | null;
    joined: string;
    statistics: {
        anime: {
            days_watched: number;
            mean_score: number;
            watching: number;
            completed: number;
            on_hold: number;
            dropped: number;
            plan_to_watch: number;
            total_entries: number;
            rewatched: number;
            episodes_watched: number;
        };
        manga: {
            days_read: number;
            mean_score: number;
            reading: number;
            completed: number;
            on_hold: number;
            dropped: number;
            plan_to_read: number;
            total_entries: number;
            reread: number;
            chapters_read: number;
            volumes_read: number;
        };
    };
    favorites: {
        anime: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
            type: string;
            start_year: number | null;
        }[];
        manga: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
            type: string;
            start_year: number | null;
        }[];
        characters: {
            mal_id: number;
            url: string;
            images: Image;
            name: string;
        }[];
        people: {
            mal_id: number;
            url: string;
            images: Image;
            name: string;
        }[];
    };
    updates: {
        anime: {
            entry: {
                mal_id: number;
                url: string;
                images: Image;
                title: string;
            };
            status: string;
            episodes_seen: number | null;
            episodes_total: number | null;
            date: string;
        }[];
        manga: {
            entry: {
                mal_id: number;
                url: string;
                images: Image;
                title: string;
            };
            status: string;
            chapters_read: number | null;
            chapters_total: number | null;
            volumes_read: number | null;
            volumes_total: number | null;
            date: string;
        }[];
    };
    about: string | null;
}

export interface UserHistory {
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
    increment: number;
    date: string;
}

export interface UserFriend {
    user: {
        mal_id: number;
        username: string;
        url: string;
        images: Image;
        last_online: string;
    };
    friends_since: string;
}

export interface UserReview {
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
}

export interface UserRecommendation {
    mal_id: string;
    entry: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
    content: string;
    date: string;
    recommendation: {
        mal_id: number;
        url: string;
        images: Image;
        title: string;
    };
}

export interface UserClub {
    mal_id: number;
    name: string;
    url: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

export interface UserAnimeList {
    data: {
        node: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
            title_english: string | null;
            title_japanese: string | null;
            title_synonyms: string[];
            type: string | null;
            source: string | null;
            episodes: number | null;
            status: string | null;
            airing: boolean;
            aired: {
                from: string | null;
                to: string | null;
                string: string | null;
            };
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
        };
        list_status: {
            status: string;
            score: number;
            num_episodes_watched: number;
            is_rewatching: boolean;
            updated_at: string;
        };
    }[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
}

export interface UserMangaList {
    data: {
        node: {
            mal_id: number;
            url: string;
            images: Image;
            title: string;
            title_english: string | null;
            title_japanese: string | null;
            title_synonyms: string[];
            type: string | null;
            chapters: number | null;
            volumes: number | null;
            status: string | null;
            publishing: boolean;
            published: {
                from: string | null;
                to: string | null;
                string: string | null;
            };
            score: number | null;
            scored_by: number | null;
            rank: number | null;
            popularity: number | null;
            members: number | null;
            favorites: number | null;
            synopsis: string | null;
            background: string | null;
        };
        list_status: {
            status: string;
            score: number;
            num_chapters_read: number;
            num_volumes_read: number;
            is_rereading: boolean;
            updated_at: string;
        };
    }[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
    };
}

export interface UserQueryParams {
    page?: number;
    limit?: number;
    q?: string;
}

export interface UserAnimeListQueryParams {
    status?: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
    page?: number;
    limit?: number;
}

export interface UserMangaListQueryParams {
    status?: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
    page?: number;
    limit?: number;
}
