import { Injectable } from '@angular/core';
import { CurrentPrincipal } from '@pp-core/auth/user/current-principal.model';
import { UserModelFactory } from '@pp-core/auth/user/user-model.factory';
import { PpUser } from '@pp-core/auth/user/user.model';
import { ConfigSettings } from '@pp-core/settings/config-settings.model';

@Injectable()
export class LocalStorageService {

  constructor() { }

  addCurrentPrincipal(user: CurrentPrincipal): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): PpUser {
    try {
      let currentPrincipal: CurrentPrincipal = JSON.parse(localStorage.getItem("user"));
      return new UserModelFactory().create(currentPrincipal);
    }
    catch {
      this.clear("user");
      return null;
    }
  }

  addSettings(configSettings: ConfigSettings): void {
    localStorage.setItem("configSettings", JSON.stringify(configSettings));
  }

  getSettings(): ConfigSettings {
    try {
      return JSON.parse(localStorage.getItem("configSettings"));
    }
    catch {
      this.clear("configSettings");
      return null;
    }    
  }

  clear(itemName: string): void {
    localStorage.removeItem(itemName);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
