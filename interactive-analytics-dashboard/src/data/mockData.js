const mockStatuses = ["pending", "processing", "completed", "cancelled"];
const customers = ["Марія Сидоренко", "Олег Волков", "Анна Кушнір", "Дмитро Ткаченко", "Юлія Кравченко"];
const productsList = ["iPhone 15", "Monitor Samsung 27", "Keyboard Keychron", "Sony WH-1000XM5", "iPad Air"];

const mockOrders = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  customer: customers[Math.floor(Math.random() * customers.length)],
  product: productsList[Math.floor(Math.random() * productsList.length)],
  amount: Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000,
  status: mockStatuses[Math.floor(Math.random() * mockStatuses.length)],
  likes: Math.floor(Math.random() * 20), 
  isLiked: Math.random() > 0.5,          
  date: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString()
}))

const mockCategories = ["electronics", "peripherals", "accessories", "audio"];

const mockProducts = Array.from({ length: 35 }, (_, i) => {
  const price = Math.floor(Math.random() * 40000) + 500;
  const salesCount = Math.floor(Math.random() * 200);
  return {
    id: i + 1,
    name: `Товар #${i + 1} (${mockCategories[i % mockCategories.length]})`,
    category: mockCategories[i % mockCategories.length],
    price: price,
    stock: Math.floor(Math.random() * 100),
    salesCount: salesCount,
    revenue: salesCount * price
  };
});

const mockUsers = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Користувач ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 10 === 0 ? "admin" : "user", 
  isActive: Math.random() > 0.2,
  registeredAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
  lastActivity: new Date(2024, 0, Math.floor(Math.random() * 31)).toISOString()
}));

const mockSalesData = {
  daily: [
    { day: "Пн", sales: 4000, orders: 24 },
    { day: "Вт", sales: 3000, orders: 18 },
    { day: "Ср", sales: 5000, orders: 30 },
    { day: "Чт", sales: 2780, orders: 15 },
    { day: "Пт", sales: 1890, orders: 10 },
    { day: "Сб", sales: 2390, orders: 12 },
    { day: "Нд", sales: 3490, orders: 20 },
  ],
  monthly: [
    { name: "Січ", revenue: 45000 },
    { name: "Лют", revenue: 52000 },
    { name: "Бер", revenue: 48000 },
    { name: "Квіт", revenue: 61000 },
    { name: "Трав", revenue: 55000 },
    { name: "Черв", revenue: 67000 },
    { name: "Лип", revenue: 72000 },
    { name: "Серп", revenue: 69000 },
    { name: "Вер", revenue: 81000 },
    { name: "Жовт", revenue: 75000 },
    { name: "Лист", revenue: 92000 },
    { name: "Груд", revenue: 115000 },
  ],
  yearly: [
    { year: "2024", total: 540000 },
    { year: "2025", total: 820000 },
    { year: "2026", total: 120000 }
  ]
};

export {mockUsers, mockProducts, mockOrders, mockSalesData, mockCategories, mockStatuses};