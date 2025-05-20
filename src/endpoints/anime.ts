import type { JikanClient } from "../client";
import type {
    Anime,
    AnimeCharacter,
    AnimeEpisode,
    AnimeExternal,
    AnimeForum,
    AnimeNews,
    AnimePicture,
    AnimeQueryParams,
    AnimeRecommendation,
    AnimeRelation,
    AnimeReview,
    AnimeStaff,
    AnimeStatistics,
    AnimeStreaming,
    AnimeTheme,
    AnimeUserUpdate,
    AnimeVideo,
    JikanPaginatedResponse,
    JikanResponse
} from "../types";

export class AnimeEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get anime by ID
     * @param id Anime ID
     * @returns Promise with anime data
     */
    async getById(id: number): Promise<JikanResponse<Anime>> {
        return this.client.request<JikanResponse<Anime>>(`/anime/${id}`);
    }

    /**
     * Get anime characters and voice actors
     * @param id Anime ID
     * @returns Promise with anime characters data
     */
    async getCharacters(id: number): Promise<JikanResponse<AnimeCharacter[]>> {
        return this.client.request<JikanResponse<AnimeCharacter[]>>(
            `/anime/${id}/characters`
        );
    }

    /**
     * Get anime staff
     * @param id Anime ID
     * @returns Promise with anime staff data
     */
    async getStaff(id: number): Promise<JikanResponse<AnimeStaff[]>> {
        return this.client.request<JikanResponse<AnimeStaff[]>>(
            `/anime/${id}/staff`
        );
    }

    /**
     * Get anime episodes
     * @param id Anime ID
     * @param page Page number
     * @returns Promise with anime episodes data
     */
    async getEpisodes(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<AnimeEpisode>> {
        return this.client.request<JikanPaginatedResponse<AnimeEpisode>>(
            `/anime/${id}/episodes`,
            { page }
        );
    }

    /**
     * Get anime episode by ID
     * @param animeId Anime ID
     * @param episodeId Episode ID
     * @returns Promise with anime episode data
     */
    async getEpisodeById(
        animeId: number,
        episodeId: number
    ): Promise<JikanResponse<AnimeEpisode>> {
        return this.client.request<JikanResponse<AnimeEpisode>>(
            `/anime/${animeId}/episodes/${episodeId}`
        );
    }

    /**
     * Get anime news
     * @param id Anime ID
     * @param page Page number
     * @returns Promise with anime news data
     */
    async getNews(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<AnimeNews>> {
        return this.client.request<JikanPaginatedResponse<AnimeNews>>(
            `/anime/${id}/news`,
            { page }
        );
    }

    /**
     * Get anime forum topics
     * @param id Anime ID
     * @param filter Filter topics (all, episode, other)
     * @returns Promise with anime forum data
     */
    async getForum(
        id: number,
        filter?: "all" | "episode" | "other"
    ): Promise<JikanResponse<AnimeForum[]>> {
        return this.client.request<JikanResponse<AnimeForum[]>>(
            `/anime/${id}/forum`,
            { filter }
        );
    }

    /**
     * Get anime videos
     * @param id Anime ID
     * @returns Promise with anime videos data
     */
    async getVideos(id: number): Promise<JikanResponse<AnimeVideo>> {
        return this.client.request<JikanResponse<AnimeVideo>>(
            `/anime/${id}/videos`
        );
    }

    /**
     * Get anime pictures
     * @param id Anime ID
     * @returns Promise with anime pictures data
     */
    async getPictures(id: number): Promise<JikanResponse<AnimePicture[]>> {
        return this.client.request<JikanResponse<AnimePicture[]>>(
            `/anime/${id}/pictures`
        );
    }

    /**
     * Get anime statistics
     * @param id Anime ID
     * @returns Promise with anime statistics data
     */
    async getStatistics(id: number): Promise<JikanResponse<AnimeStatistics>> {
        return this.client.request<JikanResponse<AnimeStatistics>>(
            `/anime/${id}/statistics`
        );
    }

    /**
     * Get more anime info
     * @param id Anime ID
     * @returns Promise with more anime info
     */
    async getMoreInfo(id: number): Promise<JikanResponse<string>> {
        return this.client.request<JikanResponse<string>>(
            `/anime/${id}/moreinfo`
        );
    }

    /**
     * Get anime recommendations
     * @param id Anime ID
     * @returns Promise with anime recommendations data
     */
    async getRecommendations(
        id: number
    ): Promise<JikanResponse<AnimeRecommendation[]>> {
        return this.client.request<JikanResponse<AnimeRecommendation[]>>(
            `/anime/${id}/recommendations`
        );
    }

    /**
     * Get anime user updates
     * @param id Anime ID
     * @param page Page number
     * @returns Promise with anime user updates data
     */
    async getUserUpdates(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<AnimeUserUpdate>> {
        return this.client.request<JikanPaginatedResponse<AnimeUserUpdate>>(
            `/anime/${id}/userupdates`,
            { page }
        );
    }

    /**
     * Get anime reviews
     * @param id Anime ID
     * @param page Page number
     * @returns Promise with anime reviews data
     */
    async getReviews(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<AnimeReview>> {
        return this.client.request<JikanPaginatedResponse<AnimeReview>>(
            `/anime/${id}/reviews`,
            { page }
        );
    }

    /**
     * Get anime relations
     * @param id Anime ID
     * @returns Promise with anime relations data
     */
    async getRelations(id: number): Promise<JikanResponse<AnimeRelation[]>> {
        return this.client.request<JikanResponse<AnimeRelation[]>>(
            `/anime/${id}/relations`
        );
    }

    /**
     * Get anime themes
     * @param id Anime ID
     * @returns Promise with anime themes data
     */
    async getThemes(id: number): Promise<JikanResponse<AnimeTheme>> {
        return this.client.request<JikanResponse<AnimeTheme>>(
            `/anime/${id}/themes`
        );
    }

    /**
     * Get anime external links
     * @param id Anime ID
     * @returns Promise with anime external links data
     */
    async getExternal(id: number): Promise<JikanResponse<AnimeExternal[]>> {
        return this.client.request<JikanResponse<AnimeExternal[]>>(
            `/anime/${id}/external`
        );
    }

    /**
     * Get anime streaming links
     * @param id Anime ID
     * @returns Promise with anime streaming links data
     */
    async getStreaming(id: number): Promise<JikanResponse<AnimeStreaming[]>> {
        return this.client.request<JikanResponse<AnimeStreaming[]>>(
            `/anime/${id}/streaming`
        );
    }

    /**
     * Search for anime
     * @param params Search parameters
     * @returns Promise with anime search results
     */
    async search(
        params?: AnimeQueryParams
    ): Promise<JikanPaginatedResponse<Anime>> {
        return this.client.request<JikanPaginatedResponse<Anime>>(
            "/anime",
            params
        );
    }
}
