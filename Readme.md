# 🏆 Winner Predictor Backend

A **Node.js + Express + MongoDB** backend that predicts the **winner** and **runner-up** among a set of players using two algorithms: **Tournament (Divide & Conquer)** and **Two-Scan (Iterative)**.

This project is perfect for exploring **algorithm optimization**, **data modeling with MongoDB**, and **backend API development**.

---

## 🚀 Features

### Player Management
- Generate **random players** with random scores.
- Add players **manually** (name + score).
- View all players.
- Delete all players.

### Algorithms

#### Two-Scan (Iterative)
- Simple iterative approach.
- Finds **winner** and **runner-up**.
- Compares all remaining players → `2n - 3` comparisons.

#### Tournament (Divide & Conquer)
- Recursive approach for fewer comparisons.
- Tracks players defeated by the winner to determine runner-up.
- Comparisons closer to theoretical minimum: `n + log2(n) - 2`.

### Analytics
- Tracks the **number of comparisons** made by each algorithm.
- Useful for **algorithm performance analysis**.

### Tech Stack
- **Node.js + Express** for REST API.
- **MongoDB Atlas** for persistent player storage.
- **CORS enabled** for frontend integration.

---

## 📦 API Endpoints

| Method | Endpoint                    | Description                                  |
|--------|----------------------------|----------------------------------------------|
| GET    | `/api/players`             | Get all players                              |
| POST   | `/api/players`             | Add a new player                             |
| POST   | `/api/players/generate`    | Generate random players                      |
| DELETE | `/api/players`             | Delete all players                           |
| POST   | `/api/run/two-scan`        | Run Two-Scan algorithm                        |
| POST   | `/api/run/tournament`      | Run Tournament (Divide & Conquer) algorithm |

---

## ⚙️ How It Works

### Two-Scan Algorithm
1. Iteratively find the **maximum score** → winner.
2. Remove winner and find next **maximum score** → runner-up.
3. Total comparisons: `2n - 3`.

### Tournament Algorithm
1. Recursively divide players into **pairs**.
2. Compare pairs and propagate winners upward.
3. Track players defeated by the winner to find **runner-up**.
4. Total comparisons: `n + log2(n) - 2` (theoretical minimum).
