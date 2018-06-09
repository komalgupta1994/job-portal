import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { PublicComponent } from './public/public.component';
import {RecruiterComponent} from './recruiter/recruiter.component';
import {ContractorComponent} from './contractor/contractor.component';


const appRoutes: Routes =


[{

    "path": "public",
    "component": PublicComponent,
    "loadChildren": "./public/public.module#PublicModule"
},{

    "path": "recruiter",
    "component": RecruiterComponent,
    "loadChildren": "./recruiter/recruiter.module#RecruiterModule"
},{

    "path": "contractor",
    "component": ContractorComponent,
    "loadChildren": "./contractor/contractor.module#ContractorModule"
},{

    "path": "",
    'redirectTo': '/public',
    'pathMatch': 'full'
}]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes , { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {


}