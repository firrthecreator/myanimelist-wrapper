import { describe, it, expect, vi, beforeEach } from "vitest"
import { ClubsEndpoint } from "../../src/endpoints/clubs"
import { JikanClient } from "../../src/client"

describe("ClubsEndpoint", () => {
  let client: JikanClient
  let clubsEndpoint: ClubsEndpoint

  beforeEach(() => {
    client = new JikanClient()
    clubsEndpoint = new ClubsEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get club by ID", async () => {
    await clubsEndpoint.getById(1)
    expect(client.request).toHaveBeenCalledWith("/clubs/1")
  })

  it("should get club members with pagination", async () => {
    await clubsEndpoint.getMembers(1, 2)
    expect(client.request).toHaveBeenCalledWith("/clubs/1/members", {
      page: 2,
    })
  })

  it("should get club staff", async () => {
    await clubsEndpoint.getStaff(1)
    expect(client.request).toHaveBeenCalledWith("/clubs/1/staff")
  })

  it("should get club relations", async () => {
    await clubsEndpoint.getRelations(1)
    expect(client.request).toHaveBeenCalledWith("/clubs/1/relations")
  })

  it("should search for clubs with parameters", async () => {
    await clubsEndpoint.search({ q: "anime", limit: 5 })
    expect(client.request).toHaveBeenCalledWith("/clubs", {
      q: "anime",
      limit: 5,
    })
  })
})
