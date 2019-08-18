export declare class CoreServiceHelper {
    private static singleton;
    private token;
    static getHelper(): CoreServiceHelper;
    getImage: (url: string, contentType: string) => Promise<any>;
    post: (url: string, contentType: string, body: string) => Promise<any>;
    getToken(): string;
    setToken(token: string): void;
}
