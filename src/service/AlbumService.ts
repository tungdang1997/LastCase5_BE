
import {AppDataSource} from "../data-source";
import {Album} from "../model/album";

class AlbumService {
    private albumRepository
    constructor() {
        this.albumRepository = AppDataSource.getRepository(Album);
    }

    getAllAlbum = async () => {
        let sql = `select * from album a join user u on a.idUser = u.idUser`;
        let albums = await this.albumRepository.query(sql);
        if (!albums) {
            return null;
        }
        return albums;
    }
    save = async (album) => {
        return this.albumRepository.save(album)
    }
    findById = async (idAlbum)=> {
        let albums = await this.albumRepository.findOneBy({idAlbum :idAlbum});
        if (!albums) {
            return null;
        }
        return albums
    }
    updateAlbum = async (idAlbum, newAlbum) => {
        let albums = await this.albumRepository.findOneBy({idAlbum: idAlbum})

        if (!albums) {
            return null
        }

        console.log(newAlbum)
        return await this.albumRepository.update(idAlbum, newAlbum)

    }

    removeAlbum = async (idAlbum) => {
        let albums = await this.albumRepository.findOneBy({idAlbum : idAlbum});
        if(!albums){
            return null
        }
        return this.albumRepository.delete({idAlbum : idAlbum});
    }

    checkUser = async (idUser, idAlbum) => {
        let sql = `select u.idUser from album a join user u on a.idUser = u.idUser where idAlbum = ${idAlbum}`;
        let checkIdUser = await this.albumRepository.query(sql);
        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }

    myAlbum = async (idUser)=> {
        let sql = `select * from album a join user u on a.idUser = u.idUser where a.idUser = ${idUser}`;
        let albums = await this.albumRepository.query(sql);
        if (!albums) {
            return null;
        }
        return albums;
    }

    albumDetail = async (idAlbum)=> {
        let sql = `select * from album a join user u on a.idUser = u.idUser join song s on a.idAlbum = s.idAlbum join category c on s.idcategory = c.idCategory where a.idAlbum = ${idAlbum}`;
        let albums = await this.albumRepository.query(sql);
        if (!albums) {
            return null;
        }
        return albums;
    }
}
export default new AlbumService();
