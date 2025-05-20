import type { JikanClient } from "../client";
import type {
    Anime,
    JikanPaginatedResponse,
    ScheduleQueryParams
} from "../types";

export class SchedulesEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get anime schedules
     * @param params Query parameters
     * @returns Promise with anime schedules data
     */
    async getSchedules(
        params?: ScheduleQueryParams
    ): Promise<JikanPaginatedResponse<Anime>> {
        return this.client.request<JikanPaginatedResponse<Anime>>(
            "/schedules",
            params
        );
    }
}
