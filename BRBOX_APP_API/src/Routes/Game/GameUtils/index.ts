import { Router, Request, Response } from 'express';

const GameUtilsRouter = Router();

GameUtilsRouter.get("/gameInfoOpenApp", (req: Request, res: Response) => {
  const {gameId} = req.query;

  return res.render("openGame.ejs", {gameId});
});

export default GameUtilsRouter;