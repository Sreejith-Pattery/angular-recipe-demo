import * as Firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    constructor(private router:Router){}

    token:string = null;
    signup(username:string, password:string){
        Firebase.auth().createUserWithEmailAndPassword(username, password)
        .catch(
            (error)=>{ console.log(error)}
        )
    }

    signin(username:string, password:string){
        Firebase.auth().signInWithEmailAndPassword(username, password)
        .then(
            ()=>{ 
                this.router.navigate(['/']);
                Firebase.auth().currentUser.getIdToken()
                .then(
                    (token) =>{
                        this.token = token;
                        //console.log(token);
                    }
                )
//                console.log(response)
            }
        )
        .catch(
            (error)=>{ console.log(error)}
        )
    }

    getToken(){
        Firebase.auth().currentUser.getIdToken()
        .then((token)=>{
                this.token = token;
                //console.log(token);
            }
        )
        return this.token;
    }

    isAuthenticated(){
        return this.token !== null;
    }

    logout(){
        Firebase.auth().signOut();
        this.token = null;
    }
}