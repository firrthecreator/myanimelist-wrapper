import type { JikanClient } from "../client";
import type {
    JikanPaginatedResponse,
    JikanResponse,
    Person,
    PersonPicture,
    PersonQueryParams
} from "../types";

export class PeopleEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get person by ID
     * @param id Person ID
     * @returns Promise with person data
     */
    async getById(id: number): Promise<JikanResponse<Person>> {
        return this.client.request<JikanResponse<Person>>(`/people/${id}`);
    }

    /**
     * Get person pictures
     * @param id Person ID
     * @returns Promise with person pictures data
     */
    async getPictures(id: number): Promise<JikanResponse<PersonPicture[]>> {
        return this.client.request<JikanResponse<PersonPicture[]>>(
            `/people/${id}/pictures`
        );
    }

    /**
     * Search for people
     * @param params Search parameters
     * @returns Promise with people search results
     */
    async search(
        params?: PersonQueryParams
    ): Promise<JikanPaginatedResponse<Person>> {
        return this.client.request<JikanPaginatedResponse<Person>>(
            "/people",
            params
        );
    }
}
