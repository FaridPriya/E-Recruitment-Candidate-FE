import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService, EdenAiService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateDetailDTO } from 'src/app/dto/CandidteDetailDTO';
import { LoadingService } from 'src/app/services/Loading.Service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-candidate-list',
    templateUrl: './candidate-list.component.html',
    styleUrls: ['./candidate-list.component.scss']
})

export class CandidateComponent implements OnInit {
    visible = false;
    dismissible = false;
    errorMessage: any;

    candidate!:CandidateDetailDTO;
    icons = freeSet;
    file:any;
    isScreeningCv=false;
    
    constructor(
        private candidateService: CandidateService,
        private edenAiService: EdenAiService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public loadingService: LoadingService
        ) { }

    ngOnInit(){
        this.getCandidate()
    }

    getCandidate(){
        this.candidateService.getDataCandidate().subscribe(data => {
            this.candidate = data;
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

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            this.isScreeningCv = true;
        }else{
            this.isScreeningCv = false;
        }
    }

    screeningCv() {
        this.edenAiService.screeningCv(this.file).subscribe(data => {
            this.showPopupSuccess();
            this.getCandidate()
          }, error => {
            this.showPopupSuccess();
            this.getCandidate()
            console.log(error);
            if (error != null) {
                const code = error.status;
                if (code === 401) {
                    this.router.navigateByUrl(`login`);
                }
            }
            this.showError(error.error);
        })
    }

    showPopupSuccess() {
        Swal.fire({
            title: "Success upload",
            text: "",
            icon: "success"
        });
    }

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }
}