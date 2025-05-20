import { JikanClient } from "../src";

// Create a client with rate limiting helper
const jikan = new JikanClient();

// Helper function to wait between requests
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Example: Make multiple requests with rate limiting
const fetchWithRateLimiting = async () => {
    console.log("Fetching multiple anime with rate limiting...");

    // Jikan API has a rate limit of 3 requests per second
    // We'll add a delay between requests to respect this limit

    const animeIds = [1, 5, 20, 30, 40, 50];
    const results = [];

    for (const id of animeIds) {
        try {
            console.log(`Fetching anime ID: ${id}`);
            const response = await jikan.anime.getById(id);
            results.push({
                id,
                title: response.data.title,
                success: true
            });

            // Wait 400ms between requests to stay under the rate limit
            await wait(400);
        } catch (error) {
            console.error(`Error fetching anime ID ${id}:`, error);
            results.push({
                id,
                success: false,
                error: error instanceof Error ? error.message : String(error)
            });

            // If we hit a rate limit, wait longer
            await wait(1000);
        }
    }

    console.log("\nResults:");
    console.table(results);
};

fetchWithRateLimiting().catch(console.error);
