import playlistDetailService from "../service/PlaylistDetailService";
import userService from "../service/UserService";
import {Request, Response} from "express";
import playlistService from "../service/PlaylistService";

class PlaylistDetailController {
    private playlistDetailService;
    private userService;
    private playlistService;
    constructor() {
        this.playlistDetailService = playlistDetailService;
        this.userService = userService;
        this.playlistService = playlistService;
    }
    getAll = async (req: Request, res: Response)=>{
        try {
            let playlistDetails = await playlistDetailService.getAllPlaylistDetail();
            res.status(200).json(playlistDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    getPlaylistDetail = async (req: Request, res: Response)=>{
        try {
            let playlistDetails = await playlistDetailService.getPlaylistDetail(req.params.idPlaylistDetail);
            res.status(200).json(playlistDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    createPlaylistDetails = async (req: Request, res: Response) => {
        try {
            let playlistDetails = await playlistDetailService.save(req.body);
            if (playlistDetails) {
                let countSongPlaylist = await playlistService.countSongPlaylist(req.body.idPlaylist);
            }
            res.status(200).json(playlistDetails)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    removeSongFromPlaylist = async (req: Request, res: Response)=> {
        try {
            let idPlaylistDetail = req.params.id;
            let playlistDetails = await playlistDetailService.removeSongPlaylist(idPlaylistDetail);
                res.status(200).json(playlistDetails)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


}
export default new PlaylistDetailController()
