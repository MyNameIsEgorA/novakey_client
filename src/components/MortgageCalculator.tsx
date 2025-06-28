import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calculator,
  Percent,
  Calendar,
  DollarSign,
  TrendingUp,
  Building,
  CreditCard,
  Info,
} from "lucide-react";

interface MortgageCalculatorProps {
  onBack: () => void;
  propertyPrice?: number;
}

interface BankOffer {
  id: string;
  name: string;
  logo: string;
  rate: number;
  minDownPayment: number;
  maxTerm: number;
  features: string[];
  color: string;
}

const bankOffers: BankOffer[] = [
  {
    id: "tbank",
    name: "Т-Банк",
    logo: "💳",
    rate: 16.9,
    minDownPayment: 15,
    maxTerm: 30,
    features: ["Одобрение за 2 минуты", "Без справок", "Онлайн-заявка"],
    color: "from-yellow-50 to-yellow-100 border-yellow-200",
  },
  {
    id: "sber",
    name: "Сбербанк",
    logo: "🏦",
    rate: 17.5,
    minDownPayment: 20,
    maxTerm: 30,
    features: ["Господдержка", "Льготные программы", "Материнский капитал"],
    color: "from-green-50 to-green-100 border-green-200",
  },
  {
    id: "vtb",
    name: "ВТБ",
    logo: "🏛️",
    rate: 17.2,
    minDownPayment: 10,
    maxTerm: 25,
    features: ["Быстрое одобрение", "Без комиссий", "Рефинансирование"],
    color: "from-blue-50 to-blue-100 border-blue-200",
  },
  {
    id: "alpha",
    name: "Альфа-Банк",
    logo: "🔴",
    rate: 16.5,
    minDownPayment: 15,
    maxTerm: 30,
    features: ["Кэшбэк 1%", "Снижение ставки", "Страхование в подарок"],
    color: "from-red-50 to-red-100 border-red-200",
  },
];

