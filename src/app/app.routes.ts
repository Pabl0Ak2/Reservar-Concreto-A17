import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./components/calendario/calendario.component'),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
