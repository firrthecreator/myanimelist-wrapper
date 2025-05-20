import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    Review,
    ReviewQueryParams
} from "../types";

export class ReviewsEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get recent anime reviews
     * @param params Query parameters
     * @returns Promise with anime reviews data
     */
    async getAnimeReviews(
        params?: ReviewQueryParams
    ): Promise<JikanPaginatedResponse<Review>> {
        return this.client.request<JikanPaginatedResponse<Review>>(
            "/reviews/anime",
            params
        );
    }

    /**
     * Get recent manga reviews
     * @param params Query parameters
     * @returns Promise with manga reviews data
     */
    async getMangaReviews(
        params?: ReviewQueryParams
    ): Promise<JikanPaginatedResponse<Review>> {
        return this.client.request<JikanPaginatedResponse<Review>>(
            "/reviews/manga",
            params
        );
    }
}
