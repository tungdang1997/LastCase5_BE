import {Router} from "express";
import songController from "../controller/SongController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/user";
export const songRouter = Router()
songRouter.get('',songController.getAllSong);
songRouter.get('/find-song-by-name',songController.findSong);
songRouter.use(auth)
songRouter.get('/users',songController.getAllSong);
songRouter.get('/find-by-name',songController.findSongByName);
songRouter.get('/my-songs',songController.getMySong)
songRouter.post('', userAuth,songController.createSong)
songRouter.put('/:idSong', userAuth,songController.editSong)
songRouter.delete('/:idSong', songController.removeSong)
// songRouter.get('/:idSong',songController.findByIdSong)
songRouter.get('/playSong/:idSong',songController.countSong)
songRouter.get('/my-song/:idUser',songController.findSongByIdUser)