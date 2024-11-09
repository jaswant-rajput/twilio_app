import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  phoneNumber: string = ''; // Input for the phone number
  callStatus: string = 'Ready to call';

  constructor(private http: HttpClient) {}

  // Send phone number to Node.js backend to make a call
  makeCall() {
    if (this.phoneNumber) {
      const apiUrl = 'https://server-steel-nine-73.vercel.app/call';
      this.http
        .post(apiUrl, { to: this.phoneNumber }) // Send the phone number in the request body
        .subscribe(
          (response) => {
            this.callStatus = 'Calling...';
            console.log('Call initiated:', response);
          },
          (error) => {
            this.callStatus = 'Error initiating call';
            console.error('Error:', error);
          }
        );
    } else {
      alert('Please enter a phone number');
    }
  }
}
