# Clinical Records Management

A React frontend application for managing clinical patient records, built as part of the Q-Centrix technical assessment.

## Features

- **Records Table** — View all clinical records with sortable columns
- **Search** — Search by patient name, ID, or diagnosis
- **Filters** — Filter by status (Active/Discharged/Pending/Cancelled) and department
- **Create Record** — Form with full validation (client + server-side)
- **Edit Record** — Update existing records
- **Delete Record** — Delete with confirmation dialog
- **Responsive Design** — Table on desktop, cards on mobile
- **Dashboard** — Stats cards and department distribution chart
- **Pagination** — Navigate through records (10 per page)

## Tech Stack

- React (Create React App)
- Tailwind CSS
- Custom hooks for data fetching
- No UI libraries — all components built from scratch

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Setup

1. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   Runs on http://localhost:3001

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Runs on http://localhost:3000

## Project Structure

```
frontend/src/
├── api/           # API client (fetch wrapper)
├── components/
│   ├── common/    # Reusable UI components (Button, Input, Modal, etc.)
│   ├── dashboard/ # Stats cards and charts
│   ├── forms/     # Record form and modal
│   ├── layout/    # App shell, sidebar, header
│   └── records/   # Records table, cards, search, filters
├── hooks/         # Custom hooks (useRecords, useRecord, useDebounce, etc.)
└── utils/         # Constants, formatters, validators
```

## Notes

- Backend uses in-memory storage — data resets on server restart
- All dates in YYYY-MM-DD format for API, formatted nicely in the UI
- Department field uses native datalist for autocomplete (simpler than custom dropdown)
