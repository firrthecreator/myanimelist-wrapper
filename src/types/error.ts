export class JikanError extends Error {
    status: number;
    data?: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.name = "JikanError";
        this.status = status;
        this.data = data;
    }
}
