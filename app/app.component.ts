import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: "my-app",
	templateUrl: "app/app.component.html",
  styleUrls:["app/app.component.css"],
})

export class AppComponent{
  project :string = 'CQPROJECT';
  footer='Diogo Mendes | Ricardo António | David Bernardo';
  today: number = Date.now();
}