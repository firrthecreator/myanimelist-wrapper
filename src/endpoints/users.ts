import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    JikanResponse,
    User,
    UserAnimeList,
    UserAnimeListQueryParams,
    UserClub,
    UserFriend,
    UserHistory,
    UserMangaList,
    UserMangaListQueryParams,
    UserProfile,
    UserQueryParams,
    UserRecommendation,
    UserReview
} from "../types";

export class UsersEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get user by username
     * @param username Username
     * @returns Promise with user data
     */
    async getByUsername(username: string): Promise<JikanResponse<User>> {
        return this.client.request<JikanResponse<User>>(`/users/${username}`);
    }

    /**
     * Get user profile
     * @param username Username
     * @returns Promise with user profile data
     */
    async getProfile(username: string): Promise<JikanResponse<UserProfile>> {
        return this.client.request<JikanResponse<UserProfile>>(
            `/users/${username}/full`
        );
    }

    /**
     * Get user statistics
     * @param username Username
     * @returns Promise with user statistics data
     */
    async getStatistics(
        username: string
    ): Promise<JikanResponse<UserProfile["statistics"]>> {
        return this.client.request<JikanResponse<UserProfile["statistics"]>>(
            `/users/${username}/statistics`
        );
    }

    /**
     * Get user favorites
     * @param username Username
     * @returns Promise with user favorites data
     */
    async getFavorites(
        username: string
    ): Promise<JikanResponse<UserProfile["favorites"]>> {
        return this.client.request<JikanResponse<UserProfile["favorites"]>>(
            `/users/${username}/favorites`
        );
    }

    /**
     * Get user updates
     * @param username Username
     * @returns Promise with user updates data
     */
    async getUpdates(
        username: string
    ): Promise<JikanResponse<UserProfile["updates"]>> {
        return this.client.request<JikanResponse<UserProfile["updates"]>>(
            `/users/${username}/userupdates`
        );
    }

    /**
     * Get user about
     * @param username Username
     * @returns Promise with user about data
     */
    async getAbout(username: string): Promise<JikanResponse<string>> {
        return this.client.request<JikanResponse<string>>(
            `/users/${username}/about`
        );
    }

    /**
     * Get user history
     * @param username Username
     * @param type History type (anime, manga, all)
     * @returns Promise with user history data
     */
    async getHistory(
        username: string,
        type?: "anime" | "manga" | "all"
    ): Promise<JikanResponse<UserHistory[]>> {
        return this.client.request<JikanResponse<UserHistory[]>>(
            `/users/${username}/history`,
            { type }
        );
    }

    /**
     * Get user friends
     * @param username Username
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with user friends data
     */
    async getFriends(
        username: string,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<UserFriend>> {
        return this.client.request<JikanPaginatedResponse<UserFriend>>(
            `/users/${username}/friends`,
            { page, limit }
        );
    }

    /**
     * Get user reviews
     * @param username Username
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with user reviews data
     */
    async getReviews(
        username: string,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<UserReview>> {
        return this.client.request<JikanPaginatedResponse<UserReview>>(
            `/users/${username}/reviews`,
            { page, limit }
        );
    }

    /**
     * Get user recommendations
     * @param username Username
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with user recommendations data
     */
    async getRecommendations(
        username: string,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<UserRecommendation>> {
        return this.client.request<JikanPaginatedResponse<UserRecommendation>>(
            `/users/${username}/recommendations`,
            {
                page,
                limit
            }
        );
    }

    /**
     * Get user clubs
     * @param username Username
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with user clubs data
     */
    async getClubs(
        username: string,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<UserClub>> {
        return this.client.request<JikanPaginatedResponse<UserClub>>(
            `/users/${username}/clubs`,
            { page, limit }
        );
    }

    /**
     * Get user anime list
     * @param username Username
     * @param params Query parameters
     * @returns Promise with user anime list data
     */
    async getAnimeList(
        username: string,
        params?: UserAnimeListQueryParams
    ): Promise<UserAnimeList> {
        return this.client.request<UserAnimeList>(
            `/users/${username}/animelist`,
            params
        );
    }

    /**
     * Get user manga list
     * @param username Username
     * @param params Query parameters
     * @returns Promise with user manga list data
     */
    async getMangaList(
        username: string,
        params?: UserMangaListQueryParams
    ): Promise<UserMangaList> {
        return this.client.request<UserMangaList>(
            `/users/${username}/mangalist`,
            params
        );
    }

    /**
     * Search for users
     * @param params Search parameters
     * @returns Promise with user search results
     */
    async search(
        params?: UserQueryParams
    ): Promise<JikanPaginatedResponse<User>> {
        return this.client.request<JikanPaginatedResponse<User>>(
            "/users",
            params
        );
    }
}
