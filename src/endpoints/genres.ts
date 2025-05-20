import type { JikanClient } from "../client";
import type { Genre, GenreQueryParams, JikanResponse } from "../types";

export class GenresEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get anime genres
     * @param params Query parameters
     * @returns Promise with anime genres data
     */
    async getAnimeGenres(
        params?: GenreQueryParams
    ): Promise<JikanResponse<Genre[]>> {
        return this.client.request<JikanResponse<Genre[]>>(
            "/genres/anime",
            params
        );
    }

    /**
     * Get manga genres
     * @param params Query parameters
     * @returns Promise with manga genres data
     */
    async getMangaGenres(
        params?: GenreQueryParams
    ): Promise<JikanResponse<Genre[]>> {
        return this.client.request<JikanResponse<Genre[]>>(
            "/genres/manga",
            params
        );
    }
}
