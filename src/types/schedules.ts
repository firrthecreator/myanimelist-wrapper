export interface ScheduleQueryParams {
    filter?:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
        | "other"
        | "unknown";
    sfw?: boolean;
    page?: number;
    limit?: number;
}
