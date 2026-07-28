'use client';

import { Card } from '@heroui/react';
import {
  AreaChart,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// ---------- Static Mock Data ----------
const summary = {
  totalSales: 41250,
  totalOrders: 1050,
  averageOrderValue: 39,
};

const trend = [
  { month: 'Jan', sales: 12000 },
  { month: 'Feb', sales: 9000 },
  { month: 'Mar', sales: 15000 },
  { month: 'Apr', sales: 11000 },
  { month: 'May', sales: 18000 },
  { month: 'Jun', sales: 14000 },
  { month: 'Jul', sales: 16000 },
  { month: 'Aug', sales: 13000 },
  { month: 'Sep', sales: 19000 },
  { month: 'Oct', sales: 21000 },
  { month: 'Nov', sales: 17000 },
  { month: 'Dec', sales: 25000 },
];

const products = [
  { id: 1, name: 'Wireless Headphones', sales: 12450, quantity: 245 },
  { id: 2, name: 'Smart Watch', sales: 9800, quantity: 180 },
  { id: 3, name: 'USB-C Hub', sales: 7600, quantity: 320 },
  { id: 4, name: 'Portable SSD', sales: 6300, quantity: 95 },
  { id: 5, name: 'Bluetooth Speaker', sales: 5100, quantity: 210 },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Sales Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Header className="pb-0">
            <h3 className="text-lg font-semibold">Total Sales</h3>
          </Card.Header>
          <div className="p-4">
            <p className="text-3xl font-bold text-primary">
              ${summary.totalSales.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card>
          <Card.Header className="pb-0">
            <h3 className="text-lg font-semibold">Total Orders</h3>
          </Card.Header>
          <div className="p-4">
            <p className="text-3xl font-bold text-secondary">
              {summary.totalOrders.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card>
          <Card.Header className="pb-0">
            <h3 className="text-lg font-semibold">Avg. Order Value</h3>
          </Card.Header>
          <div className="p-4">
            <p className="text-3xl font-bold text-success">
              ${summary.averageOrderValue.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Monthly Sales Trend */}
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold">Monthly Sales Trend</h2>
        </Card.Header>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Selling Products Table + Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Top Selling Products</h2>
          </Card.Header>
          <div className="p-4 overflow-x-auto">
            {/* সরাসরি HTML Table – কোনো Collection Error নেই */}
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2 text-right">Sales ($)</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${item.sales.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Sales by Product</h2>
          </Card.Header>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={products}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}