export interface JikanResponse<T> {
    data: T;
}

export interface JikanPaginatedResponse<T> {
    data: T[];
    pagination: PaginationInfo;
}

export interface PaginationInfo {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    };
}

export interface Image {
    jpg: {
        image_url: string;
        small_image_url?: string;
        large_image_url?: string;
    };
    webp?: {
        image_url: string;
        small_image_url?: string;
        large_image_url?: string;
    };
}

export interface Title {
    type: string;
    title: string;
}

export interface DateRange {
    from: string | null;
    to: string | null;
}

export interface CommonQueryParams {
    page?: number;
    limit?: number;
    q?: string;
    order_by?: string;
    sort?: "desc" | "asc";
    letter?: string;
}
