import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    Producer,
    ProducerQueryParams
} from "../types";

export class ProducersEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get producer by ID
     * @param id Producer ID
     * @param page Page number
     * @param limit Results per page
     * @returns Promise with producer data
     */
    async getById(
        id: number,
        page?: number,
        limit?: number
    ): Promise<JikanPaginatedResponse<Producer>> {
        return this.client.request<JikanPaginatedResponse<Producer>>(
            `/producers/${id}`,
            { page, limit }
        );
    }

    /**
     * Get all producers
     * @param params Query parameters
     * @returns Promise with producers data
     */
    async getAll(
        params?: ProducerQueryParams
    ): Promise<JikanPaginatedResponse<Producer>> {
        return this.client.request<JikanPaginatedResponse<Producer>>(
            "/producers",
            params
        );
    }
}
