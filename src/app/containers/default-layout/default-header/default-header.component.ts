import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { LOCAL_STORAGE_NAME } from 'src/app/environments/const';
import { LoadingService } from 'src/app/services/Loading.Service';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public candidateName = localStorage.getItem(LOCAL_STORAGE_NAME.CANDIDATE_NAME);

  constructor(private classToggler: ClassToggleService, public  loadingService: LoadingService) {
    super();
  }
}
