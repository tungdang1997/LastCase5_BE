import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    idPlaylist: number;
    @Column()
    namePlaylist: string;
    @Column()
    idUser: number;
    @Column()
    imagePlaylist: string;
    @Column({default: 0})
    countSongPlaylist: number;
}