import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser : number;
    @Column()
    username : string;
    @Column()
    password : string;
    @Column()
    nameUser : string;
    @Column({type: "text"})
    avatar : string;
    @Column({default:'user'})
    role : string;
    @Column({default: true})
    userStatus: boolean;
}