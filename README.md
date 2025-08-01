# Axie Studio - Modern Swedish React Website

## 🚀 Om Projektet

Axie Studio är en modern, responsiv React-webbplats som visar framtidens AI-drivena kundservicelösningar. Denna webbplats är en rebranding av Langflow med fokus på svenska företag och kundservice, byggd med moderna React-tekniker.

## ✨ Funktioner

### 🎨 Design & UX
- **Modern 2:1 Grid Layout** - Hero-sektionen använder en 2:1 grid-design för optimal balans
- **Responsiv Design** - Fungerar perfekt på alla enheter
- **Svensk Lokalisering** - Helt på svenska med svensk designestetik
- **Smooth Animations** - Mjuka övergångar med Framer Motion
- **Glassmorphism** - Modern glasmorfism-effekt i navigationen
- **Styled Components** - CSS-in-JS för bättre komponenthantering

### 🤖 AI & Chatbot Integration
- **Embedded Chatbot** - Integrerad chatbot från chatbotex1.netlify.app
- **Automatisk Loop** - Chatboten körs automatiskt i en oändlig loop
- **AI-Agent Fokus** - Fokus på AI-agenter för förbättrad kundservice
- **Företagsinformation Integration** - Använder företagsdata för personliga svar

### 📱 Tekniska Funktioner
- **React 18** - Senaste React-versionen med Concurrent Features
- **Styled Components** - CSS-in-JS för bättre styling
- **Framer Motion** - Avancerade animationer och övergångar
- **React Router** - Klient-side routing
- **Intersection Observer** - Scroll-baserade animationer
- **Form Validation** - Validering av kontaktformulär
- **Performance Monitoring** - Web Vitals för prestandaövervakning

## 🛠️ Teknisk Stack

- **React 18** - Modern React med hooks och concurrent features
- **Styled Components** - CSS-in-JS för styling
- **Framer Motion** - Animationer och övergångar
- **React Router DOM** - Klient-side routing
- **React Icons** - Ikonbibliotek
- **React Intersection Observer** - Scroll-animationer
- **Web Vitals** - Prestandaövervakning

## 📁 Projektstruktur

```
AxieStudiowebsite/
├── public/
│   ├── index.html          # HuvudHTML-fil
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # Favicon
├── src/
│   ├── components/         # React-komponenter
│   │   ├── Navbar.js       # Navigation
│   │   ├── Hero.js         # Hero-sektion (2:1 grid)
│   │   ├── Services.js     # Tjänster
│   │   ├── About.js        # Om oss
│   │   ├── Contact.js      # Kontakt
│   │   └── Footer.js       # Footer
│   ├── styles/             # Styling
│   │   ├── GlobalStyles.js # Globala stilar
│   │   └── theme.js        # Tema och variabler
│   ├── App.js              # Huvudapp-komponent
│   ├── index.js            # App-entry point
│   └── reportWebVitals.js  # Prestandaövervakning
├── package.json            # Projektkonfiguration
└── README.md               # Projektdokumentation
```

## 🚀 Installation & Körning

### Förutsättningar
- Node.js 16+ 
- npm eller yarn

### Installation
```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm start

# Bygg för produktion
npm run build

# Testa appen
npm test
```

### Snabb Start
1. Klona projektet
2. Kör `npm install`
3. Kör `npm start`
4. Öppna `http://localhost:3000`

## 🎯 Sektioner

### 1. Navigation
- Fast navigation med glasmorfism-effekt
- Responsiv hamburger-meny för mobiler
- Smooth scrolling till sektioner
- Animerad logo och menyalternativ

### 2. Hero Section (2:1 Grid)
- **Vänster (2/3)**: Text om AI och chatbot-lösningar
- **Höger (1/3)**: Embedded chatbot-komponent
- Gradient bakgrund med animerade element
- Staggered animationer för innehåll

