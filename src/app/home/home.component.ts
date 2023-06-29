import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ChatService } from '../chat.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  userForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  apiMsgErrors: any = [];

  alertMessage: string = "";
  alertType: string = "";
  showAlert: boolean = false;

  openChat: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
    })
  }

  submitForm() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.chatService.registerUser(this.userForm.value).subscribe({
        next: (response) => {
          this.openChat = true;
          this.chatService.userName = this.userForm.get("Username")?.value;
          this.userForm.reset();
          this.submitted = false;
          console.log("Open chat:", response);
        },
        error: error => {
          if (typeof (error.error) !== 'object') {
            this.apiMsgErrors.push(error.error);
            if (error.error == "This name is taken") {
              this.showMessageAlert("This name is taken", 4);
            }
          }
        }
      })
    }
  }

  async showMessageAlert(message: string, delay: number) {
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.alertMessage = "";
      this.showAlert = false;
    }, delay * 1000);
  }

  closeChat() {
    this.openChat = false;
  }
}
