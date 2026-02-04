import { describe, it, expect, vi, beforeEach } from "vitest"
import { TopEndpoint } from "../../src/endpoints/top"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the TopEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see TopEndpoint
 */
describe("TopEndpoint", () => {
  let client: JikanClient
  let topEndpoint: TopEndpoint

  beforeEach(() => {
    client = new JikanClient()
    topEndpoint = new TopEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get top anime", async () => {
    await topEndpoint.getAnime({ page: 1 })
    expect(client.request).toHaveBeenCalledWith("/top/anime", { page: 1 })
  })

  it("should get top manga", async () => {
    await topEndpoint.getManga({ limit: 5 })
    expect(client.request).toHaveBeenCalledWith("/top/manga", { limit: 5 })
  })

  it("should get top characters", async () => {
    await topEndpoint.getCharacters({ filter: "favorites" })
    expect(client.request).toHaveBeenCalledWith("/top/characters", {
      filter: "favorites",
    })
  })

  it("should get top people", async () => {
    await topEndpoint.getPeople({ page: 2 })
    expect(client.request).toHaveBeenCalledWith("/top/people", { page: 2 })
  })

  it("should get top reviews", async () => {
    await topEndpoint.getReviews({ type: "anime" })
    expect(client.request).toHaveBeenCalledWith("/top/reviews", {
      type: "anime",
    })
  })
})


