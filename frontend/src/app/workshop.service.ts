import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from './user';


export interface Workshop {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  capacity: number;
  host_name: string;
  host_email: string;
  users: User[]
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  url = '/api/event'
  adminurl = '/api/admin/events'

  workshops: Workshop[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getEvent(eventId: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.url}/details/${eventId}`)
  }

  getAllEvents(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.url}`)
  }

  // takes in all the properties of a workshop and uses a post request to add the workshop object in the backend.
  // will raise errors for the following conditions:
  // empty field
  // incorrect date format
  // incorrect time format
  addEvent(id: number, name: string, description: string, date: string, time: string, host_name: string, host_email: string, capacity: number): Observable<Workshop> {
    let errors: string[] = [];

    if (id.toString().length < 1) {
      errors.push(`Invalid PID: ${id}`);
    }

    if (name === "") {
      errors.push(`Event name required.`);
    }

    if (description === "") {
      errors.push(`Event description required.`)
    }

    if (date === "") {
      errors.push(`Event date required.`)
    } else {
      var re = /^(1[0-2]|0?[1-9])[\/](3[01]|[12][0-9]|0?[1-9])[\/](?:[0-9]{2})?[0-9]{2}$/;
      if (re.test(date)) {
        console.log("this is a valid date")
      } else {
        errors.push('Invalid date format')
      }

    }

    if (time === "") {
      errors.push ('Event time required.')
    } else {
      var re = /^([1-9]|0[1-9]|1[0-2]):[0-5][0-9]([AaPp][Mm])$/
      if (re.test(time)) {
        console.log("this is a valid time")
      } else {
        errors.push('Invalid time format')
      }
    }

    if (host_name === "") {
      errors.push(`Host name required.`);
    }

    if (host_email === "") {
      errors.push(`Host email required.`);
    } else {
      var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (re.test(host_email)) {
        console.log("this is a valid host email")
      } else {
        errors.push('Invalid email format')
      }
    }

    if (!(capacity >= 1)) {
      errors.push('Capacity must be a positive number.')
    }

    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }
    
    let users: User[] = [];
    let workshop: Workshop = {id, name, description, date, time, host_name, host_email, capacity, users};
    return this.http.post<Workshop>("/api/admin/events", workshop);
  }

  // takes in all the properties of a workshop and uses a put request to update the workshop object in the backend.
  // will raise errors if any field is left blank or if the capacity is a non-positive number
  updateEvent(id: number, name: string, description: string, date: string, time: string, host_name: string, host_email: string, capacity: number): Observable<Workshop> {
    let errors: string[] = [];

    if (name === "") {
      errors.push(`Event name required.`);
    }

    if (description === "") {
      errors.push(`Event description required.`)
    }

    if (date === "") {
      errors.push(`Event date required.`)
    } else {
      var re = /^(1[0-2]|0?[1-9])[\/](3[01]|[12][0-9]|0?[1-9])[\/](?:[0-9]{2})?[0-9]{2}$/;
      if (re.test(date)) {
        console.log("this is a valid date")
      } else {
        errors.push('Invalid date format')
      }
    }

    if (time === "") {
      errors.push ('Event time required.')
    } else {
      var re = /^([1-9]|0[1-9]|1[0-2]):[0-5][0-9]([AaPp][Mm])$/
      if (re.test(time)) {
        console.log("this is a valid time")
      } else {
        errors.push('Invalid time format')
      }
    }

    if (host_name === "") {
      errors.push(`Host name required.`);
    }

    if (host_email === "") {
      errors.push(`Host email required.`);
    } else {
      var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (re.test(host_email)) {
        console.log("this is a valid host email")
      } else {
        errors.push('Invalid email format')
      }
    }

    if (!(capacity >= 1)) {
      errors.push('Capacity must be a positive number.')
    }

    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }
    let users: User[] = [];

    let workshop: Workshop = {id, name, description, date, time, host_name, host_email, capacity, users};
    return this.http.put<Workshop>("/api/admin/events", workshop);
  }

  // takes in the id of a workshop and uses a delete request to delete the event from the database
  deleteEvent(id: number) {
    return this.http.delete(`${this.adminurl}/${id}`)
  }

  // takes in the id of a workshop and uses a get request to obtain the number of seats filled
  getSeatsFilled(id: number): Observable<Object> {
    return this.http.get(`/api/event/filled/${id}?event_id=${id}`)
  }

  // takes in the id of a workshop and uses a get request to obtain the number of seats remaining
  getSeatsRemaining(id: number): Observable<Object> {
    return this.http.get(`/api/event/openings/${id}?event_id=${id}`)
  }
}