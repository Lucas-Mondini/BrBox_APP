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

mainRouter.use('/game', Auth.admin,     gameRouter);

mainRouter.use('/platform', Auth.admin, platformRouter);

mainRouter.use('/tag', Auth.admin,      tagRouter);
mainRouter.use('/value', Auth.admin,    valueRouter);
mainRouter.use('/tagValue', Auth.user,  tagValueListRouter);

export default mainRouter;