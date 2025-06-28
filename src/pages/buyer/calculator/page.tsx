import { MortgageCalculator } from "@/components/MortgageCalculator.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BuyerHeader } from "@/pages/buyer/main/header.tsx";

export const CalculatorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const price = searchParams.get("price");

  return (
    <div>
      <BuyerHeader
        description={"Рассчитайте ежемесячный платеж по ипотеке"}
        title={"Калькулятор ипотеки"}
        hideOnMobile={true}
      />
      <MortgageCalculator
        onBack={() => navigate(-1)}
        propertyPrice={price ? +price : undefined}
      />
    </div>
  );
};
