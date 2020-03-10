import { Idee } from '../models/Idee.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';

@Injectable()
export class IdeeService {
    private idees: Idee[] = [];
    
    baseUrl:string = 'http://localhost:4201/';
    Lidee: any;
    Lesidees: any; 
    
    constructor(private http: HttpClient){}
    
    ideeSubject = new Subject<Idee[]>();

    emitCandidate() {
        this.ideeSubject.next(this.idees.slice());
    }

    addCandidate(idee: Idee) {
        this.idees.push(idee);
        this.emitCandidate();
    }

    addIdeeToServer(fd: any) {
        
        return this.http.post(this.baseUrl, fd, {

        }).subscribe(data => {},
        (err: HttpErrorResponse) => {
            console.log(err.error);
        });
    }

    getSingleIdee(id: string) {
        this.Lidee = this.http.get<any[]>("http://localhost:4201/liste-candidats/",
        {
        params: new HttpParams().append('id', id)
        });
        
        return this.Lidee;
      }

      getAllIdee(){
        this.Lesidees = this.http.get<any[]>("http://localhost:4201/liste-candidats");

        return this.Lesidees;
      }
}