import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  error, putError, putNext, usersInterface } from '../interfaces/interface-users';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  http = inject(HttpClient);

  constructor() {}
    animation = signal(true)


  saveData(body: usersInterface) {

    console.log("HACIENDO PETICION DE POST")
    const jsonData = JSON.stringify(body);

    return this.http
      .post(
        'https://crud-backend-xwqd.onrender.com/addUsers',
        jsonData,

        {
          headers: { 'content-type': 'application/json' },
        },)
  }

  

  usersDataMapping = signal<error>({});

  putData (body: any, id: Number) {
    this.usersDataMapping.set({nombre: "Cargando"})
    const jsonData = JSON.stringify(body[0]);

    return this.http.put<putNext>('https://crud-backend-xwqd.onrender.com/' + id, jsonData,{headers: { 'content-type': 'application/json' },},).pipe()
  }



  getUsers() {
    return this.http.get<[]>('https://crud-backend-xwqd.onrender.com/callUsers');
  }

  deleteUsers() {
    return this.http.delete('https://crud-backend-xwqd.onrender.com/deleteAllUsers');
  }


  deleteUsersById(id: number) {

    return this.http.delete('https://crud-backend-xwqd.onrender.com/deleteById/' + id)

  }


  updateSignalMod = signal(false)
}
