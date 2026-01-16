# Booklist Front End

Booklist uses a headless CMS setup through WordPress with custom API endpoints. 

**Endpoints**
- Books API Endpoint: [https://api.readthatbooklist.com/wp-json/booklist/v1/books](https://api.readthatbooklist.com/wp-json/booklist/v1/books) 
- Individual Book API Endpoint: [https://api.readthatbooklist.com/wp-json/booklist/v1/book?slug={slug}](https://api.readthatbooklist.com/wp-json/booklist/v1/book?slug=a-court-of-thorns-and-roses)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
To deploy changes to Vercel, push changes to the main branch. I will probably change this to the production branch eventually, but not today.

## Tech Stack
- React
- TypeScript
- Next.js
- CSS Modules
- Deployed on Vercel

## Project Structure
**app/**
- all the routing and base structure and such

**components/**
- the React components (obviously lol). I looked up the most common file structures and have tried to follow those conventions. Open to feedback.

**contexts/**
- The Context Providers I’ve been using to track different state variables that are used more globally than normal React props. Happy to discuss this more if anyone is interested

**hooks/**
- My custom hooks, which are basically reusable React functions….but custom hooks are special because they can access all the other React hooks like useState and useEffect. Also happy to discuss this if anyone is interested

**lib/**
- My utility functions and global variables, as well as the Fetch fuction

**types/**
- My frequently used TypeScript types/interfaces


### Last Updated: 1/16/2026