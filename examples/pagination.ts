import { JikanClient } from "../src";

// Create a client
const jikan = new JikanClient();

// Example: Handle pagination for large result sets
const handlePagination = async () => {
    // Get the first page of results
    console.log("Fetching first page of top anime...");
    const firstPage = await jikan.top.getAnime({ limit: 5 });

    console.log(`Total items: ${firstPage.pagination.items.total}`);
    console.log(`Items per page: ${firstPage.pagination.items.per_page}`);
    console.log(`Current page: ${firstPage.pagination.current_page}`);
    console.log(`Last visible page: ${firstPage.pagination.last_visible_page}`);
    console.log(`Has next page: ${firstPage.pagination.has_next_page}`);

    console.log("\nFirst page results:");
    firstPage.data.forEach((anime, index) => {
        console.log(`${index + 1}. ${anime.title} (Rank: ${anime.rank})`);
    });

    // If there's a next page, fetch it
    if (firstPage.pagination.has_next_page) {
        console.log("\nFetching second page...");
        const secondPage = await jikan.top.getAnime({
            page: firstPage.pagination.current_page + 1,
            limit: 5
        });

        console.log("\nSecond page results:");
        secondPage.data.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.title} (Rank: ${anime.rank})`);
        });
    }

    // Example of fetching multiple pages
    console.log("\n\nFetching multiple pages of seasonal anime...");
    await fetchAllPages();
};

// Helper function to fetch all pages of a resource
async function fetchAllPages(maxPages = 3) {
    let currentPage = 1;
    let hasNextPage = true;
    const allResults = [];

    console.log(`Fetching up to ${maxPages} pages of current season anime...`);

    while (hasNextPage && currentPage <= maxPages) {
        console.log(`Fetching page ${currentPage}...`);

        const response = await jikan.seasons.getCurrent({
            page: currentPage,
            limit: 5
        });

        allResults.push(...response.data);
        hasNextPage = response.pagination.has_next_page;
        currentPage++;

        // Add a delay to respect rate limits
        if (hasNextPage && currentPage <= maxPages) {
            console.log("Waiting 1 second before next request...");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    console.log(
        `\nFetched a total of ${allResults.length} anime across ${
            currentPage - 1
        } pages`
    );
    console.log("Sample of results:");
    allResults.slice(0, 10).forEach((anime, index) => {
        console.log(`${index + 1}. ${anime.title}`);
    });
}

handlePagination().catch(console.error);
