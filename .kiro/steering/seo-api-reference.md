---
inclusion: manual
---

# SEO Metadata API Reference

## Base URL
```
http://localhost:5000/api/seo
```

## Endpoints

### 1. Get SEO Metadata

**Endpoint**: `GET /seo/:entityType/:entityId`

**Description**: Retrieve SEO metadata for a specific entity (game or category)

**Parameters**:
- `entityType` (string, required): `game` or `category`
- `entityId` (number, required): ID of the entity

**Response** (200 OK):
```json
{
  "id": 1,
  "entityType": "game",
  "entityId": 123,
  "metaTitle": "Play Action Games Free Online",
  "metaDescription": "Discover 100+ free action games online. Play instantly in your browser.",
  "metaKeywords": "action games, free games, online games",
  "canonicalUrl": "https://theplayfree.com/game/example-game",
  "ogTitle": "Action Games - ThePlayFree",
  "ogDescription": "Play free action games online",
  "ogImage": "https://cdn.example.com/og-image.jpg",
  "twitterTitle": "Action Games - ThePlayFree",
  "twitterDescription": "Play free action games online",
  "twitterImage": "https://cdn.example.com/twitter-image.jpg",
  "robots": "index, follow",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Example Game",
    "description": "An awesome action game"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Response** (404 Not Found):
```json
{
  "message": "SEO metadata not found"
}
```

**Example**:
```bash
curl http://localhost:5000/api/seo/game/123
```

---

### 2. Create/Update SEO Metadata

**Endpoint**: `POST /seo/:entityType/:entityId` or `PUT /seo/:entityType/:entityId`

**Description**: Create new or update existing SEO metadata for an entity

**Parameters**:
- `entityType` (string, required): `game` or `category`
- `entityId` (number, required): ID of the entity

**Request Body**:
```json
{
  "metaTitle": "Play Action Games Free Online",
  "metaDescription": "Discover 100+ free action games online. Play instantly in your browser.",
  "metaKeywords": "action games, free games, online games",
  "canonicalUrl": "https://theplayfree.com/game/example-game",
  "ogTitle": "Action Games - ThePlayFree",
  "ogDescription": "Play free action games online",
  "ogImage": "https://cdn.example.com/og-image.jpg",
  "twitterTitle": "Action Games - ThePlayFree",
  "twitterDescription": "Play free action games online",
  "twitterImage": "https://cdn.example.com/twitter-image.jpg",
  "robots": "index, follow",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Example Game"
  }
}
```

**Response** (201 Created):
```json
{
  "message": "SEO metadata created",
  "data": {
    "id": 1,
    "entityType": "game",
    "entityId": 123,
    ...
  }
}
```

**Response** (200 OK - Updated):
```json
{
  "message": "SEO metadata updated",
  "data": {
    "id": 1,
    "entityType": "game",
    "entityId": 123,
    ...
  }
}
```

**Response** (404 Not Found):
```json
{
  "message": "game not found"
}
```

**Example**:
```bash
curl -X POST http://localhost:5000/api/seo/game/123 \
  -H "Content-Type: application/json" \
  -d '{
    "metaTitle": "Play Action Games Free Online",
    "metaDescription": "Discover 100+ free action games online.",
    "metaKeywords": "action, games, free",
    "ogImage": "https://cdn.example.com/og-image.jpg"
  }'
```

---

### 3. Delete SEO Metadata

**Endpoint**: `DELETE /seo/:entityType/:entityId`

**Description**: Delete SEO metadata for an entity

**Parameters**:
- `entityType` (string, required): `game` or `category`
- `entityId` (number, required): ID of the entity

**Response** (200 OK):
```json
{
  "message": "SEO metadata deleted"
}
```

**Response** (404 Not Found):
```json
{
  "message": "SEO metadata not found"
}
```

**Example**:
```bash
curl -X DELETE http://localhost:5000/api/seo/game/123
```

---

### 4. List SEO Metadata by Type

**Endpoint**: `GET /seo/type/:entityType`

**Description**: Get paginated list of all SEO metadata for a specific entity type

**Parameters**:
- `entityType` (string, required): `game` or `category`
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)

**Response** (200 OK):
```json
{
  "total": 150,
  "page": 1,
  "limit": 20,
  "pages": 8,
  "data": [
    {
      "id": 1,
      "entityType": "game",
      "entityId": 123,
      "metaTitle": "Play Action Games Free Online",
      "metaDescription": "Discover 100+ free action games online.",
      ...
    },
    {
      "id": 2,
      "entityType": "game",
      "entityId": 124,
      "metaTitle": "Play Adventure Games Free Online",
      "metaDescription": "Discover 50+ free adventure games online.",
      ...
    }
  ]
}
```

**Example**:
```bash
# Get first page
curl http://localhost:5000/api/seo/type/game

