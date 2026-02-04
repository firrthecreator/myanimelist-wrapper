import { describe, it, expect, vi, beforeEach } from "vitest";
import { MangaEndpoint } from "../../src/endpoints/manga";
import { JikanClient } from "../../src/client";

/**
 * Unit tests for the MangaEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see MangaEndpoint
 */
describe("MangaEndpoint", () => {
    let client: JikanClient;
    let mangaEndpoint: MangaEndpoint;

    beforeEach(() => {
        client = new JikanClient();
        mangaEndpoint = new MangaEndpoint(client);

        // Mock the client's request method
        vi.spyOn(client, "request").mockImplementation(async () => ({
            data: { id: 1 }
        }));
    });

    it("should get manga by ID", async () => {
        await mangaEndpoint.getById(1);
        expect(client.request).toHaveBeenCalledWith("/manga/1");
    });

    it("should get manga characters", async () => {
        await mangaEndpoint.getCharacters(1);
        expect(client.request).toHaveBeenCalledWith("/manga/1/characters");
    });

    it("should get manga news with pagination", async () => {
        await mangaEndpoint.getNews(1, 2);
        expect(client.request).toHaveBeenCalledWith("/manga/1/news", {
            page: 2
        });
    });

    it("should get manga forum topics", async () => {
        await mangaEndpoint.getForum(1);
        expect(client.request).toHaveBeenCalledWith("/manga/1/forum");
    });

    it("should search for manga with parameters", async () => {
        await mangaEndpoint.search({ q: "berserk", limit: 10 });
        expect(client.request).toHaveBeenCalledWith("/manga", {
            q: "berserk",
            limit: 10
        });
    });

    it("should get manga statistics", async () => {
        await mangaEndpoint.getStatistics(1);
        expect(client.request).toHaveBeenCalledWith("/manga/1/statistics");
    });

    it("should get manga recommendations", async () => {
        await mangaEndpoint.getRecommendations(1);
        expect(client.request).toHaveBeenCalledWith("/manga/1/recommendations");
    });
});


