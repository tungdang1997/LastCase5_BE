import {Router} from "express";
import {songRouter} from "./song-router";
import {categoryRouter} from "./category-router";
import songController from "../controller/SongController";
import {albumRouter} from "./album-router";
import {userRouter} from "./user-router";
import {adminRouter} from "./admin-router";
import {playlistRouter} from "./playlist-router";
import {playlistDetailRouter} from "./playlistDetail-router";
export  const router = Router()
router.use('/songs',songRouter);
router.use('/playlists',playlistRouter);
router.use('/playlistDetails',playlistDetailRouter);
router.use('/users',userRouter);
router.use('/admins',adminRouter);
router.use('/albums',albumRouter);
router.use('/categories',categoryRouter);
router.get('/find-by-name', songController.searchNameSong);
