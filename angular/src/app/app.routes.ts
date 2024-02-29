import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/homepage/homepage.component').then((x) => x.HomepageComponent),
        title: 'Accueil'
    },
    { path: '**', redirectTo: '' }
];
