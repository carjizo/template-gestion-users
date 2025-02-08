import { Component } from '@angular/core';
import { NavbardComponent } from "../navbard/navbard.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [NavbardComponent, RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
