# Fortryll 🌟

<div align="center">
  <img src="assets/fortryll-logo.svg" alt="Fortryll Logo" width="120" />
  <h3>Din Magiske Historieforteller</h3>
</div>

## Om Prosjektet

Fortryll er en interaktiv plattform for barnehistorier som kombinerer AI-drevet historiefortelling med personlig tilpasning. Plattformen lar barn og foreldre skape, lese og dele unike historier på tvers av enheter.

### Hovedfunksjoner

- 📚 Personlige historier tilpasset barnets alder
- 🎨 Interaktiv karakterskaper
- 🔊 Tekst-til-tale funksjonalitet
- 📱 Kryssplattform-støtte
- 🖨️ Print-on-demand integrasjon

## Kom i Gang

### Forutsetninger

- Node.js 18.x eller nyere
- PocketBase (for backend)
- Miljøvariabler konfigurert (.env)

### Installasjon

1. Klon repositoriet:
```bash
git clone https://github.com/fortryll/historiemagi.git
cd historiemagi-app
```

2. Installer avhengigheter:
```bash
npm install
```

3. Kopier miljøvariabel-malen:
```bash
cp .env.example .env
```

4. Start utviklingsserveren:
```bash
npm run dev
```

## API Dokumentasjon

### Autentisering

\`\`\`typescript
// Registrer ny bruker
POST /api/auth/register
{
  "email": string,
  "password": string,
  "name": string
}

// Logg inn
POST /api/auth/login
{
  "email": string,
  "password": string
}
\`\`\`

### Historie-API

\`\`\`typescript
// Hent historier
GET /api/stories

// Opprett historie
POST /api/stories
{
  "title": string,
  "ageGroup": "3-5" | "5-8" | "8-12",
  "theme": string,
  "content": string
}
\`\`\`

## Bidra til Prosjektet

1. Fork repositoriet
2. Opprett en feature branch (\`git checkout -b feature/MinNyeFunksjon\`)
3. Commit endringene (\`git commit -m 'Legg til MinNyeFunksjon'\`)
4. Push til branchen (\`git push origin feature/MinNyeFunksjon\`)
5. Åpne en Pull Request

## Lisens

Dette prosjektet er lisensiert under MIT-lisensen. Se [LICENSE](LICENSE) for detaljer.

## Kontakt

- Nettside: [fortryll.no](https://fortryll.no)
- E-post: kontakt@fortryll.no