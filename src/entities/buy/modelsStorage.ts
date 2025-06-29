import { makeAutoObservable } from "mobx";
import type {
  ObjectCreate,
  ObjectFullData,
} from "@/entities/buy/objectFullData.ts";
import axios from "axios";

class AllObjectsStorage {
  public allObjects: ObjectFullData[] = [];
  private readonly BaseUrl: string = "https://api.nova-key.online/api";
  constructor() {
    makeAutoObservable(this);
    this.initData();
  }

  private initData = async () => {
    try {
      const response = await axios.get(this.BaseUrl + "/residential-complexes");
      console.log("INIT", response.data);
      this.allObjects = response.data.data;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  public addObject = async (data: ObjectCreate) => {
    try {
      const response = await axios.post(
        `${this.BaseUrl}/residential-complexes`,
        data,
      );
      console.log(response.data);
    } catch (e: unknown) {
      console.log(e);
      return;
    }
  };

  public getElementByIndex = (id: number) => {
    const index = this.allObjects.findIndex((element) => element.id === id);
    if (index === -1) {
      return null;
    }
    return this.allObjects[index];
  };
}

export const allObjectsStorage = new AllObjectsStorage();