export function MortgageCalculator({
  onBack,
  propertyPrice = 8500000,
}: MortgageCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2); // 20% by default
  const [interestRate, setInterestRate] = useState(16.9);
  const [loanTerm, setLoanTerm] = useState(20);
  const [selectedBank, setSelectedBank] = useState("tbank");

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Calculate mortgage
  useEffect(() => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const monthlyPaymentCalc =
        (principal *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalPaymentCalc = monthlyPaymentCalc * numberOfPayments;
      const totalInterestCalc = totalPaymentCalc - principal;

      setMonthlyPayment(monthlyPaymentCalc);
      setTotalPayment(totalPaymentCalc + downPayment);
      setTotalInterest(totalInterestCalc);
    }
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    const bank = bankOffers.find((b) => b.id === bankId);
    if (bank) {
      setInterestRate(bank.rate);
      // Update down payment to minimum if current is less
      const minDown = loanAmount * (bank.minDownPayment / 100);
      if (downPayment < minDown) {
        setDownPayment(minDown);
      }
    }
  };

  const downPaymentPercentage = (downPayment / loanAmount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Mobile Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={onBack}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg">Калькулятор ипотеки</h1>
                  <p className="text-sm text-gray-500">
                    Рассчет ежемесячного платежа
                  </p>
                </div>
              </div>
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Mobile Content */}
          <div className="px-6 py-6 pb-20">
            {/* Bank Selection */}
            <div className="mb-6">
              <h3 className="text-black mb-4">Выберите банк</h3>
              <div className="grid grid-cols-2 gap-3">
                {bankOffers.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedBank === bank.id
                        ? `bg-gradient-to-r ${bank.color} border-opacity-50`
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{bank.logo}</span>
                      <span className="text-black text-sm">{bank.name}</span>
                    </div>
                    <div className="text-xs text-gray-600">от {bank.rate}%</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Form */}
            <div className="space-y-6">
              {/* Property Price */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-blue-600 mr-2" />
                  <label className="text-black">Стоимость недвижимости</label>
                </div>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                />
                <p className="text-gray-500 text-sm mt-2">
                  {loanAmount.toLocaleString()} ₽
                </p>
              </div>

              {/* Down Payment */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  <label className="text-black">Первоначальный взнос</label>
                </div>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-sm">
                    {downPayment.toLocaleString()} ₽
                  </p>
                  <p className="text-green-600 text-sm">
                    {downPaymentPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center mb-3">
                  <Percent className="w-5 h-5 text-amber-600 mr-2" />
                  <label className="text-black">Процентная ставка</label>
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                />
                <p className="text-gray-500 text-sm mt-2">
                  {interestRate}% годовых
                </p>
              </div>

              {/* Loan Term */}
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-slate-600 mr-2" />
                  <label className="text-black">Срок кредита</label>
                </div>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                />
                <p className="text-gray-500 text-sm mt-2">{loanTerm} лет</p>
              </div>
            </div>

            {/* Results */}
            <div className="mt-8">
              <h3 className="text-black mb-4">Результат расчета</h3>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-4">
                <div className="text-center">
                  <p className="text-blue-100 text-sm mb-1">
                    Ежемесячный платеж
                  </p>
                  <p className="text-3xl mb-2">
                    {monthlyPayment.toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    ₽
                  </p>
                  <p className="text-blue-100 text-sm">
                    по ипотеке{" "}
                    {selectedBank === "tbank"
                      ? "Т-Банк"
                      : bankOffers.find((b) => b.id === selectedBank)?.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                  <p className="text-gray-500 text-sm mb-1">Переплата</p>
                  <p className="text-red-600 text-lg">
                    {totalInterest.toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    ₽
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                  <p className="text-gray-500 text-sm mb-1">Общая сумма</p>
                  <p className="text-black text-lg">
                    {totalPayment.toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    ₽
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Features */}
            {selectedBank && (
              <div className="mt-6">
                <h3 className="text-black mb-3">
                  Преимущества{" "}
                  {bankOffers.find((b) => b.id === selectedBank)?.name}
                </h3>
                <div className="space-y-2">
                  {bankOffers
                    .find((b) => b.id === selectedBank)
                    ?.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white rounded-lg p-3 shadow-sm border"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-slate-600 to-stone-600 text-white py-4 rounded-xl hover:from-slate-700 hover:to-stone-700 transition-all">
                Подать заявку в{" "}
                {bankOffers.find((b) => b.id === selectedBank)?.name}
              </button>
              <p className="text-gray-500 text-xs text-center mt-2">
                Предварительный расчет. Окончательные условия определяет банк.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto p-8">
          {/* Desktop Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-3 hover:bg-white/20 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl text-black">Калькулятор ипотеки</h1>
                <p className="text-gray-500">
                  Рассчитайте ежемесячный платеж и переплату
                </p>
              </div>
            </div>
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Form */}
            <div className="col-span-7">
              {/* Bank Selection */}
              <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
                <h3 className="text-xl text-black mb-6">Выберите банк</h3>
                <div className="grid grid-cols-2 gap-4">
                  {bankOffers.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank.id)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        selectedBank === bank.id
                          ? `bg-gradient-to-r ${bank.color} border-opacity-50`
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">{bank.logo}</span>
                        <div>
                          <div className="text-black">{bank.name}</div>
                          <div className="text-sm text-gray-600">
                            от {bank.rate}% годовых
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Мин. взнос {bank.minDownPayment}% • До {bank.maxTerm}{" "}
                        лет
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Form */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-xl text-black mb-6">Параметры кредита</h3>

                <div className="grid grid-cols-2 gap-6">
                  {/* Property Price */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Building className="w-5 h-5 text-blue-600 mr-2" />
                      <label className="text-black">
                        Стоимость недвижимости
                      </label>
                    </div>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      {loanAmount.toLocaleString()} ₽
                    </p>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <div className="flex items-center mb-3">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <label className="text-black">Первоначальный взнос</label>
                    </div>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-500 text-sm">
                        {downPayment.toLocaleString()} ₽
                      </p>
                      <p className="text-green-600 text-sm">
                        {downPaymentPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Percent className="w-5 h-5 text-amber-600 mr-2" />
                      <label className="text-black">Процентная ставка</label>
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      {interestRate}% годовых
                    </p>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Calendar className="w-5 h-5 text-slate-600 mr-2" />
                      <label className="text-black">Срок кредита</label>
                    </div>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 text-black text-lg"
                    />
                    <p className="text-gray-500 text-sm mt-2">{loanTerm} лет</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="col-span-5">
              {/* Main Result */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white mb-6 shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <CreditCard className="w-6 h-6 mr-2" />
                    <p className="text-blue-100">Ежемесячный платеж</p>
                  </div>
                  <p className="text-4xl mb-3">
                    {monthlyPayment.toLocaleString("ru-RU", {
                      maximumFractionDigits: 0,
                    })}{" "}
                    ₽
                  </p>
                  <p className="text-blue-100">
                    по ипотеке{" "}
                    {bankOffers.find((b) => b.id === selectedBank)?.name}
                  </p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Переплата по кредиту</p>
                      <p className="text-2xl text-red-600">
                        {totalInterest.toLocaleString("ru-RU", {
                          maximumFractionDigits: 0,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Общая сумма выплат</p>
                      <p className="text-2xl text-black">
                        {totalPayment.toLocaleString("ru-RU", {
                          maximumFractionDigits: 0,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <Calculator className="w-8 h-8 text-gray-500" />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 mb-1">Сумма кредита</p>
                      <p className="text-2xl text-slate-600">
                        {(loanAmount - downPayment).toLocaleString("ru-RU", {
                          maximumFractionDigits: 0,
                        })}{" "}
                        ₽
                      </p>
                    </div>
                    <Building className="w-8 h-8 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Bank Features */}
              {selectedBank && (
                <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
                  <h3 className="text-black mb-4">
                    Преимущества{" "}
                    {bankOffers.find((b) => b.id === selectedBank)?.name}
                  </h3>
                  <div className="space-y-3">
                    {bankOffers
                      .find((b) => b.id === selectedBank)
                      ?.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-slate-600 to-stone-600 text-white py-4 rounded-xl hover:from-slate-700 hover:to-stone-700 transition-all text-lg">
                  Подать заявку в{" "}
                  {bankOffers.find((b) => b.id === selectedBank)?.name}
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Сравнить предложения банков
                </button>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="mb-1">Предварительный расчет</p>
                      <p>
                        Окончательные условия кредита определяет банк после
                        рассмотрения заявки.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
