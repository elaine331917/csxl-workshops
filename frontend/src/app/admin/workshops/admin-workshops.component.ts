import { Component } from '@angular/core';
import { Profile, ProfileService } from 'src/app/profile/profile.service';
import { permissionGuard } from 'src/app/permission.guard';
import { Observable } from 'rxjs';
import { Workshop, WorkshopService } from '../../workshop.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAdminService } from 'src/app/admin/users/user-admin.service';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-admin-workshops',
  templateUrl: './admin-workshops.component.html',
  styleUrls: ['./admin-workshops.component.css']
})
export class AdminWorkshopsComponent {
  public static Route = {
    path: 'events',
    component: AdminWorkshopsComponent,
    title: 'Workshops Administration',
    canActivate: [permissionGuard('user.list', 'user/')],
    resolve: {}
  }

  public profile$: Observable<Profile | undefined>;
  public workshops$: Observable<Workshop[]> | undefined;

  form = this.formBuilder.group({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, Validators.pattern('^(1[0-2]|0?[1-9])/(3[01]|[12][0-9]|0?[1-9])/(?:[0-9]{2})?[0-9]{2}$')]),
    time: new FormControl('', [Validators.required, Validators.pattern('^([1-9]|0[1-9]|1[0-2]):[0-5][0-9]([AaPp][Mm])$')]),
    host_name: new FormControl('', Validators.required),
    host_email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    capacity: new FormControl('', Validators.required)
  });

  get registerFormControl() {
    return this.form.controls;
  }

  user$: Observable<User> = this.userService.getUser();

  constructor(public profileService: ProfileService, private workshopService: WorkshopService, private formBuilder: FormBuilder, private userService: UserService) {
    this.profile$ = profileService.profile$;
    this.workshops$ = workshopService.getAllEvents();
  }  

  onSubmit(): void {
    let form = this.form.value;
    let id = parseInt(form.id ?? "");
    let name = form.name ?? "";
    let description = form.description ?? "";
    let date = form.date ?? "";
    let time = form.time ?? "";
    let host_name = form.host_name ?? "";
    let host_email = form.host_email ?? "";
    let capacity = parseInt(form.capacity ?? "");

    this.workshopService
      .addEvent(id, name, description, date, time, host_name, host_email, capacity)
      .subscribe({
        next: (workshop) => this.onSuccess(workshop),
        error: (err) => this.onError(err)
      });
  }

  private onSuccess(workshop: Workshop): void {
    window.alert(`You have successfully added the following workshop: ${workshop.name}`);
    location.reload();
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

  deleteEvent(id: number):void {
    this.workshopService.deleteEvent(id).subscribe((result) => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser()
  }
}
