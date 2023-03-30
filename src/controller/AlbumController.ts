import {Request, Response} from "express";
import albumService from "../service/AlbumService";
import songService from "../service/SongService";
import categoryService from "../service/CategoryService";

class AlbumController{
    private albumService;
    private userService;
    private songService;
    private categoryService;
    constructor() {
        this.albumService = albumService;
        this.songService = songService;
        this.categoryService = categoryService;
    }
    getAll = async (req: Request, res: Response) => {
        try {
            let albums = await albumService.getAllAlbum();
            let songs = await songService.top4Song();
            let data = [albums, songs];
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    createAlbum = async (req: Request, res: Response) => {
        try {
            let albums = await albumService.save(req.body);
            res.status(200).json(albums)
        } catch (e) {
            console.log(e)
            res.status(500).json(e.message)
        }

    }
    editAlbum = async (req: Request, res: Response)=> {
      try {

          let idAlbum = req.params.id;
          console.log(11,idAlbum)
          let newAlbum = req.body;
          let idUser = req["decoded"].idUser;
          let check = await this.albumService.checkUser(idUser, idAlbum);
          console.log(6, check)
          let albums = await this.albumService.updateAlbum(idAlbum,newAlbum);

          res.status(200).json(albums)
          // if(check == true) {
          //
          // }
          // else {
          //     res.status(401).json('invalid');
          // }
      } catch (e) {
          console.log(e)
          res.status(500).json(e.message)
      }
}


    removeAlbum = async (req: Request, res: Response) => {
        try {
            let idAlbum = req.params.id;
            let idUser = req["decoded"].idUser;
            let check = await this.albumService.checkUser(idUser, idAlbum);
            if (check) {
                let albums = await this.albumService.removeAlbum(idAlbum);
                res.status(200).json(albums)}
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdAlbum = async (req: Request, res: Response) => {

        try {
            let idAlbum = req.params.id;
            let albums = await albumService.findById(idAlbum);
            res.status(200).json(albums)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    showMyAlbum = async (req: Request, res: Response) => {

        try {

            let albums = await albumService.myAlbum(req["decoded"].idUser);
            res.status(200).json(albums)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    showAlbumDetail = async (req: Request, res: Response) => {
        try {
            let albums = await albumService.albumDetail(req.params.idAlbum);
            let categories = await categoryService.getAllCategory();
            let data = [albums, categories];
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}
export default new AlbumController()