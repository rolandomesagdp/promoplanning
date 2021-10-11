import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PpUser } from "@pp-core/auth/user/user.model";

export class LoginFormComponentSpecSetup {
    createLoginForm(): FormGroup {
        return new FormGroup({
            userID: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
          });
    }

    createPpUser(): PpUser {
        return {
            userId: 1,
            userName: "someUserName",
            email: "some@email.com",
            firstName: "someFirstName",
            lastName: "someLastName",
            avatarUrl: "",
            isAdmin: true
        }
    }

    createLoginError(): any {
        return {
            message: "Dummy message"
        }
    }
}