import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    idSong: number;
    @Column()
    nameSong: string;
    @Column()
    singer: string
    @Column()
    author: string;
    @Column({type: "text"})
    image: string;
    @Column({type: "text"})
    sound: string;
    @Column({default: true})
    songStatus: boolean;
    @Column()
    idCategory: number;
    @Column()
    idUser: string;
    @Column()
    idAlbum: number;
}
