import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Playlist} from "../model/playlist";
import playlistService from "../service/PlaylistService";
import userService from "../service/UserService";
class PlaylistController{
    private playlistService;
    private userService;
    constructor() {
        this.playlistService = playlistService
        this.userService = userService;
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let playlists = await playlistService.getMyPlaylist(req["decoded"].idUser);
            res.status(200).json(playlists)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    createPlaylist = async (req: Request, res: Response) => {
        try {
            let playlists = await playlistService.save(req.body);
            res.status(200).json(playlists)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    // findByIdPlaylist = async (req: Request, res: Response) => {
    //     try {
    //         let idPlaylist = req.params.idAlbum
    //         let playlists = await playlistService.findById(idPlaylist);
    //         res.status(200).jsonp(playlists)
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    // }
    editPlaylist = async (req: Request, res: Response)=> {
        try {
            let idPlaylist = req.params.idPlaylist;
            let newPlaylist = req.body;
            let idUser = req["decoded"].idUser;
            let check = await this.playlistService.checkUser(idUser, idPlaylist);
            if(check) {
                let playlists = await this.playlistService.updatePlaylist(idPlaylist,newPlaylist);
                res.status(200).json(playlists)
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
     }
     showPlaylistByIdUser = async (req: Request, res: Response)=> {
         try {
             let playlists = await this.playlistService.findPlaylistByIdUser(req.params.idUser)
             return res.status(200).json(playlists)
         } catch (err) {
             res.status(500).json(err.message)
         }
     }

}
export default new PlaylistController();