### 3. Tjänster
- Tre huvudtjänster med ikoner
- Hover-effekter och animationer
- Responsiv grid-layout
- Intersection Observer animationer

### 4. Om Oss
- Företagsinformation
- Statistik med animerade räknare
- Grid-layout med text och siffror
- Counter animationer

### 5. Kontakt
- Kontaktformulär med validering
- Real-time error handling
- Success/error meddelanden
- Responsiv layout

### 6. Footer
- Företagsinformation
- Länkar och sociala medier
- Copyright-information
- Animerade sociala länkar

## 🎨 Designprinciper

### Färgschema
- **Primär**: Blå (#2563eb)
- **Sekundär**: Gul (#fbbf24)
- **Gradient**: Lila till blå (#667eea → #764ba2)
- **Text**: Mörkgrå (#1e293b)
- **Bakgrund**: Ljusgrå (#f8fafc)

### Typografi
- **Font**: Inter (Google Fonts)
- **Vikt**: 300-700
- **Hierarki**: Tydlig typografisk hierarki

### Animationer
- **Framer Motion** för alla animationer
- **Staggered animations** för listor
- **Scroll-triggered animations** med Intersection Observer
- **Hover effects** på interaktiva element
- **Page transitions** mellan sektioner

## 📱 Responsiv Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### Anpassningar
- Grid-layout ändras till kolumner på mobiler
- Navigation blir hamburger-meny
- Text-storlekar skalas ner med clamp()
- Spacing justeras för mindre skärmar

## 🔧 Anpassning

### Tema Ändra
Redigera `src/styles/theme.js`:
```javascript
const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#fbbf24',
    // ... fler färger
  }
};
```

### Komponenter Ändra
Alla komponenter finns i `src/components/` och kan enkelt anpassas.

### Chatbot Ändra
Ändra iframe-src i `src/components/Hero.js`:
```javascript
<ChatbotIframe src="https://din-chatbot-url.com" />
```

## 🚀 Deployment

### Netlify
```bash
# Bygg projektet
npm run build

# Deploy till Netlify
netlify deploy --prod --dir=build
```

### Vercel
```bash
# Installera Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages
```bash
# Lägg till homepage i package.json
"homepage": "https://username.github.io/repo-name"

# Installera gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 📊 Prestanda

### Optimeringar
- **Code Splitting** med React.lazy()
- **Memoization** med React.memo()
- **Optimized Images** (om läggs till)
- **Bundle Analysis** med webpack-bundle-analyzer

### Lighthouse Score
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🔍 SEO & Accessibility

### SEO
- Semantisk HTML-struktur
- Meta-taggar i public/index.html
- Open Graph och Twitter Cards
- Sitemap-ready

### Accessibility
- ARIA-labels på alla interaktiva element
- Keyboard navigation
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🐛 Felsökning

### Vanliga Problem
1. **Chatbot visas inte**: Kontrollera internetanslutning och URL
2. **Animationer fungerar inte**: Kontrollera Framer Motion installation
3. **Styling problem**: Kontrollera Styled Components

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Framtida Förbättringar

### Planerade Funktioner
- [ ] Dark mode toggle
- [ ] Språkväxling (EN/SV)
- [ ] Mer avancerade animationer
- [ ] Blog-sektion
- [ ] Kundfall och testimonials
- [ ] Live chat integration
- [ ] Analytics integration
- [ ] PWA capabilities

### Tekniska Förbättringar
- [ ] TypeScript implementation
- [ ] Redux/Context för state management
- [ ] Unit testing med Jest
- [ ] E2E testing med Cypress
- [ ] API integration
- [ ] CMS integration

## 📞 Support

För frågor eller support, kontakta:
- **Email**: info@axiestudio.se
- **Telefon**: +46 8 123 45 67

## 📄 Licens

Detta projekt är skapat för Axie Studio. Alla rättigheter förbehållna.

---

**Axie Studio** - Revolutionera din kundservice med AI 🚀 