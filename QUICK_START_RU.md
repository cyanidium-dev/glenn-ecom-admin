# Быстрый старт для разработчиков

## Данные для подключения

**Project ID:** `6j5qleuo`  
**Dataset:** `production`  
**API Version:** `2024-01-01`

## Установка

```bash
npm install @sanity/client
```

## Настройка клиента

```javascript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6j5qleuo',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

## Основные запросы

### Получить все записи (Records)

```javascript
const records = await client.fetch(`
  *[_type == "record"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    priceCHF,
    releaseDate,
    order,
    "coverImage": coverImage.asset->url,
    "discImage": discImage.asset->url,
    "ogImage": ogImage.asset->url,
    description
  }
`)
```

### Получить запись по slug

```javascript
const record = await client.fetch(
  `*[_type == "record" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    priceCHF,
    releaseDate,
    "coverImage": coverImage.asset->url,
    description
  }`,
  {slug: 'your-slug-here'},
)
```

### Получить предстоящие события (Live Events)

```javascript
const events = await client.fetch(`
  *[_type == "liveEvent" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    location,
    ticketLink
  }
`)
```

Чудово, давай розширимо твій файл інструкцій. Для роботи із замовленнями важливо пам'ятати: **отримувати** замовлення можна через звичайний клієнт, але **створювати** та **редагувати** можна тільки через клієнт із токеном запису (`token`) та вимкненим CDN (`useCdn: false`).

Ось блок, який варто додати до твого розділу "Основні запроси":

---

## Робота із замовленнями (Orders)

> **Важливо:** Для створення та зміни статусу використовуйте клієнт із правами запису (Write Token).

### 1. Отримати замовлення конкретного користувача (по email)

```javascript
const userOrders = await client.fetch(
  `
  *[_type == "order" && customerEmail == $email] | order(createdAt desc) {
    _id,
    orderNumber,
    status,
    totalPrice,
    createdAt,
    items[] {
      productName,
      priceAtPurchase,
      quantity,
      "productDetails": product->{ title, "image": coverImage.asset->url }
    }
  }
`,
  {email: 'user@example.com'},
)
```

### 2. Створити нове замовлення

При створенні ми використовуємо `reference` для зв'язку з існуючою платівкою (`record`).

```javascript
// Використовуйте client з токеном та useCdn: false
const newOrder = await client.create({
  _type: 'order',
  orderNumber: `ORD-${Date.now()}`,
  customerName: 'Ivan Ivanov',
  customerEmail: 'ivan@example.com',
  customerPhone: '+380971234567',
  address: {
    city: 'Kyiv',
    street: 'Khreshchatyk 1',
    zipCode: '01001',
  },
  items: [
    {
      _key: 'unique_item_key_1', // можна використовувати ID товару
      product: {
        _type: 'reference',
        _ref: 'record_id_here', // ID існуючої платівки
      },
      productName: 'The Dark Side of the Moon',
      priceAtPurchase: 35.5,
      quantity: 1,
    },
  ],
  totalPrice: 35.5,
  status: 'pending', // початковий статус
})
```

### 3. Змінити статус замовлення (наприклад, після оплати у Webhook)

Метод `patch` дозволяє змінити лише конкретні поля, не перезаписуючи весь документ.

```javascript
// Використовуйте client з токеном
await client
  .patch('order_id_here') // ID замовлення в Sanity
  .set({
    status: 'paid',
    stripeSessionId: 'cs_test_...', // записуємо ID сесії Stripe для історії
  })
  .commit() // підтвердити зміни
```

## Документация

Полная документация с примерами для React/Next.js: [DEVELOPER.md](./DEVELOPER.md)
