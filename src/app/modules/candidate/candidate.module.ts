import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule, SpinnerModule, DropdownModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { CandidateComponent } from "./components/candidate-list.component";
import { CandidateRoutingModule } from "./candidate-routing.module";


@NgModule({
    imports: [
        CandidateRoutingModule,
        TableModule,
        CardModule,
        GridModule,
        CommonModule,
        IconModule,
        ButtonModule,
        FormModule,
        BadgeModule,
        AlertModule,
        FormsModule, 
        ReactiveFormsModule,
        SpinnerModule,
        DropdownModule
    ],
    declarations: [
        CandidateComponent
    ]
})

export class CandidateModule {
}