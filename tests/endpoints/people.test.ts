import { describe, it, expect, vi, beforeEach } from "vitest"
import { PeopleEndpoint } from "../../src/endpoints/people"
import { JikanClient } from "../../src/client"

describe("PeopleEndpoint", () => {
  let client: JikanClient
  let peopleEndpoint: PeopleEndpoint

  beforeEach(() => {
    client = new JikanClient()
    peopleEndpoint = new PeopleEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get person by ID", async () => {
    await peopleEndpoint.getById(1)
    expect(client.request).toHaveBeenCalledWith("/people/1")
  })

  it("should get person pictures", async () => {
    await peopleEndpoint.getPictures(1)
    expect(client.request).toHaveBeenCalledWith("/people/1/pictures")
  })

  it("should search for people with parameters", async () => {
    await peopleEndpoint.search({ q: "tanaka", limit: 10 })
    expect(client.request).toHaveBeenCalledWith("/people", {
      q: "tanaka",
      limit: 10,
    })
  })
})
