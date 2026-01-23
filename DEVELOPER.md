# Developer Documentation

## Getting Started

This is a Sanity Content Studio project for managing musical records and live events. This guide will help you set up the development environment and connect to the Sanity backend.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js) or **yarn**
- A **Sanity account** (create one at [sanity.io](https://www.sanity.io))

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd glenn-ecom-admin
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `sanity` - Sanity Studio framework
- `@sanity/vision` - GROQ query tool
- `react` and `react-dom` - UI framework
- `typescript` - TypeScript support

## Configuration

### Project Configuration

The project is already configured with the following settings in `sanity.config.ts`:

- **Project ID**: `6j5qleuo`
- **Dataset**: `production`

If you need to change these settings, edit `sanity.config.ts`:

```typescript
export default defineConfig({
  projectId: 'your-project-id',
  dataset: 'your-dataset-name',
  // ... other config
})
```

### Environment Setup

No environment variables are required for basic setup. The project ID and dataset are hardcoded in the configuration file.

## Running the Development Server

### Start the Development Server

```bash
npm run dev
```

This will:
- Start the Sanity Studio on `http://localhost:3333`
- Enable hot-reloading for code changes
- Connect to your Sanity project

### Other Available Scripts

```bash
# Start production build locally
npm run start

# Build for production
npm run build

# Deploy Studio to Sanity hosting
npm run deploy

# Deploy GraphQL API
npm run deploy-graphql
```

## Project Structure

```
glenn-ecom-admin/
├── schemaTypes/          # Content type definitions
│   ├── record.ts        # Musical record schema
│   ├── liveEvent.ts     # Live event schema
│   └── index.ts         # Schema exports
├── src/
│   └── structure.ts     # Studio structure configuration
├── static/              # Static assets
├── sanity.config.ts     # Main Sanity configuration
├── sanity.cli.ts        # CLI configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Schema Overview

### Record Schema

The `record` schema includes:
- **coverImage** (required) - Album cover image
- **discImage** (required) - Disc photo for animations
- **ogImage** (optional) - Open Graph image (1200x630px)
- **title** (required) - Album/song name
- **slug** (required) - Unique URL slug
- **priceCHF** (required) - Price in Swiss Francs
- **releaseDate** (required) - Release date (DD.MM.YYYY format)
- **description** (required) - Rich text description
- **order** (required) - Sorting order number

### LiveEvent Schema

The `liveEvent` schema includes:
- **title** (required) - Event name
- **date** (required) - Event date (DD.MM.YYYY format)
- **location** (required) - City and country
- **ticketLink** (required) - Ticket purchase URL

## Authentication

### Adding Users to the Project

Users must be added through the Sanity Management Console:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (`6j5qleuo`)
3. Navigate to **Members** in the sidebar
4. Click **Add member**
5. Enter the user's email address
6. Select their role:
   - **Administrator** - Full access
   - **Editor** - Can create/edit content
   - **Viewer** - Read-only access
7. Click **Add member**

The user will receive an email invitation to join the project.

### User Roles

- **Administrator**: Full access to all content and settings
- **Editor**: Can create, edit, and delete content
- **Viewer**: Can only view content (read-only)

## Connecting to Sanity

### First-Time Setup

1. **Login to Sanity**:
   ```bash
   npx sanity login
   ```
   This will open a browser window for authentication.

2. **Verify Project Access**:
   ```bash
   npx sanity projects list
   ```
   You should see `6j5qleuo` in the list if you have access.

### Using the Studio

Once logged in, you can:

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the Studio**:
   Open `http://localhost:3333` in your browser

3. **Login to the Studio**:
   - Click "Login with Sanity"
   - Authenticate with your Sanity account
   - You'll be redirected to the Studio dashboard

## Customization

### Modifying Schemas

Edit schema files in `schemaTypes/`:

```typescript
// schemaTypes/record.ts
export const record = defineType({
  name: 'record',
  // ... schema definition
})
```

After making changes:
- The dev server will hot-reload automatically
- Schema changes require redeployment to take effect in production

### Customizing Studio Structure

Edit `src/structure.ts` to customize the Studio navigation:

```typescript
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Customize navigation items
    ])
```

## Deployment

### Deploy Studio to Sanity Hosting

```bash
npm run deploy
```

This will:
- Build the Studio
- Deploy it to `https://your-project.sanity.studio`
- Make it accessible to all project members

### Deploy GraphQL API

```bash
npm run deploy-graphql
```

This deploys the GraphQL API for your content.

## Querying Content

### Using GROQ

You can query content using GROQ in the Vision tool (accessible in the Studio):

```groq
// Get all records ordered by order field
*[_type == "record"] | order(order asc) {
  _id,
  title,
  slug,
  priceCHF,
  releaseDate,
  "coverImageUrl": coverImage.asset->url
}

// Get upcoming live events
*[_type == "liveEvent" && date >= now()] | order(date asc) {
  _id,
  title,
  date,
  location,
  ticketLink
}
```

## Connecting to Frontend

This section provides detailed instructions on how to connect your frontend application to Sanity and fetch content.

### Installation

Install the Sanity client in your frontend project:

```bash
npm install @sanity/client
# or
yarn add @sanity/client
```

For Next.js projects, you may also want:

```bash
npm install next-sanity
# or
yarn add next-sanity
```

### Setting Up the Client

#### Basic Setup (Vanilla JavaScript/React)

Create a client configuration file:

```javascript
// lib/sanity.js or lib/sanity.ts
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '6j5qleuo',
  dataset: 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or revalidation
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
})
```

#### Next.js Setup

For Next.js, create a client with proper configuration:

```javascript
// lib/sanity.js
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: '6j5qleuo',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  apiVersion: '2024-01-01',
})

// For server-side rendering
export const serverClient = createClient({
  projectId: '6j5qleuo',
  dataset: 'production',
  useCdn: false, // Always use fresh data on server
  apiVersion: '2024-01-01',
})
```

#### Environment Variables (Recommended)

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=6j5qleuo
NEXT_PUBLIC_SANITY_DATASET=production
```

Then use in your client:

```javascript
import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

### GROQ Query Examples

#### Fetch All Records

```javascript
import {client} from './lib/sanity'

// Get all records ordered by order field
const records = await client.fetch(`
  *[_type == "record"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    priceCHF,
    releaseDate,
    order,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    "discImage": discImage.asset->url,
    "ogImage": ogImage.asset->url,
    description
  }
`)
```

#### Fetch Single Record by Slug

```javascript
// Get a specific record by slug
const record = await client.fetch(
  `
    *[_type == "record" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      priceCHF,
      releaseDate,
      order,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      "discImage": discImage.asset->url,
      "ogImage": ogImage.asset->url,
      description
    }
  `,
  {slug: 'midnight-sessions'} // Replace with actual slug
)
```

#### Fetch Records with Image URLs and Dimensions

```javascript
const records = await client.fetch(`
  *[_type == "record"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    priceCHF,
    releaseDate,
    order,
    "coverImage": coverImage.asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    "discImage": discImage.asset->url,
    "ogImage": ogImage.asset->url,
    description
  }
`)
```

#### Fetch Upcoming Live Events

```javascript
// Get all upcoming events (future dates)
const upcomingEvents = await client.fetch(`
  *[_type == "liveEvent" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    location,
    ticketLink
  }
`)
```

#### Fetch All Live Events

```javascript
// Get all events ordered by date
const allEvents = await client.fetch(`
  *[_type == "liveEvent"] | order(date asc) {
    _id,
    title,
    date,
    location,
    ticketLink
  }
`)
```

#### Fetch Past Events

```javascript
// Get past events
const pastEvents = await client.fetch(`
  *[_type == "liveEvent" && date < now()] | order(date desc) {
    _id,
    title,
    date,
    location,
    ticketLink
  }
`)
```

### React/Next.js Examples

#### React Hook Example

```javascript
// hooks/useRecords.js
import {useEffect, useState} from 'react'
import {client} from '../lib/sanity'

export function useRecords() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRecords() {
      try {
        const data = await client.fetch(`
          *[_type == "record"] | order(order asc) {
            _id,
            title,
            "slug": slug.current,
            priceCHF,
            releaseDate,
            "coverImage": coverImage.asset->url,
            description
          }
        `)
        setRecords(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  return {records, loading, error}
}
```

Usage in component:

```jsx
import {useRecords} from '../hooks/useRecords'

export default function RecordsList() {
  const {records, loading, error} = useRecords()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {records.map((record) => (
        <div key={record._id}>
          <h2>{record.title}</h2>
          <p>Price: {record.priceCHF} CHF</p>
          <img src={record.coverImage} alt={record.title} />
        </div>
      ))}
    </div>
  )
}
```

#### Next.js Server Components (App Router)

```javascript
// app/records/page.js
import {client} from '@/lib/sanity'

async function getRecords() {
  return await client.fetch(`
    *[_type == "record"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      priceCHF,
      releaseDate,
      "coverImage": coverImage.asset->url,
      description
    }
  `)
}

export default async function RecordsPage() {
  const records = await getRecords()

  return (
    <div>
      <h1>Records</h1>
      {records.map((record) => (
        <div key={record._id}>
          <h2>{record.title}</h2>
          <p>{record.priceCHF} CHF</p>
        </div>
      ))}
    </div>
  )
}
```

#### Next.js Dynamic Route Example

```javascript
// app/records/[slug]/page.js
import {client} from '@/lib/sanity'
import {notFound} from 'next/navigation'

async function getRecord(slug) {
  return await client.fetch(
    `
      *[_type == "record" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        priceCHF,
        releaseDate,
        "coverImage": coverImage.asset->url,
        "discImage": discImage.asset->url,
        "ogImage": ogImage.asset->url,
        description
      }
    `,
    {slug}
  )
}

export default async function RecordPage({params}) {
  const record = await getRecord(params.slug)

  if (!record) {
    notFound()
  }

  return (
    <div>
      <h1>{record.title}</h1>
      <img src={record.coverImage} alt={record.title} />
      <p>Price: {record.priceCHF} CHF</p>
      <p>Release Date: {new Date(record.releaseDate).toLocaleDateString()}</p>
    </div>
  )
}
```

#### Next.js API Route Example

```javascript
// app/api/records/route.js
import {client} from '@/lib/sanity'
import {NextResponse} from 'next/server'

export async function GET() {
  try {
    const records = await client.fetch(`
      *[_type == "record"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        priceCHF,
        releaseDate,
        "coverImage": coverImage.asset->url
      }
    `)

    return NextResponse.json(records)
  } catch (error) {
    return NextResponse.json(
      {error: 'Failed to fetch records'},
      {status: 500}
    )
  }
}
```

### Working with Images

Sanity provides image URLs that can be transformed. Use the Sanity image URL builder:

```bash
npm install @sanity/image-url
```

```javascript
import imageUrlBuilder from '@sanity/image-url'
import {client} from './lib/sanity'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

// Usage
const record = await client.fetch(`
  *[_type == "record" && slug.current == $slug][0] {
    coverImage,
    // ... other fields
  }
`, {slug: 'midnight-sessions'})

// Get optimized image URL
const imageUrl = urlFor(record.coverImage)
  .width(800)
  .height(800)
  .fit('max')
  .auto('format')
  .url()

// Or get responsive srcset
const srcSet = urlFor(record.coverImage)
  .width(400)
  .format('webp')
  .url()
```

#### Next.js Image Component Integration

```jsx
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import {client} from '@/lib/sanity'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

export default function RecordCard({record}) {
  const imageUrl = urlFor(record.coverImage)
    .width(800)
    .height(800)
    .url()

  return (
    <Image
      src={imageUrl}
      alt={record.title}
      width={800}
      height={800}
    />
  )
}
```

### Working with Portable Text (Rich Text)

For rendering the `description` field (Portable Text), install:

```bash
npm install @portabletext/react
```

```jsx
import {PortableText} from '@portabletext/react'

export default function RecordDescription({description}) {
  return (
    <div>
      <PortableText value={description} />
    </div>
  )
}
```

With custom components:

```jsx
import {PortableText} from '@portabletext/react'

const components = {
  types: {
    // Custom types
  },
  marks: {
    link: ({children, value}) => {
      return (
        <a href={value?.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({children}) => <h1 className="text-3xl">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl">{children}</h2>,
    normal: ({children}) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc">{children}</ul>,
    number: ({children}) => <ol className="list-decimal">{children}</ol>,
  },
}

export default function RecordDescription({description}) {
  return <PortableText value={description} components={components} />
}
```

### TypeScript Types

Create TypeScript interfaces for type safety:

```typescript
// types/sanity.ts
export interface Record {
  _id: string
  _type: 'record'
  title: string
  slug: {
    current: string
  }
  priceCHF: number
  releaseDate: string
  order: number
  coverImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  discImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  ogImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  description: any[] // Portable Text
}

export interface LiveEvent {
  _id: string
  _type: 'liveEvent'
  title: string
  date: string
  location: string
  ticketLink: string
}
```

Usage:

```typescript
import {client} from './lib/sanity'
import type {Record} from './types/sanity'

async function getRecords(): Promise<Record[]> {
  return await client.fetch<Record[]>(`
    *[_type == "record"] | order(order asc) {
      _id,
      title,
      slug,
      priceCHF,
      releaseDate,
      order,
      coverImage,
      description
    }
  `)
}
```

### Error Handling

```javascript
import {client} from './lib/sanity'

async function fetchRecords() {
  try {
    const records = await client.fetch(`
      *[_type == "record"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        priceCHF
      }
    `)
    return {data: records, error: null}
  } catch (error) {
    console.error('Error fetching records:', error)
    return {
      data: null,
      error: error.message || 'Failed to fetch records',
    }
  }
}
```

### Caching and Revalidation (Next.js)

```javascript
// app/records/page.js
import {client} from '@/lib/sanity'

export const revalidate = 60 // Revalidate every 60 seconds

async function getRecords() {
  return await client.fetch(
    `
      *[_type == "record"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        priceCHF
      }
    `,
    {},
    {
      next: {revalidate: 60}, // Cache for 60 seconds
    }
  )
}
```

### Complete Example: Records List Page

```jsx
// app/records/page.js
import {client} from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'
import {PortableText} from '@portabletext/react'

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

async function getRecords() {
  return await client.fetch(`
    *[_type == "record"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      priceCHF,
      releaseDate,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      description
    }
  `)
}

export default async function RecordsPage() {
  const records = await getRecords()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Records</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <Link
            key={record._id}
            href={`/records/${record.slug}`}
            className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {record.coverImage && (
              <Image
                src={record.coverImage}
                alt={record.coverImageAlt || record.title}
                width={400}
                height={400}
                className="w-full h-auto"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{record.title}</h2>
              <p className="text-lg font-bold text-blue-600">
                {record.priceCHF} CHF
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Released: {new Date(record.releaseDate).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

1. **"Project not found" error**:
   - Verify you have access to project `6j5qleuo`
   - Check your Sanity login: `npx sanity login`

2. **Port 3333 already in use**:
   - Kill the process using port 3333
   - Or change the port in `sanity.config.ts`

3. **Schema changes not appearing**:
   - Restart the dev server
   - Clear browser cache
   - Check for TypeScript errors: `npx tsc --noEmit`

4. **Authentication issues**:
   - Log out and log back in: `npx sanity logout` then `npx sanity login`
   - Verify your account has access to the project

### Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Sanity Discord](https://www.sanity.io/community/join)

## TypeScript Support

The project uses TypeScript for type safety. To check for type errors:

```bash
npx tsc --noEmit
```

## Code Style

The project uses:
- **Prettier** for code formatting
- **ESLint** for linting
- Configuration in `package.json` and `eslint.config.mjs`

Format code:
```bash
npx prettier --write .
```

## Next Steps

1. Review the schema definitions in `schemaTypes/`
2. Customize the Studio structure if needed
3. Deploy the Studio: `npm run deploy`
4. Add team members through Sanity Management Console
5. Start creating content!
