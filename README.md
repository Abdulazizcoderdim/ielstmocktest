# IELTS Mock Test Mini Platform API

## Asosiy URL

http://localhost:5000/api

---

## **Admin Endpoints (CRUD)**

### 1. Barcha savollarni olish (sahifalangan)

- **Endpoint:** `GET /admin/questions`
- **Query Parameters:**
  - `page` (ixtiyoriy, default: 1)
  - `size` (ixtiyoriy, default: 10)
- **Response:**

```json
{
  "content": [
    {
      "_id": "64dabc1234",
      "text": "Sample question?",
      "options": ["A", "B", "C", "D"],
      "correctAnswerIndex": 2
    }
  ],
  "page": {
    "number": 1,
    "size": 10,
    "totalElements": 20,
    "totalPages": 2
  }
}
```

### 2. Savol yaratish

- Endpoint: `POST /admin/questions`

- Request Body:

```json
{
  "text": "What is the capital of France?",
  "options": ["Berlin", "Paris", "London", "Rome"],
  "correctAnswerIndex": 1
}
```

- Response: 201 Created

```json
{
  "_id": "64dabc5678",
  "text": "What is the capital of France?",
  "options": ["Berlin", "Paris", "London", "Rome"],
  "correctAnswerIndex": 1
}
```

### 3. Bitta savolni olish

Endpoint: `GET /admin/questions/:id`

- Response: 200 OK

```json
{
  "_id": "64dabc5678",
  "text": "What is the capital of France?",
  "options": ["Berlin", "Paris", "London", "Rome"],
  "correctAnswerIndex": 1
}
```

### 4. Savolni yangilash

- Endpoint: `PUT /admin/questions/:id`

- Request Body: (yangilamoqchi bo'lgan har qanday maydonlar)

```json
{
  "text": "Updated question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswerIndex": 0
}
```

- Response: 200 OK

```json
{
  "_id": "64dabc5678",
  "text": "Updated question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswerIndex": 0
}
```

### 5. Savolni o'chirish

- Endpoint: `DELETE /admin/questions/:id`

- Response: 204 No Content

## **Foydalanuvchi Endpoints (Test)**

### 1. Test savollarini olish

- Endpoint: `GET /test`

- Response: 200 OK

```json
[
  {
    "_id": "64dabc1234",
    "questionText": "Sample question?",
    "options": ["A", "B", "C", "D"]
  }
]
```

### 2. Javoblarni yuborish

- Endpoint: `POST /submit`

- Request Body:

```json
{
  "answers": [
    { "questionId": "64dabc1234", "selectedOption": 2 },
    { "questionId": "64dabc5678", "selectedOption": 1 }
  ]
}
```

- Response: 200 OK

```json
{
  "correctCount": 1,
  "total": 2,
  "percentage": "50.00"
}
```
