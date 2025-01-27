import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor(

    @InjectModel( User.name ) 
    private userModel: Model<User> //con este modelo puedo hacer todas las interacciones con la BD relacionada. 

  ) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
  
    try {

      // const newUser = new this.userModel( createUserDto );
      // return await newUser.save(); 
      
      const { password, ...userData } = createUserDto;
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync( password, 10 ), // encriptado de contraseña
        ...userData
      })
      
      await newUser.save(); 
      const { password:_, ...user } = newUser.toJSON(); 
      
      return user;      
      
      
    } catch(error) {
      if ( error.code === 11000) {
        throw new BadRequestException(`${ createUserDto.email } already exists!`)
      }

      throw new InternalServerErrorException('Something terrible happen!!')
    }
 


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
