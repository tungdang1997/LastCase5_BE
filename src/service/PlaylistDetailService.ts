import {AppDataSource} from "../data-source";
import {PlaylistDetail} from "../model/playlistDetail";

class PlaylistDetailService{
    private playlistDetailRepository;
    constructor() {
        this.playlistDetailRepository = AppDataSource.getRepository(PlaylistDetail)
    }
    getAllPlaylistDetail = async () => {
        let sql = `select *
                   from song
                            join playlist_detail pd on song.idSong = pd.idSong
                            join playlist p on pd.idPlaylist = p.idPlaylist;`
        let playlistDetails = await this.playlistDetailRepository.query(sql);
        return playlistDetails
    }

    getPlaylistDetail = async (idPlaylist) => {
        let sql = `select * from song
                            join playlist_detail pd on song.idSong = pd.idSong
                            join playlist p on pd.idPlaylist = p.idPlaylist 
                            join category c on 	song.idCategory = c.idCategory 
                            join album a on song.idAlbum = a.idAlbum
                            join user u on p.idUser = u.idUser where p.idPlaylist = ${idPlaylist};`
        let playlistDetails = await this.playlistDetailRepository.query(sql);
        return playlistDetails
    }
    
    save = async (playlistDetail)=> {
        let playlistDetails = await this.playlistDetailRepository.findOneBy({idSong: playlistDetail.idSong});
        if (!playlistDetails) {
            await this.playlistDetailRepository.save(playlistDetail);
            return true;
        }
        return false;
    }
    removeSongPlaylist = async (idPlaylistDetail) => {
        let playlistDetails = await this.playlistDetailRepository.findOneBy({idPlaylistDetail: idPlaylistDetail});
        if (!playlistDetails) {
            return null
        }
        return this.playlistDetailRepository.delete({idPlaylistDetail: idPlaylistDetail});
    }
    addS

}
export default new PlaylistDetailService();