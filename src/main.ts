import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Importa Firebase
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';
import { getAuth } from "firebase/auth";

// Inicializa Firebase
initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const app = initializeApp(environment.firebaseConfig);
export const auth = getAuth(app);