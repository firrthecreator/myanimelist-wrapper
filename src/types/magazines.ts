export interface Magazine {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

export interface MagazineQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: "mal_id" | "name" | "count";
    sort?: "desc" | "asc";
    letter?: string;
}
