import { PropertyDetail } from "@/components/PropertyDetail.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CrmService } from "@/entities/crm/api.ts";
import { observer } from "mobx-react-lite";
import { userDataStore } from "@/entities/user/model.ts";
import { allObjectsStorage } from "@/entities/buy/modelsStorage.ts";

export const BuyerObjectInfoPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = userDataStore;
  const property = allObjectsStorage.getElementByIndex(+(id || 0));

  const [wasCreated, setWasCreated] = useState<boolean>(false);

  useEffect(() => {
    if (!user || wasCreated) {
      return;
    }
    setWasCreated(true);
    const propertyName = property?.name;
    CrmService.createCrmClient({
      name: user.name,
      phone: "Номер неизвестен",
      email: user.email,
      priority: "low",
      source: `Просмотр объекта ${propertyName}`,
    });
  }, [user]);

  return (
    <div>
      <PropertyDetail
        propertyId={id || "-1"}
        onBack={() => {
          navigate(-1);
        }}
        userType={"buyer"}
        onStartARViewer={() => {}}
      />
    </div>
  );
});
