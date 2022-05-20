import {Request} from 'express'

export default interface Controller {
    Create  (req: Request): Promise<Object> | never;
    Index   (req: Request): Promise<Object> | never;
    Get     (req: Request): Promise<Object> | never;
    Update  (req: Request): Promise<Object> | never;
    Delete  (req: Request): Promise<Object> | never;
}