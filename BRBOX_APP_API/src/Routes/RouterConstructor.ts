import Router from 'express'
import View from '../View';


export default class RouterConstructor {

    public static getCRUD(customView : View) {

        const router = Router();
        const view = customView;
        
        router.post('/create',               view.Create);
        router.get('/:id',                   view.Get);
        router.put('/update',                view.Update);
        router.delete('/destroy/:id',        view.Delete);
        router.get('/',                      view.GetAll);

        return router;
    }

    public static getCRUD_middleware(customView : View, Middleware: any) {

        const router = Router();
        const view = customView;
        
        router.post('/create',          Middleware, view.Create);
        router.get('/:id',              Middleware, view.Get);
        router.put('/update',           Middleware, view.Update);
        router.delete('/destroy/:id',   Middleware, view.Delete);
        router.get('/',                 Middleware, view.GetAll);

        return router;
    }

};