import { describe, it, expect, vi, beforeEach } from "vitest"
import { UsersEndpoint } from "../../src/endpoints/users"
import { JikanClient } from "../../src/client"

/**
 * Unit tests for the UsersEndpoint request mapping and parameter handling.
 *
 * @description Verifies that endpoint methods call the client with the expected path
 * and query parameters.
 * @see UsersEndpoint
 */
describe("UsersEndpoint", () => {
  let client: JikanClient
  let usersEndpoint: UsersEndpoint

  beforeEach(() => {
    client = new JikanClient()
    usersEndpoint = new UsersEndpoint(client)

    vi.spyOn(client, "request").mockImplementation(async () => ({
      data: { id: 1 },
    }))
  })

  it("should get user by username", async () => {
    await usersEndpoint.getByUsername("testuser")
    expect(client.request).toHaveBeenCalledWith("/users/testuser")
  })

  it("should get user profile", async () => {
    await usersEndpoint.getProfile("testuser")
    expect(client.request).toHaveBeenCalledWith("/users/testuser/full")
  })

  it("should get user statistics", async () => {
    await usersEndpoint.getStatistics("testuser")
    expect(client.request).toHaveBeenCalledWith("/users/testuser/statistics")
  })

  it("should get user favorites", async () => {
    await usersEndpoint.getFavorites("testuser")
    expect(client.request).toHaveBeenCalledWith("/users/testuser/favorites")
  })

  it("should get user history with type", async () => {
    await usersEndpoint.getHistory("testuser", "anime")
    expect(client.request).toHaveBeenCalledWith("/users/testuser/history", { type: "anime" })
  })

  it("should get user friends with pagination", async () => {
    await usersEndpoint.getFriends("testuser", 2, 25)
    expect(client.request).toHaveBeenCalledWith("/users/testuser/friends", { page: 2, limit: 25 })
  })

  it("should get user anime list with parameters", async () => {
    await usersEndpoint.getAnimeList("testuser", {
      status: "watching",
      page: 1,
    })
    expect(client.request).toHaveBeenCalledWith("/users/testuser/animelist", {
      status: "watching",
      page: 1,
    })
  })

  it("should search for users with parameters", async () => {
    await usersEndpoint.search({ q: "john", limit: 10 })
    expect(client.request).toHaveBeenCalledWith("/users", {
      q: "john",
      limit: 10,
    })
  })
})


