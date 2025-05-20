import type { Anime } from "./anime";

export interface Season {
    year: number;
    seasons: string[];
}

export interface SeasonalAnime extends Anime {
    // Additional properties specific to seasonal anime
}

export interface SeasonQueryParams {
    filter?: "tv" | "movie" | "ova" | "ona" | "special" | "unknown";
    sfw?: boolean;
    unapproved?: boolean;
    page?: number;
    limit?: number;
}
