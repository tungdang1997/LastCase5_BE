import {Router} from "express";
import albumController from "../controller/AlbumController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/user";
export const albumRouter = Router()
albumRouter.get('',albumController.getAll);
albumRouter.get('/detail/:idAlbum', albumController.showAlbumDetail);
albumRouter.use(auth)
albumRouter.post('/', userAuth,albumController.createAlbum);
albumRouter.put('/:id', userAuth,albumController.editAlbum);
albumRouter.delete('/:id',albumController.removeAlbum);
albumRouter.get('/:id',albumController.findByIdAlbum);
albumRouter.get('/my-album', userAuth,albumController.showMyAlbum);
albumRouter.get('/album-detail/:idAlbum', albumController.showAlbumDetail);