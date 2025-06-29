import { makeAutoObservable } from "mobx";
import { AuthService, type User } from "@/entities/user/api.ts";

class UserDataStore {
  public user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  private initialize = async () => {
    const data = await AuthService.getMe();
    this.user = data;
    console.log(data);
  };
}

export const userDataStore = new UserDataStore();
