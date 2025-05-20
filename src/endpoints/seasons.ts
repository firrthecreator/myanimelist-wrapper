import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    JikanResponse,
    Season,
    SeasonQueryParams,
    SeasonalAnime
} from "../types";

export class SeasonsEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get available seasons
     * @returns Promise with available seasons data
     */
    async getList(): Promise<JikanResponse<Season[]>> {
        return this.client.request<JikanResponse<Season[]>>("/seasons");
    }

    /**
     * Get seasonal anime
     * @param year Year
     * @param season Season (winter, spring, summer, fall)
     * @param params Query parameters
     * @returns Promise with seasonal anime data
     */
    async getSeason(
        year: number,
        season: "winter" | "spring" | "summer" | "fall",
        params?: SeasonQueryParams
    ): Promise<JikanPaginatedResponse<SeasonalAnime>> {
        return this.client.request<JikanPaginatedResponse<SeasonalAnime>>(
            `/seasons/${year}/${season}`,
            params
        );
    }

    /**
     * Get current season anime
     * @param params Query parameters
     * @returns Promise with current season anime data
     */
    async getCurrent(
        params?: SeasonQueryParams
    ): Promise<JikanPaginatedResponse<SeasonalAnime>> {
        return this.client.request<JikanPaginatedResponse<SeasonalAnime>>(
            "/seasons/now",
            params
        );
    }

    /**
     * Get upcoming season anime
     * @param params Query parameters
     * @returns Promise with upcoming season anime data
     */
    async getUpcoming(
        params?: SeasonQueryParams
    ): Promise<JikanPaginatedResponse<SeasonalAnime>> {
        return this.client.request<JikanPaginatedResponse<SeasonalAnime>>(
            "/seasons/upcoming",
            params
        );
    }
}
