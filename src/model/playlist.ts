import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    idPlaylist: number;
    @Column()
    namePlaylist: string;
    @Column()
    imagePlaylist: string;
    @Column({default: 0})
    countSongPlaylist: number;
    @Column({default: true})
    playlistStatus: boolean;
    @Column()
    idUser: number;
}