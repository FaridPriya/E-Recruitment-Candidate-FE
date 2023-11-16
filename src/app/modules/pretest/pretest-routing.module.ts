import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { PretestComponent } from './components/pretest-list.component';



const routes: Routes = [
    {
      path: '',
      component: PretestComponent,
      data: {
        title: 'Pre-test'
      }
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PretestRoutingModule {
}