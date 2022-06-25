import Router from 'express'
import Auth from '../Middleware/auth';

import userRouter from './User';
import adminRouter from './User/Admin';


import gameRouter from './Game';
import tagRouter from './Game/Tag';
import valueRouter from './Game/Tag/value'
import tagValueListRouter from './Game/Tag/tagValueList';
import platformRouter from './Game/Platform';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/admin', Auth.admin,    adminRouter);

mainRouter.use('/game', gameRouter);

mainRouter.use('/platform', Auth.admin, platformRouter);

mainRouter.use('/tag', Auth.user,  tagRouter);
mainRouter.use('/value', Auth.user, valueRouter);
mainRouter.use('/tagValue', Auth.user,  tagValueListRouter);

export default mainRouter;