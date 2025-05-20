import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    TopAnime,
    TopCharacter,
    TopManga,
    TopPerson,
    TopQueryParams,
    TopReview
} from "../types";

export class TopEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get top anime
     * @param params Query parameters
     * @returns Promise with top anime data
     */
    async getAnime(
        params?: TopQueryParams
    ): Promise<JikanPaginatedResponse<TopAnime>> {
        return this.client.request<JikanPaginatedResponse<TopAnime>>(
            "/top/anime",
            params
        );
    }

    /**
     * Get top manga
     * @param params Query parameters
     * @returns Promise with top manga data
     */
    async getManga(
        params?: TopQueryParams
    ): Promise<JikanPaginatedResponse<TopManga>> {
        return this.client.request<JikanPaginatedResponse<TopManga>>(
            "/top/manga",
            params
        );
    }

    /**
     * Get top characters
     * @param params Query parameters
     * @returns Promise with top characters data
     */
    async getCharacters(
        params?: TopQueryParams
    ): Promise<JikanPaginatedResponse<TopCharacter>> {
        return this.client.request<JikanPaginatedResponse<TopCharacter>>(
            "/top/characters",
            params
        );
    }

    /**
     * Get top people
     * @param params Query parameters
     * @returns Promise with top people data
     */
    async getPeople(
        params?: TopQueryParams
    ): Promise<JikanPaginatedResponse<TopPerson>> {
        return this.client.request<JikanPaginatedResponse<TopPerson>>(
            "/top/people",
            params
        );
    }

    /**
     * Get top reviews
     * @param params Query parameters
     * @returns Promise with top reviews data
     */
    async getReviews(
        params?: TopQueryParams
    ): Promise<JikanPaginatedResponse<TopReview>> {
        return this.client.request<JikanPaginatedResponse<TopReview>>(
            "/top/reviews",
            params
        );
    }
}
