import { useSearchParams } from "react-router-dom";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";

export const ArPage = () => {
  const [searchParams] = useSearchParams();
  const arModelUrl = searchParams.get("url");

  if (!arModelUrl) {
    return <div>Ошибка при получении модели</div>;
  }

  return (
    <div className={"h-full p-6"}>
      <BuyerHeader
        hideOnMobile={true}
        title={"AR-просмотр апартаментов"}
        description={"Здесь вы можете посмотреть квартиру, не выходя из дома"}
      />
      <iframe
        src={arModelUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        allow="vr"
      ></iframe>
    </div>
  );
};
