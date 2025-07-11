import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor() {
    document.body.classList.add('dark') // Fuerza modo oscuro
    this.configureStatusBar()
  }

  async configureStatusBar() {
    await StatusBar.setStyle({ style: Style.Dark }) // o .Dark
    await StatusBar.setBackgroundColor({ color: '#4d8dff' }) // o el color que combine con tu header
    await StatusBar.show() // asegurate que se muestre correctamente
  }
}
