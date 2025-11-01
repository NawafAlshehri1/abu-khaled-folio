import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export const AveragePriceCalculator = () => {
  const [currentShares, setCurrentShares] = useState<string>("");
  const [currentAverage, setCurrentAverage] = useState<string>("");
  const [newShares, setNewShares] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculateAverage = () => {
    const shares1 = parseFloat(currentShares) || 0;
    const avg1 = parseFloat(currentAverage) || 0;
    const shares2 = parseFloat(newShares) || 0;
    const price2 = parseFloat(newPrice) || 0;

    if (shares1 + shares2 === 0) return;

    const totalCost = (shares1 * avg1) + (shares2 * price2);
    const totalShares = shares1 + shares2;
    const newAverage = totalCost / totalShares;

    setResult(newAverage);
  };

  return (
    <Card className="p-6 gradient-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg gradient-primary">
          <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold">حاسبة متوسط السعر</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="current-shares" className="text-foreground">عدد الأسهم الحالية</Label>
          <Input
            id="current-shares"
            type="number"
            placeholder="100"
            value={currentShares}
            onChange={(e) => setCurrentShares(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
        <div>
          <Label htmlFor="current-average" className="text-foreground">متوسط السعر الحالي</Label>
          <Input
            id="current-average"
            type="number"
            placeholder="50"
            value={currentAverage}
            onChange={(e) => setCurrentAverage(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
        <div>
          <Label htmlFor="new-shares" className="text-foreground">عدد الأسهم الجديدة</Label>
          <Input
            id="new-shares"
            type="number"
            placeholder="50"
            value={newShares}
            onChange={(e) => setNewShares(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
        <div>
          <Label htmlFor="new-price" className="text-foreground">سعر الشراء الجديد</Label>
          <Input
            id="new-price"
            type="number"
            placeholder="45"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="mt-1 bg-background/50"
          />
        </div>
      </div>

      <Button onClick={calculateAverage} className="w-full gradient-primary text-primary-foreground font-bold">
        احسب المتوسط الجديد
      </Button>

      {result !== null && (
        <div className="mt-6 p-4 rounded-lg bg-success/20 border border-success/30 animate-slide-up">
          <p className="text-sm text-foreground mb-1">المتوسط الجديد:</p>
          <p className="text-3xl font-bold text-success">{result.toFixed(2)} ريال</p>
        </div>
      )}
    </Card>
  );
};
