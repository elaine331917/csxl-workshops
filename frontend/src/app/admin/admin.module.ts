import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AdminUsersListComponent } from './users/list/admin-users-list.component';
import { AdminRolesListComponent } from './roles/list/admin-roles-list.component';
import { AdminRoleDetailsComponent } from './roles/details/admin-role-details.component';
import { AdminWorkshopsComponent } from './workshops/admin-workshops.component';
import { EventEditComponent } from './workshops/edit/event-edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUsersListComponent,
    AdminRolesListComponent,
    AdminRoleDetailsComponent,
    AdminWorkshopsComponent,
    EventEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatListModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class AdminModule { }