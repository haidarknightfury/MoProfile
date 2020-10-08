import { ProfileResolver } from './resolvers/profile.resolver';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

export const profileRoute: Route[] = [
  { path: '', component: ProfileContentComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(profileRoute)],
  exports: [RouterModule],
})
export class ProfileRouting {}
