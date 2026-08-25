import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  error, putError, putNext, usersInterface } from '../interfaces/interface-users';
import { environment } from '../../environments/environment';

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

    return this.http.put<putNext>(environment.putDataAPI + id, jsonData,{headers: { 'content-type': 'application/json' },},).pipe()
  }



  getUsers() {
    return this.http.get<[]>( environment.getDataAPI +'callUsers');
  }

  deleteUsers() {
    return this.http.delete(environment.deleteDataAPI + 'deleteAllUsers');
  }


  deleteUsersById(id: number) {

    return this.http.delete(environment.deleteDataAPI + 'deleteById/' + id)

  }

 
  updateSignalMod = signal(false)
}
