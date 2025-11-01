import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface ChartData {
  name: string;
  value: number;
  profit: number;
}

interface PortfolioChartProps {
  data: ChartData[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))'];

export const PortfolioChart = ({ data }: PortfolioChartProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="p-6 gradient-card">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 gradient-primary rounded-full"></span>
          توزيع المحفظة
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `${value.toLocaleString('ar-SA')} ريال`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 gradient-card">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 gradient-success rounded-full"></span>
          الأرباح حسب السوق
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => `${value.toLocaleString('ar-SA')} ريال`}
            />
            <Bar dataKey="profit" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
