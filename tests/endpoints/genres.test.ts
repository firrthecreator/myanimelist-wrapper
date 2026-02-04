import { describe, it, expect, vi, beforeEach } from "vitest"
import { GenresEndpoint } from "../../src/endpoints/genres"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the GenresEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see GenresEndpoint
 */
describe("GenresEndpoint", () => {
  let client: JikanClient
  let genresEndpoint: GenresEndpoint

  beforeEach(() => {
    client = new JikanClient()
    genresEndpoint = new GenresEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get anime genres", async () => {
    await genresEndpoint.getAnimeGenres({ filter: "genres" })
    expect(client.request).toHaveBeenCalledWith("/genres/anime", {
      filter: "genres",
    })
  })

  it("should get manga genres", async () => {
    await genresEndpoint.getMangaGenres({ filter: "themes" })
    expect(client.request).toHaveBeenCalledWith("/genres/manga", {
      filter: "themes",
    })
  })
})


