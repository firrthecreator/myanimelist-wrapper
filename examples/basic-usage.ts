import { JikanClient } from "../src";

// Create a new client
const jikan = new JikanClient();

// Example: Get anime by ID
const getAnimeById = async () => {
    try {
        const response = await jikan.anime.getById(5114); // Fullmetal Alchemist: Brotherhood
        console.log("Anime Title:", response.data.title);
        console.log("Score:", response.data.score);
        console.log("Episodes:", response.data.episodes);
        console.log("Status:", response.data.status);
    } catch (error) {
        console.error("Error fetching anime:", error);
    }
};

// Example: Search for anime
const searchAnime = async () => {
    try {
        const response = await jikan.anime.search({
            q: "attack on titan",
            limit: 5
        });

        console.log(`Found ${response.pagination.items.count} results`);

        response.data.forEach((anime, index) => {
            console.log(
                `${index + 1}. ${anime.title} (${anime.type}) - Score: ${
                    anime.score
                }`
            );
        });
    } catch (error) {
        console.error("Error searching anime:", error);
    }
};

// Example: Get seasonal anime
const getSeasonalAnime = async () => {
    try {
        const response = await jikan.seasons.getCurrent({
            limit: 10
        });

        console.log("Current Season Anime:");
        response.data.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.title} (${anime.type})`);
        });
    } catch (error) {
        console.error("Error fetching seasonal anime:", error);
    }
};

// Example: Get top anime
const getTopAnime = async () => {
    try {
        const response = await jikan.top.getAnime({
            limit: 10
        });

        console.log("Top 10 Anime:");
        response.data.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.title} - Score: ${anime.score}`);
        });
    } catch (error) {
        console.error("Error fetching top anime:", error);
    }
};

// Example: Get random anime
const getRandomAnime = async () => {
    try {
        const response = await jikan.random.getAnime();
        console.log("Random Anime:", response.data.title);
        console.log("Type:", response.data.type);
        console.log("Score:", response.data.score);
    } catch (error) {
        console.error("Error fetching random anime:", error);
    }
};

// Run examples
const runExamples = async () => {
    console.log("=== Get Anime By ID ===");
    await getAnimeById();

    console.log("\n=== Search Anime ===");
    await searchAnime();

    console.log("\n=== Current Season Anime ===");
    await getSeasonalAnime();

    console.log("\n=== Top Anime ===");
    await getTopAnime();

    console.log("\n=== Random Anime ===");
    await getRandomAnime();
};

runExamples().catch(console.error);
