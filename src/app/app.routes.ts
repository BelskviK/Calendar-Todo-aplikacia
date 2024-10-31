import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () =>
      import('./components/create/create.component').then(
        (c) => c.CreateComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/edit/edit.component').then((c) => c.EditComponent),
  },
  {
    path: '**', // Wildcard route for a 404 page or fallback component
    redirectTo: 'create', // or specify a dedicated NotFoundComponent
  },
];
