import Router from 'express'
import Auth from '../Middleware/auth';

import userRouter from './User';
import adminRouter from './User/Admin';


import gameRouter from './Game';
import tagRouter from './Game/Tag';
import valueRouter from './Game/Tag/value'
import tagValueListRouter from './Game/Tag/tagValueList';
import platformRouter from './Game/Platform';
import businessModelRouter from './Game/businessModel';
import gameTimeRouter from './Game/gameTime';
import GameUtilsRouter from './Game/GameUtils';
import suggestionRouter from './Sugestion';
import gameGenreRouter from './Game/classification/genre';
import gameModeRouter from './Game/classification/mode';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/admin', Auth.admin,    adminRouter);

mainRouter.use('/game', gameRouter);

mainRouter.use('/platform', Auth.admin, platformRouter);

mainRouter.use('/tag', Auth.user,  tagRouter);
mainRouter.use('/value', Auth.user, valueRouter);
mainRouter.use('/tagValue', Auth.user,  tagValueListRouter.tagValueListRouter);
mainRouter.use('/tagValueFormat', Auth.user,  tagValueListRouter.tagValueListRouterNewFormat);

mainRouter.use('/gameTime', Auth.user, gameTimeRouter)

mainRouter.use('/businessModel', Auth.user, businessModelRouter)
mainRouter.use('/suggestion', Auth.user, suggestionRouter)

mainRouter.use('/gameUtils', GameUtilsRouter);

mainRouter.use('/genre', Auth.user, gameGenreRouter);
mainRouter.use('/mode', Auth.user, gameModeRouter);

export default mainRouter;