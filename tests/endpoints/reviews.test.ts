import { describe, it, expect, vi, beforeEach } from "vitest"
import { ReviewsEndpoint } from "../../src/endpoints/reviews"
import { JikanClient } from "../../src/client"

describe("ReviewsEndpoint", () => {
  let client: JikanClient
  let reviewsEndpoint: ReviewsEndpoint

  beforeEach(() => {
    client = new JikanClient()
    reviewsEndpoint = new ReviewsEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get anime reviews with parameters", async () => {
    await reviewsEndpoint.getAnimeReviews({ page: 1 })
    expect(client.request).toHaveBeenCalledWith("/reviews/anime", {
      page: 1,
    })
  })

  it("should get manga reviews with parameters", async () => {
    await reviewsEndpoint.getMangaReviews({ limit: 5 })
    expect(client.request).toHaveBeenCalledWith("/reviews/manga", {
      limit: 5,
    })
  })
})
