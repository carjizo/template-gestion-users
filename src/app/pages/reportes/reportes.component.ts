import { Component } from '@angular/core';
import { NavbardComponent } from "../navbard/navbard.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reportes',
  imports: [NavbardComponent, FooterComponent, RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

}
