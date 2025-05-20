import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    JikanResponse,
    Manga,
    MangaCharacter,
    MangaExternal,
    MangaForum,
    MangaNews,
    MangaPicture,
    MangaQueryParams,
    MangaRecommendation,
    MangaRelation,
    MangaReview,
    MangaStatistics,
    MangaUserUpdate
} from "../types";

export class MangaEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get manga by ID
     * @param id Manga ID
     * @returns Promise with manga data
     */
    async getById(id: number): Promise<JikanResponse<Manga>> {
        return this.client.request<JikanResponse<Manga>>(`/manga/${id}`);
    }

    /**
     * Get manga characters
     * @param id Manga ID
     * @returns Promise with manga characters data
     */
    async getCharacters(id: number): Promise<JikanResponse<MangaCharacter[]>> {
        return this.client.request<JikanResponse<MangaCharacter[]>>(
            `/manga/${id}/characters`
        );
    }

    /**
     * Get manga news
     * @param id Manga ID
     * @param page Page number
     * @returns Promise with manga news data
     */
    async getNews(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<MangaNews>> {
        return this.client.request<JikanPaginatedResponse<MangaNews>>(
            `/manga/${id}/news`,
            { page }
        );
    }

    /**
     * Get manga forum topics
     * @param id Manga ID
     * @returns Promise with manga forum data
     */
    async getForum(id: number): Promise<JikanResponse<MangaForum[]>> {
        return this.client.request<JikanResponse<MangaForum[]>>(
            `/manga/${id}/forum`
        );
    }

    /**
     * Get manga pictures
     * @param id Manga ID
     * @returns Promise with manga pictures data
     */
    async getPictures(id: number): Promise<JikanResponse<MangaPicture[]>> {
        return this.client.request<JikanResponse<MangaPicture[]>>(
            `/manga/${id}/pictures`
        );
    }

    /**
     * Get manga statistics
     * @param id Manga ID
     * @returns Promise with manga statistics data
     */
    async getStatistics(id: number): Promise<JikanResponse<MangaStatistics>> {
        return this.client.request<JikanResponse<MangaStatistics>>(
            `/manga/${id}/statistics`
        );
    }

    /**
     * Get more manga info
     * @param id Manga ID
     * @returns Promise with more manga info
     */
    async getMoreInfo(id: number): Promise<JikanResponse<string>> {
        return this.client.request<JikanResponse<string>>(
            `/manga/${id}/moreinfo`
        );
    }

    /**
     * Get manga recommendations
     * @param id Manga ID
     * @returns Promise with manga recommendations data
     */
    async getRecommendations(
        id: number
    ): Promise<JikanResponse<MangaRecommendation[]>> {
        return this.client.request<JikanResponse<MangaRecommendation[]>>(
            `/manga/${id}/recommendations`
        );
    }

    /**
     * Get manga user updates
     * @param id Manga ID
     * @param page Page number
     * @returns Promise with manga user updates data
     */
    async getUserUpdates(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<MangaUserUpdate>> {
        return this.client.request<JikanPaginatedResponse<MangaUserUpdate>>(
            `/manga/${id}/userupdates`,
            { page }
        );
    }

    /**
     * Get manga reviews
     * @param id Manga ID
     * @param page Page number
     * @returns Promise with manga reviews data
     */
    async getReviews(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<MangaReview>> {
        return this.client.request<JikanPaginatedResponse<MangaReview>>(
            `/manga/${id}/reviews`,
            { page }
        );
    }

    /**
     * Get manga relations
     * @param id Manga ID
     * @returns Promise with manga relations data
     */
    async getRelations(id: number): Promise<JikanResponse<MangaRelation[]>> {
        return this.client.request<JikanResponse<MangaRelation[]>>(
            `/manga/${id}/relations`
        );
    }

    /**
     * Get manga external links
     * @param id Manga ID
     * @returns Promise with manga external links data
     */
    async getExternal(id: number): Promise<JikanResponse<MangaExternal[]>> {
        return this.client.request<JikanResponse<MangaExternal[]>>(
            `/manga/${id}/external`
        );
    }

    /**
     * Search for manga
     * @param params Search parameters
     * @returns Promise with manga search results
     */
    async search(
        params?: MangaQueryParams
    ): Promise<JikanPaginatedResponse<Manga>> {
        return this.client.request<JikanPaginatedResponse<Manga>>(
            "/manga",
            params
        );
    }
}
