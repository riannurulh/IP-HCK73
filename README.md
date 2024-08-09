# IP-HCK73
Endpoints
1. User Registration
- URL: /register
- Method: POST
- Description: Register a new user
- Request Body:
```json
{
"email": "string",
"password": "string",
"height": "number",
"weight": "number",
"weightGoalOn30day": "number",
"gender": "string"
}
```
- Response (201 & Created)*
```json
{
"message": "User registered successfully",
"userId": "number"
}
```
2. User Login
- URL: /login
- Method: POST
- Description: Authenticate a user
- Request Body:
```json
{
"email": "string",
"password": "string"
}
```
- Response (200 & OK)*
```json
{
"access_token": "string"
}
```
3. Get Plans
- URL: /plans
- Method: GET
- Description: Retrieve user's plans
- Authentication: Required
- Response (200 & OK)*
```json
[
{
"id": "number",
"userId": "number",
"planDetails": "object",
"createdAt": "date",
"updatedAt": "date"
}
]
```
4. Delete Plan
- URL: /plans/:id
- Method: DELETE
- Description: Delete a specific plan
- Authentication: Required
- Parameters: id [number] - Plan ID
- Response (200 & OK)*
```json
{
"message": "Plan successfully deleted"
}
```
Error Responses
- Response (400 & Bad Request)*
```json
{
"message": "Validation error message"
}
```
- Response (401 & Unauthorized)*
```json
{
"message": "Invalid credentials"
}
```
- Response (403 & Forbidden)*
```json
{
"message": "Access denied"
}
```
- Response (404 & Not Found)*
```json
{
"message": "Resource not found"
}
```
- Response (500 & Internal Server Error)*
```json
{
"message": "Internal server error"
}
```