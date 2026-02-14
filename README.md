# 🎓 University Finder

> A modern, full-stack web application for discovering and comparing universities worldwide. Built with Next.js, React, and Tailwind CSS.

![University Finder](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

## ✨ Features

### 🔍 Smart Search & Filtering
- **Real-time Search**: Search universities by name, city, or country
- **Multi-Country Filter**: Select multiple countries simultaneously
- **Tuition Range Filter**: Slider with quick preset buttons (Free, <$10k, <$30k, <$50k)
- **Ranking Filter**: Filter by world ranking (Top 10, Top 25, Top 50, Top 100)
- **Server-Side Processing**: All filtering happens on the backend for optimal performance

### 🏛️ Comprehensive University Data
- **30+ Real Universities**: MIT, Stanford, Cambridge, Oxford, and more
- **Detailed Information**:
  - World Rankings
  - Tuition Fees
  - Established Year
  - Location (City, Country)
  - University Type (Public/Private)
  - Research Output Levels
  - Available Programs
  - Acceptance Rates
  - Student Population
  - International Student Statistics

### 🔄 Compare Feature
- Select up to 2 universities
- Side-by-side comparison
- Visual indicators for better values
- Compare all metrics including programs

### 🎨 Beautiful UI/UX
- Modern, clean design
- Responsive layout (mobile, tablet, desktop)
- Smooth animations
- Intuitive navigation
- Custom typography (Playfair Display + Manrope)
- Professional color scheme

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Installation

1. **Clone or Download the Project**
```bash
cd university-finder-js
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open in Browser**
```
http://localhost:3000
```

That's it! 🎉

## 📁 Project Structure

```
university-finder-js/
├── app/
│   ├── api/                    # API Routes (Server-side)
│   │   ├── universities/
│   │   │   └── route.js       # Main filtering API
│   │   └── compare/
│   │       └── route.js       # Compare API
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Main page component
│
├── components/
│   └── ui/                    # Reusable UI components
│       ├── Button.js
│       ├── Input.js
│       ├── Badge.js
│       └── Card.js
│
├── data/
│   └── universities.json      # University database
│
├── lib/
│   ├── utils.js              # Utility functions
│   └── universityData.js     # Data helpers
│
└── public/                    # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set

### Backend
- **Next.js API Routes** - Server-side API
- **Server-Side Filtering** - Optimized data processing

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📖 Usage Guide

### Searching for Universities

1. **Use the Search Bar**
   - Type university name, city, or country
   - Results update in real-time

2. **Apply Filters**
   - **Country**: Check boxes for desired countries
   - **Tuition**: Move slider or click preset buttons
   - **Ranking**: Move slider or click Top 10/25/50

3. **View Results**
   - Browse university cards
   - See key metrics at a glance
   - Click to view more details

### Comparing Universities

1. Click **"Select to Compare"** on any university card
2. Select a second university
3. Click **"Compare Now"** in the floating button (bottom-right)
4. View side-by-side comparison

### Clearing Filters

- Click **"Clear All Filters"** button in the sidebar
- All filters reset to default values

## 🎨 Customization

### Modify Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Add More Universities

Edit `data/universities.json`:
```json
{
  "id": "31",
  "name": "Your University",
  "country": "Your Country",
  "city": "Your City",
  "tuitionFee": 25000,
  "ranking": 50,
  "establishedYear": 1950,
  "programs": ["Program1", "Program2"],
  ...
}
```

### Modify Filters

Edit `app/page.js`:
```javascript
// Add new filter state
const [newFilter, setNewFilter] = useState('');

// Add to fetchUniversities function
if (newFilter) params.set('newFilter', newFilter);
```

### Change Layout

Modify `app/page.js` JSX to adjust the layout and design.

## 🔧 API Reference

### GET `/api/universities`

Returns filtered list of universities.

**Query Parameters:**
- `search` - Search term (string)
- `countries` - Comma-separated country names
- `minTuition` - Minimum tuition fee (number)
- `maxTuition` - Maximum tuition fee (number)
- `minRanking` - Minimum ranking (number)
- `maxRanking` - Maximum ranking (number)
- `minYear` - Minimum established year (number)
- `maxYear` - Maximum established year (number)
- `programs` - Comma-separated program names
- `type` - University type (Public/Private)
- `researchOutput` - Research output level
- `sortBy` - Sort field (name/ranking/tuitionFee/establishedYear)
- `sortOrder` - Sort order (asc/desc)

**Response:**
```json
{
  "universities": [...],
  "total": 30
}
```

### GET `/api/compare`

Returns details for comparing universities.

**Query Parameters:**
- `ids` - Comma-separated university IDs (exactly 2 required)

**Response:**
```json
{
  "universities": [...]
}
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Performance

- ✅ Server-side filtering for scalability
- ✅ Optimized Next.js rendering
- ✅ Fast page loads
- ✅ Responsive design
- ✅ SEO-friendly

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json .next
npm install
```

### Styles not loading
```bash
rm -rf .next
npm run dev
```

### Node version issues
Make sure you have Node.js 18+ installed:
```bash
node --version  # Should be 18.0.0 or higher
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Roadmap

Future enhancements planned:

- [ ] Advanced compare modal with detailed metrics
- [ ] User accounts and saved favorites
- [ ] Additional filter options (scholarships, accommodation)
- [ ] University detail pages
- [ ] Interactive maps
- [ ] Export comparison results
- [ ] More animation effects
- [ ] Dark mode support
- [ ] Multi-language support

## 👨‍💻 Author

Created as a demonstration of modern web development practices with Next.js and React.

## 🙏 Acknowledgments

- University data compiled from various public sources
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Usage Guide](#-usage-guide)
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

⭐ Star this repo if you find it helpful!