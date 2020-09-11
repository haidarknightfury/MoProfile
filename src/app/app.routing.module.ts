import { RouterModule, Route, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Route[] = [
    {path: '', redirectTo: 'auth/login', pathMatch:'full'},
    { path: 'profile',  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}