import { Component, OnInit, inject } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  title: string = 'Seccion Reportes';

  private usuariosService = inject(UsuariosService);

  ngOnInit(): void {
    this.getReporte();  
  }

  view: [number, number] = [900,500];
  salesData = [];
  gradient = false;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Vendedores';
  showYAxisLabel = true;
  yAxisLabel = 'Total Ventas';

  getReporte(){
    this.usuariosService.getReporte().subscribe(resultado => {
      this.salesData = resultado;
    })
  }
}

