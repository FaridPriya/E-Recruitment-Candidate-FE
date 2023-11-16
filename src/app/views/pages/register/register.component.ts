import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_VALIDATION } from 'src/app/dto/Constanta';
import { JobVacancyDTO } from 'src/app/dto/JobVacancyDTO';
import { RegisterPost } from 'src/app/dto/candidate/RegisterPost';
import { AccountService, JobVacancyService } from 'src/app/services/app.service';
import { LoadingService } from 'src/app/services/Loading.Service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  attachedForm!: FormGroup;
  visible = false;
  dismissible = false;
  errorMessage: any;

  formValidationType = FORM_VALIDATION;

  listJob:JobVacancyDTO[] = [];
  selectedJob!: string;
  registerPost: RegisterPost = new RegisterPost();

  fieldTextType = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private jobVacancyService: JobVacancyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService
  ) { }

  formValidation(){
    return FORM_VALIDATION;
  }

  ngOnInit(): void {
      this.getJobVacancy()
      this.setupForm()
  }

  getJobVacancy() {
    this.jobVacancyService.getActiveJob().subscribe(data => {
        this.listJob = data;
    }, error => {
        if (error != null) {
            const code = error.status;
            if (code === 401) {
                this.router.navigateByUrl(`login`);
            }
        }
        console.log(error);
    })
  }

  setupForm() {
    // Set form to default values
    this.attachedForm = this.fb.group({
      Name: ['', [Validators.required]],
      JobId:['',[Validators.required]],
      Phone:['',[Validators.required, Validators.pattern(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/)]],
      Email:['',[Validators.required, Validators.email]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  getFormControl(name: string) {
    return this.attachedForm.get(name);
  }

  _submitForm() {
    for (const i of Object.keys(this.attachedForm.controls)) {
      this.attachedForm.get(i)!.markAsDirty();
    }
  }

  generateDataSend() {
    this.registerPost.Name = this.attachedForm.value.Name;
    this.registerPost.Email = this.attachedForm.value.Email;
    this.registerPost.NoHandphone = this.attachedForm.value.Phone;
    this.registerPost.IdJobVacancy = this.selectedJob;
    this.registerPost.Username = this.attachedForm.value.Username;
    this.registerPost.Password = this.attachedForm.value.Password;
  }

  save(){
    this._submitForm();
    if (this.attachedForm.valid) {
        this.generateDataSend();
        this.accountService.register(this.registerPost).subscribe(data => {
          this.router.navigate([''], { relativeTo: this.activatedRoute });
          }, error => {
            this.showError(error.error);
        })
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  showError(msg: string){
    this.errorMessage = msg;
    this.visible = true
    this.dismissible = true;
  }

}
