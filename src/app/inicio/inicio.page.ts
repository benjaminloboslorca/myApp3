import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; 


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(public router: Router,
    private menu: MenuController,) 
    { }


  isScannerActive: boolean = false;  
  correoUsuario = localStorage.getItem('correoUsuario');

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.removeItem('autenticado');
    this.router.navigate(["/login"]);
    this.menu.close();
  }

  readonly startScan = async () => {
    this.isScannerActive = true;
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan(); 
    if (result.hasContent) {
      console.log(result.content); 
      this.isScannerActive = false;
    }
  };

}


