import { Component, OnInit, HostListener } from '@angular/core';
import { PretestService } from 'src/app/services/app.service';
import { freeSet } from '@coreui/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/Loading.Service';
import { PretestQuestionItemDTO } from 'src/app/dto/PretestQuestionDTO';
import { AnswerPost } from 'src/app/dto/candidate/AnswerPost';

@Component({
    selector: 'app-pretest-list',
    templateUrl: './pretest-list.component.html',
    styleUrls: ['./pretest-list.component.scss']
})

export class PretestComponent implements OnInit  {
    visible = false;
    dismissible = false;
    errorMessage: any;
    icons = freeSet;

    isCandidateAlreadyAnswer = false;
    isStartTest = false;
    skipNumber = 0;
    pretestQuestionItemDTO: PretestQuestionItemDTO = new PretestQuestionItemDTO();
    isLoading=false;
    isFinishTest = false;
    timerValue: number = 0;
    interval: any;
    answer!: string;
    answerPost: AnswerPost = new AnswerPost();
    

    constructor(
        private pretestService: PretestService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public loadingService: LoadingService
        ) { }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any): void {
        if(this.isStartTest) {
            $event.returnValue = 'Anda memiliki perubahan yang belum disimpan. Yakin ingin meninggalkan halaman ini?';
        }
    }

    ngOnInit(){
        this.checkCandidateAnswer()
    }

    checkCandidateAnswer(){
        this.isLoading=true;
        this.pretestService.getCandidateAnswer().subscribe(data => {
            this.isLoading=false;
            this.isCandidateAlreadyAnswer = data;
        }, error => {
            this.isLoading=false;
            if (error != null) {
                const code = error.status;
                if (code === 401) {
                    this.router.navigateByUrl(`login`);
                }
            }
            console.log(error);
        })
    }

    getQuestion(){
        this.pretestService.getQuestion(this.skipNumber).subscribe(data => {
            this.skipNumber++;
            if(data != null) {
                this.startTimer()
                this.pretestQuestionItemDTO = data;
            }else{
                this.isFinishTest = true;
                this.isStartTest = false;
                this.isCandidateAlreadyAnswer = true;
            }
            
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

    startTest() {
        this.isStartTest = true;
        this.getQuestion();
    }

    startTimer() {
        this.interval = setInterval(() => {
          this.timerValue++;
        }, 1000); // Timer akan bertambah setiap 1 detik
    }
    
    pauseTimer() {
        clearInterval(this.interval);
    }

    resetTimer() {
        clearInterval(this.interval); // Hentikan timer
        this.timerValue = 0; // Atur nilai timer kembali ke nol
      }

    sendAnswer(){
        if(this.answer != null || this.answer != "") {
            this.answerPost.PretestQuestionId = this.pretestQuestionItemDTO.PretestQuestionId
            this.answerPost.PretestQuestionItemId = this.pretestQuestionItemDTO.Id
            this.answerPost.Question = this.pretestQuestionItemDTO.Question
            this.answerPost.Answer = this.answer
            this.answerPost.Duration =  this.timerValue

            this.pretestService.postDataAnswer(this.answerPost).subscribe(data => {
                this.resetTimer()
                this.answer = ""
        
                this.getQuestion();
              }, error => {
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
    }

    showError(msg: string){
        this.errorMessage = msg;
        this.visible = true
        this.dismissible = true;
    }

}