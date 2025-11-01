import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProfitLossCalculator = () => {
  const [shares, setShares] = useState<string>("");
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [exitPrice, setExitPrice] = useState<string>("");
  const [result, setResult] = useState<{ profit: number; percentage: number } | null>(null);

  const calculateProfit = () => {
    const numShares = parseFloat(shares) || 0;
    const entry = parseFloat(entryPrice) || 0;
    const exit = parseFloat(exitPrice) || 0;

    if (numShares === 0 || entry === 0) return;

    const totalProfit = (exit - entry) * numShares;
    const percentage = ((exit - entry) / entry) * 100;

    setResult({ profit: totalProfit, percentage });
  };

  return (
    <Card className="p-6 gradient-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg gradient-success">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">حاسبة الأرباح والخسائر</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="shares" className="text-foreground">عدد الأسهم</Label>
          <Input
            id="shares"
            type="number"
            placeholder="100"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
        <div>
          <Label htmlFor="entry-price" className="text-foreground">سعر الدخول</Label>
          <Input
            id="entry-price"
            type="number"
            placeholder="50"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
        <div>
          <Label htmlFor="exit-price" className="text-foreground">سعر الخروج</Label>
          <Input
            id="exit-price"
            type="number"
            placeholder="55"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
      </div>

      <Button onClick={calculateProfit} className="w-full gradient-primary text-primary-foreground font-bold">
        احسب الربح / الخسارة
      </Button>

      {result !== null && (
        <div className={cn(
          "mt-6 p-4 rounded-lg border animate-slide-up",
          result.profit >= 0 
            ? "bg-success/20 border-success/30" 
            : "bg-destructive/20 border-destructive/30"
        )}>
          <p className="text-sm text-foreground mb-1">النتيجة:</p>
          <p className={cn(
            "text-3xl font-bold",
            result.profit >= 0 ? "text-success" : "text-destructive"
          )}>
            {result.profit >= 0 ? "+" : ""}{result.profit.toFixed(2)} ريال
          </p>
          <p className={cn(
            "text-lg font-medium mt-1",
            result.profit >= 0 ? "text-success" : "text-destructive"
          )}>
            {result.percentage >= 0 ? "+" : ""}{result.percentage.toFixed(2)}%
          </p>
        </div>
      )}
    </Card>
  );
};
