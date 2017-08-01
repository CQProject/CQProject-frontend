import { Component } from "@angular/core";

@Component({
	 template: `
    <h2 style="color:#800">{{title}}</h2>
    <hr>
    <p  style="color:#800">{{erro}}</p> 
  `
})

export class NotFoundComponent{
  title = '404';
  erro = 'Página Não encontrada!'
}