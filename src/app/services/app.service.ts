import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { LOCAL_STORAGE_NAME } from '../environments/const';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppInterceptor } from './app.interceptor';
import { Router } from '@angular/router';
import { AnswerPost } from '../dto/candidate/AnswerPost';


export abstract class AbstractMasterRestService {
    constructor(
        protected http: HttpClient,
        public actionUrl: string) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'AllowSpecificOrigin',
            'Access-Control-Allow-Credentials': 'true',
            'Authorization':  `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
        })
    };

    httpOptionsUpload = {
        headers: new HttpHeaders({
            'Authorization':  `bearer ` + localStorage.getItem(LOCAL_STORAGE_NAME.ACCESS_TOKEN)
        })
    };
}


/** ***************************************************************************
* ACCOUNT SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class AccountService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Account');
    }

    login(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl + '/login-candidate', body, this.httpOptions);
    }

    register(data: any): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl + '/register-candidate', body, this.httpOptions);
    }
}


/** ***************************************************************************
* JOB VACANCY SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class JobVacancyService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'JobVacancy');
    }

    getActiveJob(): Observable<any> {
        return this.http.get<any>(this.actionUrl+'/ActiveJob', this.httpOptions);
    }
}

/** ***************************************************************************
* Candidate SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class CandidateService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Candidate');
    }

    getDataCandidate(): Observable<any> {
        return this.http.get<any>(this.actionUrl+'/GetByCandidate', this.httpOptions);
    }
}

/** ***************************************************************************
* EDEN AI SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class EdenAiService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'EdenAi');
    }

    screeningCv(data: any): Observable<any> {
        const formData = new FormData();
        formData.append('pdfFile', data);
        return this.http.post<any>(`${this.actionUrl}/ScreeningCV/${null}`, formData, this.httpOptionsUpload);
    }
}

/** ***************************************************************************
* PRETEST SERVICE
******************************************************************************/
@Injectable({
    providedIn: 'root'
})
export class PretestService extends AbstractMasterRestService {
    constructor(http: HttpClient) {
        super(http, environment.Url + 'Pretest');
    }

    getCandidateAnswer(): Observable<any> {
        return this.http.get<any>(this.actionUrl+'/IsCandidateAnswer', this.httpOptions);
    }

    getQuestion(skip:number): Observable<any> {
        return this.http.get<any>(this.actionUrl+`/PretestItems?skip=${skip}`, this.httpOptions);
    }

    postDataAnswer(data: AnswerPost): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post<any>(this.actionUrl+'/Pretestanswer', body, this.httpOptions);
    }
}