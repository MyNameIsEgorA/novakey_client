import { ViewingCalendar } from "@/components/ViewingCalendar.tsx";
import { useNavigate } from "react-router-dom";
import { DeveloperHeader } from "@/pages/developer/main/header.tsx";

export const CalendarPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <DeveloperHeader
        hideOnMobile={true}
        title={"Календарь показов"}
        description={"Планирование показов"}
      />
      <ViewingCalendar
        onBack={() => {
          navigate(-1);
        }}
      />
    </>
  );
};
