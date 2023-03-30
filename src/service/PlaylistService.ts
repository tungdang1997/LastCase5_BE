import {AppDataSource} from "../data-source";

import {Playlist} from "../model/playlist";

class PlaylistService{
    private playlistRepository
    constructor() {
        this.playlistRepository = AppDataSource.getRepository(Playlist)
    }
    getAllPlaylist = async ()=> {
        let sql = `select * from playlist p join user u on p.idUser = u.idUser`;
        let playlists = await this.playlistRepository.query(sql);
        return playlists;

    }
    getMyPlaylist = async (idUser)=> {
        let sql = `select * from playlist p join user u on p.idUser = u.idUser where u.idUser = ${idUser}`;
        let playlists = await this.playlistRepository.query(sql);
        return playlists;

    }
    save = async (playlist)=> {
        playlist.countSongPlaylist = 0;
        playlist.imagePlaylist = playlist.imagePlayList;
        return this.playlistRepository.save(playlist)
    }
    findById = async (idPlaylist)=> {
        let playlists = await this.playlistRepository.findOneBy({idPlaylist :idPlaylist})
        return playlists
    }
    updatePlaylist= async (idPlaylist, newPlaylist)=>{
        console.log(newPlaylist, "32-playlistService")
        let playlists = await this.playlistRepository.findOneBy({idPlaylist: idPlaylist})
        if (!playlists) {
            return null
        }
        return await this.playlistRepository.update({idPlaylist: idPlaylist}, newPlaylist)
    }
    findPlaylistByIdUser = async (idUser) => {
        let sql = `select p.namePlaylist from playlist p join user u on p.idUser = u.idUser where u.idUser  = ${idUser}`
        let playlists = this.playlistRepository.query(sql)
        return playlists
    }
    checkUser = async (idUser, idPlaylist) => {
        let sql = `select p.idUser from playlist p join user u on p.idUser = u.idUser where idPlaylist = ${idPlaylist}`;
        let checkIdUser = await this.playlistRepository.query(sql);
        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }

    countSongPlaylist = async (idPlaylist) => {
        let playlist = await this.playlistRepository.findOneBy({idPlaylist: idPlaylist})
        if (!playlist) {
            return null
        }
        playlist.countSongPlaylist = playlist.countSongPlaylist + 1;
        return await this.playlistRepository.update({idPlaylist: idPlaylist}, playlist);
    }

}
export default new PlaylistService();