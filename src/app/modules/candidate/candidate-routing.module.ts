import { CandidateComponent } from "./components/candidate-list.component";
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";


const routes: Routes = [
    {
      path: '',
      component: CandidateComponent,
      data: {
        title: 'Candidate'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CandidateRoutingModule {
}