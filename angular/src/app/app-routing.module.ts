import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        title: 'Liste des utilisateurs',
        loadChildren: () => import('./components/user/user.module').then((m) => m.UserModule),
      },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      scrollOffset: [0, 0],
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
