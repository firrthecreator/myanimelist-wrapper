export interface Club {
    mal_id: number;
    name: string;
    url: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    members: number;
    category: string;
    created: string;
    access: string;
}

export interface ClubMember {
    username: string;
    url: string;
    images: {
        jpg: {
            image_url: string;
        };
        webp?: {
            image_url: string;
        };
    };
}

export interface ClubStaff {
    username: string;
    url: string;
    images: {
        jpg: {
            image_url: string;
        };
        webp?: {
            image_url: string;
        };
    };
}

export interface ClubRelation {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface ClubQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    type?: "public" | "private" | "secret";
    category?:
        | "anime"
        | "manga"
        | "actors_and_artists"
        | "characters"
        | "cities_and_neighborhoods"
        | "companies"
        | "conventions"
        | "games"
        | "japan"
        | "music"
        | "other"
        | "schools";
    order_by?: "mal_id" | "name" | "members_count" | "created";
    sort?: "desc" | "asc";
    letter?: string;
}
