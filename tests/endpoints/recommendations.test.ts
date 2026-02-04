import { describe, it, expect, vi, beforeEach } from "vitest"
import { RecommendationsEndpoint } from "../../src/endpoints/recommendations"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the RecommendationsEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see RecommendationsEndpoint
 */
describe("RecommendationsEndpoint", () => {
  let client: JikanClient
  let recommendationsEndpoint: RecommendationsEndpoint

  beforeEach(() => {
    client = new JikanClient()
    recommendationsEndpoint = new RecommendationsEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get anime recommendations with parameters", async () => {
    await recommendationsEndpoint.getAnimeRecommendations({ page: 1 })
    expect(client.request).toHaveBeenCalledWith("/recommendations/anime", { page: 1 })
  })

  it("should get manga recommendations with parameters", async () => {
    await recommendationsEndpoint.getMangaRecommendations({ limit: 5 })
    expect(client.request).toHaveBeenCalledWith("/recommendations/manga", { limit: 5 })
  })
})


