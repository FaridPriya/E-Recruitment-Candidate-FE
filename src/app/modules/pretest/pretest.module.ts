import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CardModule, FormModule, GridModule, TableModule, BadgeModule, AlertModule, SpinnerModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";
import { PretestComponent } from "./components/pretest-list.component";
import { PretestRoutingModule } from "./pretest-routing.module";



@NgModule({
    imports: [
        PretestRoutingModule,
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
        SpinnerModule
    ],
    declarations: [
        PretestComponent
    ]
})

export class PretestModule {
}