export interface Producer {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

export interface ProducerQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: "mal_id" | "name" | "count";
    sort?: "desc" | "asc";
    letter?: string;
}
