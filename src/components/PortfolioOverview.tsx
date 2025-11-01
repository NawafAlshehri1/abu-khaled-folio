import { Card } from "@/components/ui/card";
import { TrendingUp, Wallet, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioOverviewProps {
  totalValue: number;
  initialCapital: number;
  totalProfit: number;
  profitPercentage: number;
}

export const PortfolioOverview = ({
  totalValue,
  initialCapital,
  totalProfit,
  profitPercentage,
}: PortfolioOverviewProps) => {
  const isProfit = totalProfit >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-6 gradient-primary text-white card-hover border-primary/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-lg bg-white/10 border border-white/20">
            <Wallet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">إجمالي المحفظة</h3>
        </div>
        <p className="text-3xl font-bold mb-1">{totalValue.toLocaleString('ar-SA')} ريال</p>
        <p className="text-sm opacity-90">القيمة الحالية الكلية</p>
      </Card>

      <Card className="p-6 gradient-card card-hover border-border/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <DollarSign className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold">رأس المال</h3>
        </div>
        <p className="text-3xl font-bold mb-1">{initialCapital.toLocaleString('ar-SA')} ريال</p>
        <p className="text-sm text-muted-foreground">المبلغ المستثمر الأساسي</p>
      </Card>

      <Card className={cn(
        "p-6 card-hover border-opacity-30",
        isProfit ? "gradient-success border-success/30" : "gradient-destructive border-destructive/30"
      )}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-lg bg-white/10 border border-white/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">الأرباح / الخسائر</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {isProfit ? "+" : ""}{totalProfit.toLocaleString('ar-SA')} ريال
        </p>
        <p className="text-sm text-white/90">
          نسبة العائد: {profitPercentage.toFixed(2)}%
        </p>
      </Card>
    </div>
  );
};
