# InteractiveAnalyticsDashboard

## Опис
Interactive Analytics Dashboard — це інтерактивний веб-додаток для аналітики даних, створений на React 19, який демонструє використання нових хуків: useActionState, useTransition, useOptimistic, use(), useDeferredValue, useId.

Дашборд включає віджети з ключовими метриками, live search, таблиці замовлень, графіки продажів, форми додавання даних, фільтри та темну/світлу тему.

---
### Скріншоти:

<img width="300" alt="image" src="https://github.com/user-attachments/assets/54b5214d-7a72-4a90-b048-f6b86878318c" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/9a6358cd-8ec7-4a3d-a9aa-17a503bf4397" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/1cbfb50a-5ff0-4c81-9fe3-1847465a1c6a" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/3f92286e-d46f-4bc7-a6d4-171d35f27616" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/85cf2c14-54c5-4219-ad86-c6c70295e385" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/3b027f44-d6b0-481b-bf85-5c975cf693ff" />
<img width="300" alt="image" src="https://github.com/user-attachments/assets/94567b99-8e56-4324-bcab-460c8e4cdfab" />

---
### Функціональні можливості
#### Структура Dashboard
1. Header (Шапка)
   - Логотип / назва: Analytics Dashboard
   - Селектор періоду: Сьогодні | Тиждень | Місяць | Рік
   - Кнопка оновлення даних
   - Toggle для темної/світлої теми
   - Індикатор "Завантаження..." під час оновлення даних
   - Використання useTransition для некритичних оновлень

2. Sidebar (Бокова панель)
   - Навігація по розділах:
     - 📊 Overview
     - 💰 Sales
     - 👥 Users
     - 📈 Analytics

   - Фільтри:
     - Категорії продуктів (чекбокси)
     - Діапазон цін (слайдер)
     - Регіони (multi-select)
     - Позначення transition при зміні складних фільтрів

3. Головна область з віджетами
     Розділ Overview

     Віджет 1: Stats Cards
     - 4 картки: Загальний дохід, Кількість замовлень, Нові користувачі, Товари в наявності
     - Число, відсоток зміни, міні-графік тренду

     Віджет 2: Live Search
     - Пошук користувачів та продуктів
     - Використання useDeferredValue для плавного оновлення результатів
     - Підсвічування знайденого тексту

     Віджет 3: Таблиця останніх замовлень
     - Колонки: ID | Клієнт | Продукт | Сума | Статус | Дії
     - Пагінація 10–15 записів
     - useOptimistic для миттєвого оновлення статусу

     Віджет 4: Графік продажів
     - Лінійний / стовпчиковий графік
     - Використання useTransition при зміні періоду
     - Показує opacity 0.5 під час оновлення
     - Розділ Sales

     Віджет 5: Форма додавання продажу
     - Поля: Клієнт, Продукт, Кількість, Ціна
     - Використання useActionState для асинхронних дій

     Віджет 6: Топ продуктів
     - Список 10 найпопулярніших продуктів
     - Progress bar для відображення продажів / доходу
     - Сортування за продажами або доходом
     - Розділ Users

     Віджет 7: Таблиця користувачів
     - Live search за допомогою useDeferredValue
     - Фільтри за активністю
     - Сортування: Ім'я, Дата реєстрації, Активність

     Віджет 8: Форма додавання користувача
     - Поля: Ім'я, Email, Роль
     - Async валідація email
     - useActionState для управління станом
     - Розділ Analytics

     Віджет 9: Порівняння періодів
     - Селектор двох періодів
     - Метрики side-by-side
     - Використання useTransition при завантаженні нових даних

     Віджет 10: Async Data Loader
     - Використання use() для роботи з промісами
     - Suspense для показу loading state
     - Error boundary для помилок
     - Кнопка "Перезавантажити" дані

---

## Запуск проєкту
1. Клонувати репозиторій:
```bash
git clone https://github.com/olha-makarchuk/InteractiveAnalyticsDashboard.git
```

2. Встановити залежності:
```bash
npm install
```

3. Запустити локально:
```bash
npm ren dev
```
