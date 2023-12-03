import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Workshop, WorkshopService } from '../workshop.service';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAuthenticated } from '../gate/gate.guard';
import { RegisterService } from '../register.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})


export class WorkshopDetailsComponent implements OnInit {
  public static Route: Route = {
    path: 'event/:eventId',
    component: WorkshopDetailsComponent,
    title: 'Workshops',
    canActivate: [isAuthenticated],
    resolve: {}
  }

  public pid: number | undefined;
  private name: String | undefined;
  public pids$: Observable<Number[]> | undefined;
  public workshops$: Observable<Workshop[]> | undefined;
  public filled$: Observable<Object> | undefined;
  workshop$: Observable<Workshop> | undefined;
  users$: Observable<User[]> | undefined;
  private workshopID: number = 0;

  constructor(private route: ActivatedRoute, private registerService: RegisterService, private workshopService: WorkshopService, protected snackBar: MatSnackBar, protected auth: AuthenticationService, protected http: HttpClient) {
    // Get current user's pid and name
    registerService.getProfile().subscribe(profile => {
      this.pid = profile.pid!;
      this.name = profile.first_name!;

      // extract list of pids from list of users 
      this.pids$ = this.users$!
        .pipe(map((users) => users
          .map((user) => user.pid)));

    });
  }

  register(event_id: number) {
    this.registerService
      .register(event_id, this.pid!)
      .subscribe({
        next: (value) => this.onSuccess(true),
        error: (err) => this.onError(err)
      })
  }

  deregister(event_id: number) {
    this.registerService
      .deregister(event_id, this.pid!)
      .subscribe({
        next: (value) => this.onSuccess(false),
        error: (err) => this.onError(err)
      })
  }

  private onSuccess(bool: Boolean): void {
    // if bool = true, user registered; if bool = false, user deregistered; opens appropriate snackbar notification
    if (bool) {
      this.snackBar.open(`Thanks for registering ${this.name}!`, "", { duration: 2000 });
    } else {
      this.snackBar.open("Deregistered. Sorry to see you go :(", "", { duration: 2000 });
    }
    // refresh user's list of registrations
    this.pids$ = this.users$!
      .pipe(map((users) => users
        .map((user) => user.pid)));

    // refresh list of attendees displayed
    this.users$ = this.workshop$?.pipe(
      map(workshop => workshop.users)
    );
    this.filled$ = this.workshopService.getSeatsFilled(this.workshopID)
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

  ngOnInit() {
    // First get the event id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.workshopID = Number(routeParams.get('eventId'));

    // Find the workshop that correspond with the id provided in route.
    this.workshop$ = this.workshopService.getEvent(this.workshopID);

    // Get all users registered for the workshop
    this.users$ = this.workshop$.pipe(
      map(workshop => workshop.users)
    );

    this.filled$ = this.workshopService.getSeatsFilled(this.workshopID)
  }

}