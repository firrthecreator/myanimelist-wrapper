import { AnimeEndpoint } from "./endpoints/anime";
import { MangaEndpoint } from "./endpoints/manga";
import { CharactersEndpoint } from "./endpoints/characters";
import { PeopleEndpoint } from "./endpoints/people";
import { ClubsEndpoint } from "./endpoints/clubs";
import { SeasonsEndpoint } from "./endpoints/seasons";
import { SchedulesEndpoint } from "./endpoints/schedules";
import { TopEndpoint } from "./endpoints/top";
import { GenresEndpoint } from "./endpoints/genres";
import { ProducersEndpoint } from "./endpoints/producers";
import { MagazinesEndpoint } from "./endpoints/magazines";
import { UsersEndpoint } from "./endpoints/users";
import { ReviewsEndpoint } from "./endpoints/reviews";
import { RecommendationsEndpoint } from "./endpoints/recommendations";
import { RandomEndpoint } from "./endpoints/random";
import { JikanError } from "./types/error";

export interface JikanClientOptions {
    baseUrl?: string;
    timeout?: number;
    headers?: Record<string, string>;
}

/**
 * Main client for interacting with the Jikan API
 */
export class JikanClient {
    private baseUrl: string;
    private timeout: number;
    private headers: Record<string, string>;

    // Endpoints
    public anime: AnimeEndpoint;
    public manga: MangaEndpoint;
    public characters: CharactersEndpoint;
    public people: PeopleEndpoint;
    public clubs: ClubsEndpoint;
    public seasons: SeasonsEndpoint;
    public schedules: SchedulesEndpoint;
    public top: TopEndpoint;
    public genres: GenresEndpoint;
    public producers: ProducersEndpoint;
    public magazines: MagazinesEndpoint;
    public users: UsersEndpoint;
    public reviews: ReviewsEndpoint;
    public recommendations: RecommendationsEndpoint;
    public random: RandomEndpoint;

    /**
     * Create a new JikanClient instance
     * @param options Client configuration options
     */
    constructor(options: JikanClientOptions = {}) {
        this.baseUrl = options.baseUrl || "https://api.jikan.moe/v4";
        this.timeout = options.timeout || 30000;
        this.headers = {
            Accept: "application/json",
            ...options.headers
        };

        // Initialize endpoints
        this.anime = new AnimeEndpoint(this);
        this.manga = new MangaEndpoint(this);
        this.characters = new CharactersEndpoint(this);
        this.people = new PeopleEndpoint(this);
        this.clubs = new ClubsEndpoint(this);
        this.seasons = new SeasonsEndpoint(this);
        this.schedules = new SchedulesEndpoint(this);
        this.top = new TopEndpoint(this);
        this.genres = new GenresEndpoint(this);
        this.producers = new ProducersEndpoint(this);
        this.magazines = new MagazinesEndpoint(this);
        this.users = new UsersEndpoint(this);
        this.reviews = new ReviewsEndpoint(this);
        this.recommendations = new RecommendationsEndpoint(this);
        this.random = new RandomEndpoint(this);
    }

    /**
     * Make a request to the Jikan API
     * @param endpoint API endpoint path
     * @param params Query parameters
     * @returns Promise with the API response
     */
    async request<T>(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<T> {
        try {
            const url = new URL(`${this.baseUrl}${endpoint}`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(
                () => controller.abort(),
                this.timeout
            );

            const response = await fetch(url.toString(), {
                method: "GET",
                headers: this.headers,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new JikanError(
                    `API request failed with status ${response.status}`,
                    response.status,
                    errorData
                );
            }

            return (await response.json()) as T;
        } catch (error) {
            if (error instanceof JikanError) {
                throw error;
            }

            if (error instanceof Error && error.name === "AbortError") {
                throw new JikanError("Request timeout", 408);
            }

            throw new JikanError(
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
                500
            );
        }
    }
}
