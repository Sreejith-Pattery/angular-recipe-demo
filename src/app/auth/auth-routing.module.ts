import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes:Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
]

@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule{

}