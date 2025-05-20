import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    Magazine,
    MagazineQueryParams
} from "../types";

export class MagazinesEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get magazine by ID
     * @param id Magazine ID
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with magazine data
     */
    async getById(
        id: number,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<Magazine>> {
        return this.client.request<JikanPaginatedResponse<Magazine>>(
            `/magazines/${id}`,
            { page, limit }
        );
    }

    /**
     * Get all magazines
     * @param params Query parameters
     * @returns Promise with magazines data
     */
    async getAll(
        params?: MagazineQueryParams
    ): Promise<JikanPaginatedResponse<Magazine>> {
        return this.client.request<JikanPaginatedResponse<Magazine>>(
            "/magazines",
            params
        );
    }
}
