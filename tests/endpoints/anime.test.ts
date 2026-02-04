import { describe, it, expect, vi, beforeEach } from "vitest";
import { AnimeEndpoint } from "../../src/endpoints/anime";
import { JikanClient } from "../../src/client";

/**
 * Unit tests for the AnimeEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see AnimeEndpoint
 */
describe("AnimeEndpoint", () => {
    let client: JikanClient;
    let animeEndpoint: AnimeEndpoint;

    beforeEach(() => {
        client = new JikanClient();
        animeEndpoint = new AnimeEndpoint(client);

        // Mock the client's request method
        vi.spyOn(client, "request").mockImplementation(async () => ({
            data: { id: 1 }
        }));
    });

    it("should get anime by ID", async () => {
        await animeEndpoint.getById(1);
        expect(client.request).toHaveBeenCalledWith("/anime/1");
    });

    it("should get anime characters", async () => {
        await animeEndpoint.getCharacters(1);
        expect(client.request).toHaveBeenCalledWith("/anime/1/characters");
    });

    it("should get anime staff", async () => {
        await animeEndpoint.getStaff(1);
        expect(client.request).toHaveBeenCalledWith("/anime/1/staff");
    });

    it("should get anime episodes with pagination", async () => {
        await animeEndpoint.getEpisodes(1, 2);
        expect(client.request).toHaveBeenCalledWith("/anime/1/episodes", {
            page: 2
        });
    });

    it("should get anime episode by ID", async () => {
        await animeEndpoint.getEpisodeById(1, 5);
        expect(client.request).toHaveBeenCalledWith("/anime/1/episodes/5");
    });

    it("should search for anime with parameters", async () => {
        await animeEndpoint.search({ q: "naruto", limit: 10 });
        expect(client.request).toHaveBeenCalledWith("/anime", {
            q: "naruto",
            limit: 10
        });
    });

    it("should get anime statistics", async () => {
        await animeEndpoint.getStatistics(1);
        expect(client.request).toHaveBeenCalledWith("/anime/1/statistics");
    });

    it("should get anime recommendations", async () => {
        await animeEndpoint.getRecommendations(1);
        expect(client.request).toHaveBeenCalledWith("/anime/1/recommendations");
    });
});


