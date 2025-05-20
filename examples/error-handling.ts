import { JikanClient } from "../src";
import { JikanError } from "../src/types/error";

// Create a client
const jikan = new JikanClient();

// Example: Handle different types of errors
const handleErrors = async () => {
    // Example 1: Handle a 404 error (non-existent resource)
    try {
        console.log("Attempting to fetch a non-existent anime ID...");
        await jikan.anime.getById(999999999);
    } catch (error) {
        if (error instanceof JikanError) {
            console.error(`Error ${error.status}: ${error.message}`);
            if (error.data) {
                console.error("Error data:", error.data);
            }
        } else {
            console.error("Unexpected error:", error);
        }
    }

    console.log("\n---\n");

    // Example 2: Handle timeout errors
    try {
        console.log("Creating a client with a very short timeout...");
        const impatientClient = new JikanClient({ timeout: 1 }); // 1ms timeout (will fail)
        await impatientClient.anime.getById(1);
    } catch (error) {
        if (error instanceof JikanError && error.status === 408) {
            console.error(`Timeout error: ${error.message}`);
        } else {
            console.error("Unexpected error:", error);
        }
    }

    console.log("\n---\n");

    // Example 3: Handle invalid parameters
    try {
        console.log("Searching with invalid parameters...");
        // @ts-ignore - Intentionally passing invalid parameter for demonstration
        await jikan.anime.search({ invalid_param: "value" });
    } catch (error) {
        console.error("Error with invalid parameters:", error);
    }
};

handleErrors().catch(console.error);
