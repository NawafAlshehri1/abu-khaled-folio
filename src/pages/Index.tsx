import { useState, useEffect } from "react";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioChart } from "@/components/PortfolioChart";
import { AveragePriceCalculator } from "@/components/AveragePriceCalculator";
import { ProfitLossCalculator } from "@/components/ProfitLossCalculator";
import { AddInvestmentForm, Investment } from "@/components/AddInvestmentForm";
import { InvestmentList } from "@/components/InvestmentList";
import { TrendingUp, Coins, Bitcoin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Index = () => {
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem("investments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [investments]);

  const handleAddInvestment = (investment: Omit<Investment, "id">) => {
    const newInvestment: Investment = {
      ...investment,
      id: Date.now().toString(),
    };
    setInvestments([...investments, newInvestment]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
    toast.success("تم حذف الاستثمار");
  };

  // Calculate totals by market
  const calculateMarketData = (market: "saudi" | "gold" | "crypto") => {
    const marketInvestments = investments.filter((inv) => inv.market === market);
    const totalValue = marketInvestments.reduce(
      (sum, inv) => sum + inv.shares * inv.currentPrice,
      0
    );
    const initialInvestment = marketInvestments.reduce(
      (sum, inv) => sum + inv.shares * inv.buyPrice,
      0
    );
    const profitLoss = totalValue - initialInvestment;
    const profitPercentage = initialInvestment > 0 ? (profitLoss / initialInvestment) * 100 : 0;

    return { totalValue, initialInvestment, profitLoss, profitPercentage };
  };

  const saudiStocks = calculateMarketData("saudi");
  const gold = calculateMarketData("gold");
  const crypto = calculateMarketData("crypto");

  const totalValue = saudiStocks.totalValue + gold.totalValue + crypto.totalValue;
  const totalInitial = saudiStocks.initialInvestment + gold.initialInvestment + crypto.initialInvestment;
  const totalProfit = saudiStocks.profitLoss + gold.profitLoss + crypto.profitLoss;
  const totalProfitPercentage = totalInitial > 0 ? (totalProfit / totalInitial) * 100 : 0;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <div className="text-muted-foreground text-2xl md:text-3xl mb-2">منصة</div>
            <div className="gradient-primary bg-clip-text text-transparent">أبو خالد</div>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">لإدارة محفظته الشخصية</p>
          <p className="text-sm text-muted-foreground/80">تم تصميمها بواسطة نواف الشهري</p>
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

        {/* إضافة استثمار */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <AddInvestmentForm onAdd={handleAddInvestment} />
        </div>

        {/* بطاقات الأسواق */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
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

        {/* قائمة الاستثمارات */}
        <div className="animate-slide-up mb-8" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 gradient-primary rounded-full"></span>
            استثماراتك
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-card/50">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="saudi">السعودية</TabsTrigger>
              <TabsTrigger value="gold">الذهب</TabsTrigger>
              <TabsTrigger value="crypto">العملات</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <InvestmentList
                investments={investments}
                onDelete={handleDeleteInvestment}
                marketFilter="all"
              />
            </TabsContent>
            <TabsContent value="saudi">
              <InvestmentList
                investments={investments}
                onDelete={handleDeleteInvestment}
                marketFilter="saudi"
              />
            </TabsContent>
            <TabsContent value="gold">
              <InvestmentList
                investments={investments}
                onDelete={handleDeleteInvestment}
                marketFilter="gold"
              />
            </TabsContent>
            <TabsContent value="crypto">
              <InvestmentList
                investments={investments}
                onDelete={handleDeleteInvestment}
                marketFilter="crypto"
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* الرسوم البيانية */}
        {investments.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <PortfolioChart data={chartData} />
          </div>
        )}

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
