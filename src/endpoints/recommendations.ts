import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    Recommendation,
    RecommendationQueryParams
} from "../types";

export class RecommendationsEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get recent anime recommendations
     * @param params Query parameters
     * @returns Promise with anime recommendations data
     */
    async getAnimeRecommendations(
        params?: RecommendationQueryParams
    ): Promise<JikanPaginatedResponse<Recommendation>> {
        return this.client.request<JikanPaginatedResponse<Recommendation>>(
            "/recommendations/anime",
            params
        );
    }

    /**
     * Get recent manga recommendations
     * @param params Query parameters
     * @returns Promise with manga recommendations data
     */
    async getMangaRecommendations(
        params?: RecommendationQueryParams
    ): Promise<JikanPaginatedResponse<Recommendation>> {
        return this.client.request<JikanPaginatedResponse<Recommendation>>(
            "/recommendations/manga",
            params
        );
    }
}
