import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Investment } from "./AddInvestmentForm";

interface InvestmentListProps {
  investments: Investment[];
  onDelete: (id: string) => void;
  marketFilter: "all" | "saudi" | "gold" | "crypto";
}

export const InvestmentList = ({ investments, onDelete, marketFilter }: InvestmentListProps) => {
  const marketLabels = {
    saudi: "الأسهم السعودية",
    gold: "الذهب",
    crypto: "العملات الرقمية",
  };

  const filteredInvestments =
    marketFilter === "all"
      ? investments
      : investments.filter((inv) => inv.market === marketFilter);

  if (filteredInvestments.length === 0) {
    return (
      <Card className="p-8 gradient-card text-center">
        <p className="text-muted-foreground">لا توجد استثمارات لعرضها</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredInvestments.map((investment) => {
        const totalCost = investment.shares * investment.buyPrice;
        const currentValue = investment.shares * investment.currentPrice;
        const profitLoss = currentValue - totalCost;
        const profitPercentage = ((profitLoss / totalCost) * 100);
        const isProfit = profitLoss >= 0;

        return (
          <Card
            key={investment.id}
            className="p-5 gradient-card card-hover border-border/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold">{investment.name}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {marketLabels[investment.market]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {investment.shares.toLocaleString('ar-SA')} وحدة
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(investment.id)}
                  className="hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">سعر الشراء</p>
                <p className="text-sm font-medium">
                  {investment.buyPrice.toLocaleString('ar-SA')} ريال
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">السعر الحالي</p>
                <p className="text-sm font-medium">
                  {investment.currentPrice.toLocaleString('ar-SA')} ريال
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">القيمة الحالية</p>
                <p className="text-sm font-bold">
                  {currentValue.toLocaleString('ar-SA')} ريال
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">الربح/الخسارة</p>
                <p
                  className={cn(
                    "text-sm font-bold",
                    isProfit ? "text-success" : "text-destructive"
                  )}
                >
                  {isProfit ? "+" : ""}
                  {profitLoss.toLocaleString('ar-SA')} ريال
                  <span className="text-xs mr-1">({profitPercentage.toFixed(2)}%)</span>
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
