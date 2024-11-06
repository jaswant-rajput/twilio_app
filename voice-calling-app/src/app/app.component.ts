import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '@twilio/voice-sdk';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  device: Device | undefined;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const tokenResponse = await this.http.get<{ token: string }>('http://localhost:3000/token').toPromise();
    if (!tokenResponse) return;
    this.device = new Device(tokenResponse['token']);

    this.device.on('incoming', (call) => {
      // Handle incoming call
      call.accept();
    });

    this.device.on('ready', () => console.log('Twilio Device Ready'));
  }

  async makeCall() {
    if (!this.device) return;

    const params = {
      To: '+RECIPIENT_PHONE_NUMBER',
    };

    const call = await this.device.connect({ params });
    call.on('disconnect', () => console.log('Call disconnected'));
  }

  hangupCall() {
    if (this.device) {
      this.device.disconnectAll();
    }
  }
}
