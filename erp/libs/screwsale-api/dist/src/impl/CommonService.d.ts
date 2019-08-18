export declare class CommonService {
    private env;
    constructor();
    init(env: string): Promise<void>;
    private log;
    uploadImage(imageofFormData: any): Promise<any>;
    getImage(imageUrl: string, imageType: string): Promise<any>;
    sendEmail(email: string, subject: string, content: string): Promise<any>;
}
