export interface Genre {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

export interface GenreQueryParams {
    filter?: "genres" | "explicit_genres" | "themes" | "demographics";
}
