import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Song} from "../model/song";
import {Album} from "../model/album";

class SongService {
    private songRepository
    private albumRepository
    constructor() {
        this.songRepository = AppDataSource.getRepository(Song);
        this.albumRepository = AppDataSource.getRepository(Album);
    }

    getAll = async () => {
        let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser`;
        let songs = await this.songRepository.query(sql);
        if (!songs) {
            return 'No songs found'
        }
        return songs;
    }

    getMySong = async (idUser) => {
        let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser where u.idUser = ${idUser}`;
        let songs = await this.songRepository.query(sql)
        return songs;
    }

    save = async (song) => {

        let albums = await this.albumRepository.findOneBy({idAlbum: song.idAlbum})
        console.log(albums, song, 1)
        if (!albums) {
            return null
        }
        albums.countSong = albums.countSong + 1;
        await this.albumRepository.update({idAlbum: song.idAlbum}, albums);
        await this.songRepository.save(song);
        return song.idAlbum;
    }
    findById = async (idSong) => {
        let songs = await this.songRepository.findOneBy({idSong: idSong})
        return songs
    }
    updateSong = async (idSong, newSong) => {
        let songs = await this.songRepository.findOneBy({idSong: idSong})
        if (!songs) {
            return null
        }
        newSong.count = songs.count;
        await this.songRepository.update({idSong: idSong}, newSong)
        return newSong.idAlbum;
    }
    removeSong = async (idSong) => {
        let songs = await this.songRepository.findOneBy({idSong: idSong});
        if (!songs) {
            return null
        }
        await this.songRepository.delete({idSong: idSong});
        return songs.idAlbum;
    }
    findByNameSong = async (value) => {
            let sql = `select *
                       from album
                                join song s on album.idAlbum = s.idAlbum where s.nameSong like '%${value}%'`
            let songs = await this.songRepository.query(sql);
            if(!songs){
                return null;
            }
            return songs;

    }

    findSongByIdUser = async (id) => {
        let sql = `select *
                   from song
                            join album a on song.idAlbum = a.idAlbum
                            join user u on a.idUser = u.idUser
                   where a.idUser = ${id}`
        let songs = this.songRepository.query(sql)
        return songs
    }

    checkUser = async (idUser, idSong) => {
        let sql = `select u.idUser
                   from song s
                            join album a on s.idAlbum = a.idAlbum
                            join user u on a.idUser = u.idUser
                   where idSong = ${idSong}`;
        let checkIdUser = await this.songRepository.query(sql);
        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }
    checkCount = async (idSong)=>{
        let songs = await this.songRepository.findOneBy({idSong : idSong});
        if (!songs) {
            return null;
        }
        songs.count ++;
        return await this.songRepository.update({ idSong: idSong}, songs);
    }

    top4Song = async () => {
        let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser order by count desc limit 4`;
        let songs = await this.songRepository.query(sql);
        if (!songs) {
            return null;
        }
        return songs;
    }

    findSongByName = async (name) => {
        let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser where nameSong like "%${name}%"`;
        let songs = await this.songRepository.query(sql);
        if (!songs) {
            return null;
        }
        return songs;
    }

}

export default new SongService();