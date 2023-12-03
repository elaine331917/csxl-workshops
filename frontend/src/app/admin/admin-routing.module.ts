import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRoleDetailsComponent } from './roles/details/admin-role-details.component';
import { AdminRolesListComponent } from './roles/list/admin-roles-list.component';
import { AdminUsersListComponent } from './users/list/admin-users-list.component';
import { AdminWorkshopsComponent } from './workshops/admin-workshops.component';
import { EventEditComponent } from './workshops/edit/event-edit.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    AdminUsersListComponent.Route,
    AdminRolesListComponent.Route,
    AdminRoleDetailsComponent.Route,
    AdminWorkshopsComponent.Route,
    EventEditComponent.Route,
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
