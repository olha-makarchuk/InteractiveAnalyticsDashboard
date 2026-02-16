import {mockSalesData, mockProducts, mockUsers, mockOrders} from "../data/mockData";

export async function updateOrderStatus(orderId, newStatus) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //90% успіх, 10% помилка (для тестування)
      if (Math.random() > 0.1) {
        resolve({ success: true, orderId, newStatus });
      } else {
        reject(new Error("Не вдалося оновити статус. Спробуйте ще раз."));
      }
    }, 1000);
  });
}

export async function loadChartData(period) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSalesData[period]);
    }, 1500);
  });
}

export async function checkEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const takenEmails = ["admin@example.com", "test@example.com"];
      resolve(takenEmails.includes(email));
    }, 500);
  });
}

export async function loadAnalytics() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.15) {
        resolve({
          totalRevenue: mockProducts.reduce((a, p) => a + p.revenue, 0),
          totalOrders: mockOrders.length,
          activeUsers: mockUsers.filter(u => u.isActive).length,
          topProduct: mockProducts.sort((a,b)=>b.salesCount-a.salesCount)[0],
        });
      } else {
        reject(new Error("Не вдалося завантажити аналітику"));
      }
    }, 2000);
  });
}

export const fetchAnalyticsData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) {
        return reject(new Error("Сервер тимчасово недоступний"));
      }
      
      resolve({
        title: "Річна виручка",
        items: [
          { year: "2024", total: 540000, growth: "+12%" },
          { year: "2025", total: 820000, growth: "+51%" },
          { year: "2026", total: 120000, growth: "в процесі" }
        ]
      });
    }, 2000);
  });
};

export const deleteOrder = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() < 0.1) {
    throw new Error("Сервер відхилив видалення замовлення");
  }

  console.log(`Замовлення #${id} видалено з бази даних`);
  return { success: true };
};

export const toggleLikeOrder = (orderId, isLiked) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("Не вдалося оновити лайк"));
      } else {
        resolve({ success: true });
      }
    }, 800);
  });
};
