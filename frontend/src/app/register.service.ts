import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './profile/profile.service';
import { Workshop } from './workshop.service';
import { UserDetails } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // defining common api route
  api = "/api/event/"

  // getting current user information
  getProfile() {
    return this.http.get<Profile>('/api/profile')
  }

  register(event_id: number, pid: number): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.api}register/${event_id}/${pid}`,
    {
      "event_id": event_id,
      "pid": pid
    })
  }

  deregister(event_id: number, pid: number) {
    return this.http.delete<Boolean>(`${this.api}deregister/${event_id}/${pid}`)
  }

  // given the user's pid, get list of events that user has registered for
  getRegistrations(pid: number) {
    return this.http.get<Workshop[]>(`${this.api}registrations/${pid}`)
  }

  getUserDetails(pid: number) {
    return this.http.get<UserDetails>(`/api/user/details/${pid}`)
  }

}
