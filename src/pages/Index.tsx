import { PortfolioOverview } from "@/components/PortfolioOverview";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { AveragePriceCalculator } from "@/components/AveragePriceCalculator";
import { ProfitLossCalculator } from "@/components/ProfitLossCalculator";
import { TrendingUp, Coins, Bitcoin } from "lucide-react";

const Index = () => {
  // بيانات تجريبية - يمكن استبدالها ببيانات حقيقية لاحقاً
  const saudiStocks = {
    totalValue: 150000,
    initialInvestment: 120000,
    profitLoss: 30000,
    profitPercentage: 25,
  };

  const gold = {
    totalValue: 80000,
    initialInvestment: 75000,
    profitLoss: 5000,
    profitPercentage: 6.67,
  };

  const crypto = {
    totalValue: 95000,
    initialInvestment: 100000,
    profitLoss: -5000,
    profitPercentage: -5,
  };

  const totalValue = saudiStocks.totalValue + gold.totalValue + crypto.totalValue;
  const totalInitial = saudiStocks.initialInvestment + gold.initialInvestment + crypto.initialInvestment;
  const totalProfit = saudiStocks.profitLoss + gold.profitLoss + crypto.profitLoss;
  const totalProfitPercentage = ((totalProfit / totalInitial) * 100);

  const chartData = [
    { name: "الأسهم السعودية", value: saudiStocks.totalValue, profit: saudiStocks.profitLoss },
    { name: "الذهب", value: gold.totalValue, profit: gold.profitLoss },
    { name: "العملات الرقمية", value: crypto.totalValue, profit: crypto.profitLoss },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-primary bg-clip-text text-transparent">
            منصة أبو خالد
          </h1>
          <p className="text-lg text-muted-foreground">لإدارة المحفظة الاستثمارية</p>
        </div>

        {/* نظرة عامة */}
        <div className="animate-slide-up">
          <PortfolioOverview
            totalValue={totalValue}
            initialCapital={totalInitial}
            totalProfit={totalProfit}
            profitPercentage={totalProfitPercentage}
          />
        </div>

        {/* بطاقات الأسواق */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <PortfolioCard
            title="الأسهم السعودية"
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            totalValue={saudiStocks.totalValue}
            initialInvestment={saudiStocks.initialInvestment}
            profitLoss={saudiStocks.profitLoss}
            profitPercentage={saudiStocks.profitPercentage}
            gradient=""
          />
          <PortfolioCard
            title="الذهب"
            icon={<Coins className="w-6 h-6 text-primary" />}
            totalValue={gold.totalValue}
            initialInvestment={gold.initialInvestment}
            profitLoss={gold.profitLoss}
            profitPercentage={gold.profitPercentage}
            gradient=""
          />
          <PortfolioCard
            title="العملات الرقمية"
            icon={<Bitcoin className="w-6 h-6 text-primary" />}
            totalValue={crypto.totalValue}
            initialInvestment={crypto.initialInvestment}
            profitLoss={crypto.profitLoss}
            profitPercentage={crypto.profitPercentage}
            gradient=""
          />
        </div>

        {/* الرسوم البيانية */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <PortfolioChart data={chartData} />
        </div>

        {/* الحاسبات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <AveragePriceCalculator />
          <ProfitLossCalculator />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-muted-foreground">
            تم إعداد المنصة من قبل{" "}
            <span className="font-bold gradient-primary bg-clip-text text-transparent">
              نواف الشهري - أبو خالد
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
