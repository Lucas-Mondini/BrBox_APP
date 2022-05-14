import {Request, Response} from 'express'

export default interface Controller {
    Create  (req: Request, res: Response): Promise<Object>;
    Index   (req: Request, res: Response): Promise<Object>;
    Get     (req: Request, res: Response): Promise<Object>;
    Update  (req: Request, res: Response): Promise<Object>;
    Delete  (req: Request, res: Response): Promise<Object>;
}