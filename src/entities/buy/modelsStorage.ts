import { makeAutoObservable } from "mobx";
import type {
  ObjectCreate,
  ObjectFullData,
} from "@/entities/buy/objectFullData.ts";
import axios from "axios";

class AllObjectsStorage {
  public allObjects: ObjectFullData[] = [
    {
      id: 1,
      user_uuid: "550e8400-e29b-41d4-a716-446655440001",
      name: 'ЖК "Солнечный"',
      description:
        "Современный жилой комплекс с развитой инфраструктурой и красивым ландшафтным дизайном",
      developer: 'ООО "СтройИнвест"',
      construction_status: "Строительство",
      address: "ул. Ленина, 15",
      district: "Центральный",
      transport_nearby: true,
      school_nearby: true,
      shops_nearby: true,
      longitude: "37.6173000",
      latitude: "55.7558000",
      floors_count: 25,
      total_apartments: 450,
      apartment_types: ["Студия", "1-комнатная", "2-комнатная", "3-комнатная"],
      amenities: [
        "Подземная парковка",
        "Фитнес-центр",
        "Детская площадка",
        "Консьерж",
      ],
      delivery_date: "2025 Q4",
      price_per_sqm: "120000.00",
      min_price: "3500000.00",
      max_price: "15000000.00",
      payment_plans: ["Ипотека 7%", "Рассрочка 0%", "Наличный расчет"],
      photos: [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
      ],
      vr_tour_url: "https://vr-tour.example.com/solnechny",
      ar_model_url: "https://ar-model.example.com/solnechny",
      cadastral_number: "77:01:0001001:1234",
      property_documents: [
        "Разрешение на строительство",
        "Проектная документация",
        "Договор долевого участия",
      ],
      created_at: "2025-06-28T17:05:49.000000Z",
      updated_at: "2025-06-28T17:05:49.000000Z",
    },
  ];
  private readonly BaseUrl: string = "https://api.nova-key.online/api";
  constructor() {
    makeAutoObservable(this);
  }

  private initData = async () => {
    try {
      const response = await axios.post(this.BaseUrl);
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
