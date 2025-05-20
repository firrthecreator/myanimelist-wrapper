import type { JikanClient } from "../client";
import type { Anime, Character, JikanResponse, Manga, Person } from "../types";

export class RandomEndpoint {
    private client: JikanClient;

    constructor(client: JikanClient) {
        this.client = client;
    }

    /**
     * Get random anime
     * @returns Promise with random anime data
     */
    async getAnime(): Promise<JikanResponse<Anime>> {
        return this.client.request<JikanResponse<Anime>>("/random/anime");
    }

    /**
     * Get random manga
     * @returns Promise with random manga data
     */
    async getManga(): Promise<JikanResponse<Manga>> {
        return this.client.request<JikanResponse<Manga>>("/random/manga");
    }

    /**
     * Get random character
     * @returns Promise with random character data
     */
    async getCharacter(): Promise<JikanResponse<Character>> {
        return this.client.request<JikanResponse<Character>>(
            "/random/characters"
        );
    }

    /**
     * Get random person
     * @returns Promise with random person data
     */
    async getPerson(): Promise<JikanResponse<Person>> {
        return this.client.request<JikanResponse<Person>>("/random/people");
    }

    /**
     * Get random user
     * @returns Promise with random user data
     */
    async getUser(): Promise<JikanResponse<any>> {
        return this.client.request<JikanResponse<any>>("/random/users");
    }
}
