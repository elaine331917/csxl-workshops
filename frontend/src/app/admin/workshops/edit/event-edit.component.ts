import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { permissionGuard } from 'src/app/permission.guard';
import { Workshop, WorkshopService } from 'src/app/workshop.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit{
  public static Route: Route = {
    path: 'admin/events/edit/:eventId',
    component: EventEditComponent, 
    title: 'Events', 
    canActivate: [isAuthenticated],
    resolve: {}
  }

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

  workshop$: Observable<Workshop> | undefined;

  constructor(private route: ActivatedRoute, private workshopService: WorkshopService, private formBuilder: FormBuilder) {
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

    // This will pass the updated event information that was input to the form to the workshop service which
    // uses a put request to update the info in the backend.
    // Notes: any number of parameters can be changed, event id is readonly (cannot be changed)
    this.workshopService
      .updateEvent(id, name, description, date, time, host_name, host_email, capacity)
      .subscribe({
        next: (workshop) => this.onSuccess(workshop),
        error: (err) => this.onError(err)
      });
  }

  onSuccess(workshop: Workshop): void {
    window.alert(`You have successfully added the following workshop: ${workshop.name}`);
    this.form.reset();
  }

  onError(err: any): void {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eventIdFromRoute = Number(routeParams.get('eventId'));

    // Find the workshop that correspond with the id provided in route.
    this.workshop$ = this.workshopService.getEvent(eventIdFromRoute);
  }
  

}
