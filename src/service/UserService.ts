import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SECRET} from "../middleware/auth";
import SongService from "./SongService";
import {Song} from "../model/song";

class UserServices {
    private userRepository;
    private songRepository

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.songRepository = AppDataSource.getRepository(Song)

    }

    getAll = async () => {
        let sql = `select * 
                   from  user where role = 'user'`
        let users = await this.userRepository.query(sql);
        return users;
    }

    getMyProfile = async (idUser) => {
        let sql = `select * 
                   from  user where idUser = ${idUser}`
        let users = await this.userRepository.query(sql);

        return users;
    }

    checkOldPassword = async (idUser, password) => {
        let userCheck = await this.userRepository.findOneBy({idUser: idUser});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(password, userCheck.password);
            if (passwordCompare) {
                return true;
            } else {
                return false;
            }
        }
    }

    checkNewPassword = async (idUser, password) => {
        let userCheck = await this.userRepository.findOneBy({idUser: idUser});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(password, userCheck.password);
            if (passwordCompare) {
                return true;
            } else {
                return false;
            }
        }
    }

    changePassword = async (idUser, password) => {
        let user = await this.userRepository.findOneBy({idUser: idUser});
        if (!user) {
            return "User not found";
        } else {
            user.password = await bcrypt.hash(password, 10);
            return this.userRepository.update({idUser: idUser}, user);
        }
    }

    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.save(user)

    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password);
            if (!passwordCompare) {
                return "Wrong password"
            } else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role
                }

                const token = jwt.sign(payload, SECRET, {
                    expiresIn: 360000
                });

                let userRes = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    role: userCheck.role,
                    avatar: userCheck.avatar,
                    token : token
                }
                return userRes;
            }
        }

    }

    edit = async (id, user) => {
        let checkUser = await this.userRepository.findOneBy({idUser :id})
        if(!checkUser) {
            return null
        }
        user.password = checkUser.password;
        return await this.userRepository.update({idUser : id},user)
    }

    remove = async (id) => {
        let user = await this.userRepository.findOneBy({idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.delete({idUser: id})
    }

    showSong = async (id)=>{
        let user = await this.userRepository.findOneBy({idUser: id});
        if(!user) {
            return null;
        }
        else {

        }

    }
}

export default new UserServices();