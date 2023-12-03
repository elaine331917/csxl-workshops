import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Workshop, WorkshopService } from '../workshop.service';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAuthenticated } from '../gate/gate.guard';
import { RegisterService } from '../register.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../user';
import { Profile } from '../profile/profile.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})

export class WorkshopsComponent implements OnInit {
  public static Route: Route = {
    path: 'event',
    component: WorkshopsComponent,
    title: 'Workshops',
    canActivate: [isAuthenticated],
    resolve: {}
  }

  public pid: number | undefined;
  public profile$: Observable<Profile> | undefined = this.registerService.getProfile();
  private name: String | undefined;
  public workshops$: Observable<Workshop[]> | undefined;
  public registeredWorkshops$: Observable<Workshop[]> | undefined;
  public registeredWorkshopIds$: Observable<number[]> | undefined = undefined;

  public userDetails$: Observable<UserDetails> | undefined;

  constructor(route: ActivatedRoute,
    private registerService: RegisterService,
    private workshopService: WorkshopService,
    protected snackBar: MatSnackBar,
    protected auth: AuthenticationService,
    protected http: HttpClient,
  ) {
    this.registerService = registerService;
    // Get all workshops
    this.workshops$ = workshopService.getAllEvents();

    // Get current user's pid and name
    registerService.getProfile().subscribe(profile => {
      this.pid = profile.pid!;
      this.name = profile.first_name!;

      // Get user details
      this.userDetails$ = registerService.getUserDetails(this.pid!);
      // Get list of workshops user is registered for 
      this.registeredWorkshops$ = this.userDetails$.pipe(map((user) => user.events))
      // Get ids of registered workshops
      this.registeredWorkshopIds$ = this.userDetails$
        .pipe(map((user) => user.events.map((workshop) => workshop.id)));
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
    if (bool) {
      this.snackBar.open(`Thanks for registering ${this.name}!`, "", { duration: 2000 });
    } else {
      this.snackBar.open("Deregistered. Sorry to see you go :(", "", { duration: 2000 });
    }

    // Refresh the data to reflect registration changes
    this.userDetails$ = this.registerService.getUserDetails(this.pid!);
    this.registeredWorkshopIds$ = this.userDetails$
      .pipe(map((user) => user.events.map((workshop) => workshop.id)));
  }

  private onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

  ngOnInit(): void {

  }

}
