import type { JikanClient } from "../client";
import type {
    Club,
    ClubMember,
    ClubQueryParams,
    ClubRelation,
    ClubStaff,
    JikanPaginatedResponse,
    JikanResponse
} from "../types";

export class ClubsEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get club by ID
     * @param id Club ID
     * @returns Promise with club data
     */
    async getById(id: number): Promise<JikanResponse<Club>> {
        return this.client.request<JikanResponse<Club>>(`/clubs/${id}`);
    }

    /**
     * Get club members
     * @param id Club ID
     * @param page Page number
     * @returns Promise with club members data
     */
    async getMembers(
        id: number,
        page?: number
    ): Promise<JikanPaginatedResponse<ClubMember>> {
        return this.client.request<JikanPaginatedResponse<ClubMember>>(
            `/clubs/${id}/members`,
            { page }
        );
    }

    /**
     * Get club staff
     * @param id Club ID
     * @returns Promise with club staff data
     */
    async getStaff(id: number): Promise<JikanResponse<ClubStaff[]>> {
        return this.client.request<JikanResponse<ClubStaff[]>>(
            `/clubs/${id}/staff`
        );
    }

    /**
     * Get club relations
     * @param id Club ID
     * @returns Promise with club relations data
     */
    async getRelations(id: number): Promise<JikanResponse<ClubRelation[]>> {
        return this.client.request<JikanResponse<ClubRelation[]>>(
            `/clubs/${id}/relations`
        );
    }

    /**
     * Search for clubs
     * @param params Search parameters
     * @returns Promise with club search results
     */
    async search(
        params?: ClubQueryParams
    ): Promise<JikanPaginatedResponse<Club>> {
        return this.client.request<JikanPaginatedResponse<Club>>(
            "/clubs",
            params
        );
    }
}
