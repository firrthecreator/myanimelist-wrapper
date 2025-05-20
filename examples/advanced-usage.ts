import { JikanClient } from "../src";

// Create a new client with custom options
const jikan = new JikanClient({
    timeout: 60000, // 60 seconds timeout
    headers: {
        Accept: "application/json",
        "User-Agent": "MyAnimeList Wrapper Example"
    }
});

// Example: Get anime details with related data
const getAnimeWithRelatedData = async (animeId: number) => {
    try {
        // Get basic anime info
        const animeResponse = await jikan.anime.getById(animeId);
        const anime = animeResponse.data;

        console.log(`=== ${anime.title} ===`);
        console.log(`Type: ${anime.type}`);
        console.log(`Episodes: ${anime.episodes}`);
        console.log(
            `Score: ${anime.score} (rated by ${anime.scored_by} users)`
        );
        console.log(`Status: ${anime.status}`);

        // Get characters and voice actors
        const charactersResponse = await jikan.anime.getCharacters(animeId);
        console.log("\n=== Main Characters ===");
        charactersResponse.data
            .filter(char => char.role === "Main")
            .slice(0, 5)
            .forEach(char => {
                console.log(`- ${char.character.name} (${char.role})`);
                if (char.voice_actors && char.voice_actors.length > 0) {
                    const japaneseVA = char.voice_actors.find(
                        va => va.language === "Japanese"
                    );
                    if (japaneseVA) {
                        console.log(
                            `  Voiced by: ${japaneseVA.person.name} (Japanese)`
                        );
                    }
                }
            });

        // Get recommendations
        const recommendationsResponse =
            await jikan.anime.getRecommendations(animeId);
        console.log("\n=== Recommendations ===");
        recommendationsResponse.data.slice(0, 5).forEach(rec => {
            console.log(`- ${rec.entry.title} (${rec.votes} votes)`);
        });

        // Get statistics
        const statsResponse = await jikan.anime.getStatistics(animeId);
        const stats = statsResponse.data;
        console.log("\n=== Statistics ===");
        console.log(`Watching: ${stats.watching}`);
        console.log(`Completed: ${stats.completed}`);
        console.log(`On Hold: ${stats.on_hold}`);
        console.log(`Dropped: ${stats.dropped}`);
        console.log(`Plan to Watch: ${stats.plan_to_watch}`);
        console.log(`Total: ${stats.total}`);

        // Get related anime
        const relationsResponse = await jikan.anime.getRelations(animeId);
        console.log("\n=== Related Anime/Manga ===");
        relationsResponse.data.forEach(relation => {
            console.log(`${relation.relation}:`);
            relation.entry.forEach(entry => {
                console.log(`- ${entry.name} (${entry.type})`);
            });
        });
    } catch (error) {
        console.error("Error fetching anime data:", error);
    }
};

// Example: Search for a user and get their profile info
const getUserProfile = async (username: string) => {
    try {
        // Get user profile
        const profileResponse = await jikan.users.getProfile(username);
        const profile = profileResponse.data;

        console.log(`=== ${profile.username}'s Profile ===`);
        console.log(`Joined: ${profile.joined}`);
        if (profile.location) console.log(`Location: ${profile.location}`);

        // Get anime stats
        console.log("\n=== Anime Statistics ===");
        console.log(`Days Watched: ${profile.statistics.anime.days_watched}`);
        console.log(`Mean Score: ${profile.statistics.anime.mean_score}`);
        console.log(`Watching: ${profile.statistics.anime.watching}`);
        console.log(`Completed: ${profile.statistics.anime.completed}`);
        console.log(`On Hold: ${profile.statistics.anime.on_hold}`);
        console.log(`Dropped: ${profile.statistics.anime.dropped}`);
        console.log(`Plan to Watch: ${profile.statistics.anime.plan_to_watch}`);
        console.log(`Total Entries: ${profile.statistics.anime.total_entries}`);
        console.log(
            `Episodes Watched: ${profile.statistics.anime.episodes_watched}`
        );

        // Get manga stats
        console.log("\n=== Manga Statistics ===");
        console.log(`Days Read: ${profile.statistics.manga.days_read}`);
        console.log(`Mean Score: ${profile.statistics.manga.mean_score}`);
        console.log(`Reading: ${profile.statistics.manga.reading}`);
        console.log(`Completed: ${profile.statistics.manga.completed}`);
        console.log(`On Hold: ${profile.statistics.manga.on_hold}`);
        console.log(`Dropped: ${profile.statistics.manga.dropped}`);
        console.log(`Plan to Read: ${profile.statistics.manga.plan_to_read}`);
        console.log(`Total Entries: ${profile.statistics.manga.total_entries}`);
        console.log(`Chapters Read: ${profile.statistics.manga.chapters_read}`);
        console.log(`Volumes Read: ${profile.statistics.manga.volumes_read}`);

        // Get favorite anime
        console.log("\n=== Favorite Anime ===");
        profile.favorites.anime.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.title} (${anime.type})`);
        });

        // Get favorite manga
        console.log("\n=== Favorite Manga ===");
        profile.favorites.manga.forEach((manga, index) => {
            console.log(`${index + 1}. ${manga.title} (${manga.type})`);
        });

        // Get favorite characters
        console.log("\n=== Favorite Characters ===");
        profile.favorites.characters.forEach((character, index) => {
            console.log(`${index + 1}. ${character.name}`);
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};

// Example: Get seasonal anime with details
const getDetailedSeasonalAnime = async () => {
    try {
        // Get current season anime
        const seasonResponse = await jikan.seasons.getCurrent({
            limit: 5
        });

        console.log("=== Current Season Top Anime ===");

        // For each anime, get more details
        for (const anime of seasonResponse.data) {
            console.log(`\n${anime.title}`);
            console.log(`Type: ${anime.type}`);
            console.log(`Episodes: ${anime.episodes}`);
            console.log(`Score: ${anime.score}`);

            // Get genres
            const genres = anime.genres.map(g => g.name).join(", ");
            console.log(`Genres: ${genres}`);

            // Get studios
            const studios = anime.studios.map(s => s.name).join(", ");
            console.log(`Studios: ${studios}`);

            // Get synopsis (truncated)
            if (anime.synopsis) {
                const truncatedSynopsis =
                    anime.synopsis.length > 150
                        ? anime.synopsis.substring(0, 150) + "..."
                        : anime.synopsis;
                console.log(`Synopsis: ${truncatedSynopsis}`);
            }

            // Add a separator between anime
            console.log("-----------------------------------");
        }
    } catch (error) {
        console.error("Error fetching seasonal anime:", error);
    }
};

// Run examples
const runAdvancedExamples = async () => {
    // Full Metal Alchemist: Brotherhood
    await getAnimeWithRelatedData(5114);

    console.log("\n\n");

    // Get a random user profile (replace with an actual username)
    await getUserProfile("AnimeFan123");

    console.log("\n\n");

    // Get detailed seasonal anime
    await getDetailedSeasonalAnime();
};

runAdvancedExamples().catch(console.error);
