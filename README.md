# VibeStrings - Guitar Shop Application

This application fetches and displays guitar brands, models, and detailed product information using Apollo Client and a GraphQL API. Users can explore guitars with various features like filtering, search, and infinite scrolling. A language switcher in the footer allows toggling between English and Macedonian for an improved user experience.

## Features

**Guitar Details**: Displays guitar name, brand, type, specifications, and musician information.

**Filters**: Filter guitars by type and search by name.

**Infinite Scrolling**: Load more guitar models dynamically as you scroll.

**Language Support**: Toggle between English and Macedonian in the footer.

**Error Handling**: Gracefully display error and loading states.

**Responsive UI**: Styled with CSS to be mobile-friendly with orange accent colors.

**Musicians Pagination**: View musicians who use each guitar with dots navigation (2 per page).

## Technologies

**Frontend**: React 19.1.1

**GraphQL**: Apollo Client 3.13.9

**API**: Custom Guitar Shop GraphQL API

**Styling**: CSS3 with responsive design

**Icons**: React Icons (including butterfly branding elements)

**Localization**: react-i18next for English and Macedonian language support

## Setup

Follow these steps to get the app running locally:

**Clone the Repository**: 
```bash
git clone <repository-url>
cd guitar-shop-assignment
```

**Install Dependencies**: 
```bash
npm install --legacy-peer-deps
```

**Start the App**: 
```bash
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

**Apollo Client**: Fetches guitar data with filtering and pagination from the GraphQL API.

**Infinite Scrolling**: Automatically loads more guitar models as you scroll on the models page.

**Filters/Search**: Dynamic filtering by guitar type and search functionality (press Enter to search).

**Language Switcher**: Switches all text content between English and Macedonian using react-i18next while preserving orange accent styling.

**Musicians Tab**: Displays musicians who use each guitar with paginated navigation showing 2 musicians at a time.

**Hero Sections**: Dynamic hero sections on each page with brand-specific content and proper styling.
