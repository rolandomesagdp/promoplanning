import { CurrentPrincipal } from "./current-principal.model";
import { PpUser } from "./user.model";

export class UserModelFactory {
    create(currentPrincipal: CurrentPrincipal): PpUser | null {
        if(currentPrincipal) {
            return {
                userId: currentPrincipal.userId,
                userName: currentPrincipal.userName,
                email: currentPrincipal.email,
                firstName: currentPrincipal.firstName,
                lastName: currentPrincipal.lastName,
                avatarUrl: "",
                isAdmin: currentPrincipal.admin
              }
        }
        else
            return null;
    }
}