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
  {slug: 'your-slug-here'}
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

## Документация

Полная документация с примерами для React/Next.js: [DEVELOPER.md](./DEVELOPER.md)
