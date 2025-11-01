import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

export interface Investment {
  id: string;
  market: "saudi" | "gold" | "crypto";
  name: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
}

interface AddInvestmentFormProps {
  onAdd: (investment: Omit<Investment, "id">) => void;
}

export const AddInvestmentForm = ({ onAdd }: AddInvestmentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [market, setMarket] = useState<"saudi" | "gold" | "crypto">("saudi");
  const [name, setName] = useState("");
  const [shares, setShares] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !shares || !buyPrice || !currentPrice) {
      toast.error("يرجى تعبئة جميع الحقول");
      return;
    }

    onAdd({
      market,
      name,
      shares: parseFloat(shares),
      buyPrice: parseFloat(buyPrice),
      currentPrice: parseFloat(currentPrice),
    });

    // Reset form
    setName("");
    setShares("");
    setBuyPrice("");
    setCurrentPrice("");
    setIsOpen(false);
    toast.success("تم إضافة الاستثمار بنجاح");
  };

  const marketLabels = {
    saudi: "الأسهم السعودية",
    gold: "الذهب",
    crypto: "العملات الرقمية",
  };

  if (!isOpen) {
    return (
      <div className="mb-8">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full md:w-auto gradient-primary text-white hover:opacity-90"
          size="lg"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة استثمار جديد
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-6 gradient-card card-hover mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-2 h-8 gradient-primary rounded-full"></span>
          إضافة استثمار جديد
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="hover:bg-muted/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="market">السوق</Label>
            <Select value={market} onValueChange={(value: any) => setMarket(value)}>
              <SelectTrigger id="market" className="bg-background/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="saudi">{marketLabels.saudi}</SelectItem>
                <SelectItem value="gold">{marketLabels.gold}</SelectItem>
                <SelectItem value="crypto">{marketLabels.crypto}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">اسم السهم / الأصل</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أرامكو، بيتكوين، ذهب"
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shares">عدد الأسهم / الوحدات</Label>
            <Input
              id="shares"
              type="number"
              step="0.01"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              placeholder="100"
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="buyPrice">سعر الشراء (ريال)</Label>
            <Input
              id="buyPrice"
              type="number"
              step="0.01"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="50.00"
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPrice">السعر الحالي (ريال)</Label>
            <Input
              id="currentPrice"
              type="number"
              step="0.01"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="55.00"
              className="bg-background/50 border-border/50"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 gradient-primary text-white hover:opacity-90">
            <Plus className="w-4 h-4 ml-2" />
            إضافة
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Card>
  );
};
