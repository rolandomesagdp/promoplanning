import { CurrentPrincipal } from "@pp-core/auth/user/current-principal.model"
import { UserType } from "@pp-core/auth/user/user-type.enum"
import { PpUser } from "@pp-core/auth/user/user.model"
import { ConfigSettings } from "@pp-core/settings/config-settings.model"

export class LocalStorageSpecSetup {
    createCurrentPrincipal(): CurrentPrincipal {
        return {
            userId: 20,
            userName: "jasmineTestName",
            email: "jasmine@test.com",
            firstName: "",
            lastName: "",
            disabledPermissions: [],
            clientDisabledPermissions: "",
            disabledAttributes: [],
            userGroups: ["DSP1", "DSP13", "DSP16", "DSP17", "DSP22", "DSP27"],
            blacklistStatusIds: [],
            admin: true,
            userType: UserType.planner,
            auth: {token: "no token when using cookies", uuid: "no uui when using cookies"}
        }
    }

    createConfigSettings(): ConfigSettings {
        return {
            displaySellDate: 1,
            idleTime: 60000,
            isWeeklyDetail: false,
            lockRefreshTime: 5000,
            logLevel: 1,
            maxFutureMonths: 1,
            maxPastMonths: 1,
            promoSellDate: 1
        }
    }

    createPpUserFromCurrentPrincipal(currentPrincipal: CurrentPrincipal): PpUser {
        return {
            userId: currentPrincipal.userId,
            userName: currentPrincipal.userName,
            email: currentPrincipal.email,
            firstName: currentPrincipal.firstName,
            lastName: currentPrincipal.lastName,
            avatarUrl: "",
            isAdmin: true
        }
    }
}