# Get page 2 with 50 items per page
curl http://localhost:5000/api/seo/type/game?page=2&limit=50
```

---

## Field Specifications

### metaTitle
- **Type**: String
- **Max Length**: 60 characters
- **Required**: No
- **Purpose**: SEO title tag
- **Best Practice**: 50-60 characters, include primary keyword
- **Example**: "Play Action Games Free Online | ThePlayFree"

### metaDescription
- **Type**: String
- **Max Length**: 160 characters
- **Required**: No
- **Purpose**: SEO meta description tag
- **Best Practice**: 150-160 characters, include keyword and CTA
- **Example**: "Discover 100+ free action games online. Play instantly in your browser. No downloads needed."

### metaKeywords
- **Type**: String (comma-separated)
- **Max Length**: 255 characters
- **Required**: No
- **Purpose**: SEO keywords meta tag
- **Best Practice**: 3-5 primary keywords
- **Example**: "action games, free games, online games, browser games"

### canonicalUrl
- **Type**: String (URL)
- **Max Length**: 500 characters
- **Required**: No
- **Purpose**: Canonical URL to prevent duplicate content
- **Best Practice**: Use absolute URL, point to preferred version
- **Example**: "https://theplayfree.com/game/example-game"

### ogTitle
- **Type**: String
- **Max Length**: 100 characters
- **Required**: No
- **Purpose**: Open Graph title for social sharing
- **Best Practice**: Compelling title for social media
- **Example**: "Action Games - ThePlayFree"

### ogDescription
- **Type**: String
- **Max Length**: 160 characters
- **Required**: No
- **Purpose**: Open Graph description for social sharing
- **Best Practice**: Engaging description for social media
- **Example**: "Play free action games online with millions of players"

### ogImage
- **Type**: String (URL)
- **Max Length**: 500 characters
- **Required**: No
- **Purpose**: Open Graph image for social sharing
- **Best Practice**: 1200x630px, high quality, relevant to content
- **Example**: "https://cdn.example.com/og-image.jpg"

### twitterTitle
- **Type**: String
- **Max Length**: 100 characters
- **Required**: No
- **Purpose**: Twitter Card title
- **Best Practice**: Optimized for Twitter (shorter, punchier)
- **Example**: "Action Games - Play Free"

### twitterDescription
- **Type**: String
- **Max Length**: 160 characters
- **Required**: No
- **Purpose**: Twitter Card description
- **Best Practice**: Concise, engaging for Twitter audience
- **Example**: "Play 100+ free action games online now"

### twitterImage
- **Type**: String (URL)
- **Max Length**: 500 characters
- **Required**: No
- **Purpose**: Twitter Card image
- **Best Practice**: 1200x630px or square format
- **Example**: "https://cdn.example.com/twitter-image.jpg"

### robots
- **Type**: String
- **Max Length**: 100 characters
- **Default**: "index, follow"
- **Required**: No
- **Purpose**: Robots meta tag
- **Valid Values**:
  - `index, follow` - Index page, follow links
  - `noindex, follow` - Don't index, follow links
  - `index, nofollow` - Index page, don't follow links
  - `noindex, nofollow` - Don't index, don't follow links
- **Example**: "index, follow"

### structuredData
- **Type**: JSON Object
- **Required**: No
- **Purpose**: JSON-LD structured data for rich snippets
- **Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Example Game",
  "description": "An awesome action game",
  "genre": "Action",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 8.5,
    "bestRating": 10,
    "worstRating": 0
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "message": "Entity not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error saving SEO metadata"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding:
- 100 requests per minute per IP
- 1000 requests per hour per IP

---

## Authentication

Currently no authentication is required. Consider adding:
- JWT token validation
- Role-based access control (admin only)
- API key authentication

---

## CORS

Configure CORS headers in backend:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', // Admin app
    'http://localhost:3001', // Frontend app
    'https://games-admin.vercel.app',
    'https://theplayfree.com'
  ],
  credentials: true
}));
```

---

## Pagination

List endpoints support pagination:
- `page`: Page number (1-indexed)
- `limit`: Items per page (default: 20, max: 100)

**Example**:
```bash
# Get page 2 with 50 items
curl http://localhost:5000/api/seo/type/game?page=2&limit=50
```

**Response includes**:
- `total`: Total number of items
- `page`: Current page number
- `limit`: Items per page
- `pages`: Total number of pages
- `data`: Array of items

---

## Caching Headers

Responses include caching headers:
```
Cache-Control: public, max-age=3600
```

To bypass cache:
```bash
curl -H "Cache-Control: no-cache" http://localhost:5000/api/seo/game/123
```

---

## Testing with cURL

### Create SEO metadata
```bash
curl -X POST http://localhost:5000/api/seo/game/1 \
  -H "Content-Type: application/json" \
  -d '{
    "metaTitle": "Play Free Games Online",
    "metaDescription": "Discover thousands of free games",
    "metaKeywords": "free games, online games",
    "ogImage": "https://example.com/image.jpg"
  }'
```

### Get SEO metadata
```bash
curl http://localhost:5000/api/seo/game/1
```

### Update SEO metadata
```bash
curl -X PUT http://localhost:5000/api/seo/game/1 \
  -H "Content-Type: application/json" \
  -d '{
    "metaTitle": "Updated Title"
  }'
```

### Delete SEO metadata
```bash
curl -X DELETE http://localhost:5000/api/seo/game/1
```

### List all game SEO metadata
```bash
curl http://localhost:5000/api/seo/type/game?page=1&limit=20
```

---

## Testing with Postman

1. Create new collection: "SEO Metadata API"
2. Add requests:
   - GET /seo/game/1
   - POST /seo/game/1
   - PUT /seo/game/1
   - DELETE /seo/game/1
   - GET /seo/type/game

3. Set environment variables:
   - `base_url`: http://localhost:5000/api
   - `entityType`: game
   - `entityId`: 1

4. Use in requests:
   - `{{base_url}}/seo/{{entityType}}/{{entityId}}`

---

## Webhook Events (Future)

Consider implementing webhooks for:
- `seo.metadata.created`
- `seo.metadata.updated`
- `seo.metadata.deleted`

Example webhook payload:
```json
{
  "event": "seo.metadata.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 1,
    "entityType": "game",
    "entityId": 123,
    "changes": {
      "metaTitle": {
        "old": "Old Title",
        "new": "New Title"
      }
    }
  }
}
```
