
import categoryService from "../service/CategoryService";
import {Request, Response} from "express";
import songService from "../service/SongService";
import playlistService from "../service/PlaylistService";

class SongController {
    private songService;
    private categoryService;
    private playlistService;

    constructor() {
        this.songService = songService;
        this.categoryService = categoryService;
        this.playlistService = playlistService
    }

    getAllSong = async (req: Request, res: Response) => {
        try {
            let playlists;
            let data;
            let songs = await songService.getAll();
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
                playlists = await playlistService.getMyPlaylist(req["decoded"].idUser);
                data = [songs, categories, playlists];
            } else {
                data = [songs, categories];
            }
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    getMySong = async (req: Request, res: Response) => {
        try {
            let songs = await songService.getMySong(req["decoded"].idUser);
            let categories = await categoryService.getAllCategory();
            let playlists = await playlistService.getMyPlaylist(req["decoded"].idUser);
            let data = [songs, categories, playlists];
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    createSong = async (req: Request, res: Response) => {
        try {
            let songs = await songService.save(req.body);
            res.status(200).json(songs)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    editSong = async (req: Request, res: Response) => {
        try {
            let idSong = req.params.idSong;
            let idUser = req["decoded"].idUser;
            let check = await this.songService.checkUser(idUser, idSong);
            if (check) {
                let songs = await this.songService.updateSong(idSong, req.body);
                res.status(200).json(songs);
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    removeSong = async (req: Request, res: Response) => {
        try {
            let idSong = req.params.idSong;
            let idUser = req["decoded"].idUser;
            let check = await this.songService.checkUser(idUser, idSong);
            if (check || (req["decoded"].role === 'admin')) {
                let songs = await this.songService.removeSong(idSong);
                res.status(200).json(songs);
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdSong = async (req: Request, res: Response) => {
        try {
            let idSong = req.params.idSong
            let songs = await songService.findById(idSong);
            res.status(200).json(songs)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories= await categoryService.getAllCategory();
            res.status(200).json(categories)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    searchNameSong = async (req: Request,res: Response) => {
        try{
            let songs = await this.songService.findByNameSong(req.query.nameSong)
            res.status(200).json(songs)
        }catch (e){
            res.status(500).json(e.message)
        }

    }

    findSongByIdUser = async (req: Request,res: Response) =>{
        try {
            let songs = await this.songService.findSongByIdUser(req.params.idUser)
            return res.status(200).json(songs)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
    countSong = async (req: Request,res: Response)=> {
        try {
            let idSong = req.params.idSong
            let counts = await this.songService.checkCount(idSong)
            res.status(200).json(counts)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    findSongByName = async (req: Request,res: Response) => {
        try {
            let playlists;
            let data;
            let name = req.query.name
            let songs = await this.songService.findSongByName(name)
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
                playlists = await playlistService.getMyPlaylist(req["decoded"].idUser);
                data = [songs, categories, playlists];
            } else {
                data = [songs, categories];
            }
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    findSong = async (req: Request,res: Response) => {
        try {
            let name = req.query.name
            let songs = await this.songService.findSongByName(name)
            let categories = await categoryService.getAllCategory();
            let data = [songs, categories];
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

export default new SongController();
