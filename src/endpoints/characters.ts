import type { JikanClient } from "../client";
import type {
    Character,
    CharacterPicture,
    CharacterQueryParams,
    JikanPaginatedResponse,
    JikanResponse
} from "../types";

export class CharactersEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get character by ID
     * @param id Character ID
     * @returns Promise with character data
     */
    async getById(id: number): Promise<JikanResponse<Character>> {
        return this.client.request<JikanResponse<Character>>(
            `/characters/${id}`
        );
    }

    /**
     * Get character pictures
     * @param id Character ID
     * @returns Promise with character pictures data
     */
    async getPictures(id: number): Promise<JikanResponse<CharacterPicture[]>> {
        return this.client.request<JikanResponse<CharacterPicture[]>>(
            `/characters/${id}/pictures`
        );
    }

    /**
     * Search for characters
     * @param params Search parameters
     * @returns Promise with character search results
     */
    async search(
        params?: CharacterQueryParams
    ): Promise<JikanPaginatedResponse<Character>> {
        return this.client.request<JikanPaginatedResponse<Character>>(
            "/characters",
            params
        );
    }
}
