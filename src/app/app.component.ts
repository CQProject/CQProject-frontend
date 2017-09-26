import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})

export class AppComponent{
  dm = 'Diogo Mendes'
  ra = 'Ricardo António' 
  db = 'David Bernardo';
  today: number = Date.now();
}