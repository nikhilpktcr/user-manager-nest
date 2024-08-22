import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const APIURL = `https://dummyjson.com/users`;
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const addUser = await fetch(`${APIURL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createUserDto),
    });
    const data = await addUser.json();
    return data;
  }

  async findAll() {
    const response = await fetch(`${APIURL}`, {
      method: 'GET',
    });
    const users = await response.json();
    return users;
  }

  async findOne(id: number) {
    const response = await fetch(`${APIURL}/${id}`, {
      method: 'GET',
    });
    const user = await response.json();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const response = await fetch(`${APIURL}/${id}`, {
      method: 'GET',
    });
    const user = await response.json();
    if (user) {
      const response = await fetch(`${APIURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUserDto),
      });
      const user = await response.json();
      return user;
    }
  }

  async remove(id: number) {
    const response = await fetch(`${APIURL}/${id}`, {
      method: 'DELETE',
    });
    const user = await response.json();
    return user;
  }
}
