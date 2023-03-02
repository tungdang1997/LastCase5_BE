import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class PlaylistDetail {
    @PrimaryGeneratedColumn()
    idPlaylistDetail: number;
    @Column()
    idSong: number;
    @Column()
    idPlaylist: number;

}