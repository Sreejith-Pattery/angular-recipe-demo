import { Component, OnInit } from '@angular/core';
import * as Firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {  
    Firebase.initializeApp({
      apiKey: "AIzaSyAjHebzjpuvVTFTQk73n1T2-VGoETqpL70",
      authDomain: "myidlibot.firebaseio.com",
    });
  }
  title = 'app';
  loadedFeature = 'recipe';

  onNavigate(feature:string){
    this.loadedFeature = feature;
  }
}
