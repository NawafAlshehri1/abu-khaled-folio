import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  title: string;
  icon: React.ReactNode;
  totalValue: number;
  initialInvestment: number;
  profitLoss: number;
  profitPercentage: number;
  gradient: string;
}

export const PortfolioCard = ({
  title,
  icon,
  totalValue,
  initialInvestment,
  profitLoss,
  profitPercentage,
  gradient,
}: PortfolioCardProps) => {
  const isProfit = profitLoss >= 0;

  return (
    <Card className={cn("p-6 card-hover gradient-card border-border/50", gradient)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {isProfit ? (
          <TrendingUp className="w-5 h-5 text-success" />
        ) : (
          <TrendingDown className="w-5 h-5 text-destructive" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">القيمة الحالية</p>
          <p className="text-2xl font-bold">{totalValue.toLocaleString('ar-SA')} ريال</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">رأس المال</p>
            <p className="text-sm font-medium">{initialInvestment.toLocaleString('ar-SA')} ريال</p>
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground">الربح/الخسارة</p>
            <p className={cn(
              "text-sm font-bold",
              isProfit ? "text-success" : "text-destructive"
            )}>
              {isProfit ? "+" : ""}{profitLoss.toLocaleString('ar-SA')} ريال
              <span className="text-xs mr-1">({profitPercentage.toFixed(2)}%)</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
