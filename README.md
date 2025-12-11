# Búsqueda de libros (PWA)

Esta es una Progressive Web App (PWA) creada con Next.js que permite buscar libros usando la API de Google Books, guardar los últimos libros consultados en `localStorage` para acceso rápido sin conexión y ofrecer una experiencia instalable en dispositivos móviles y de escritorio.

## Qué incluye este repositorio

- `app/` – Rutas y componentes principales de la app (Next.js App Router).
- `components/` – Componentes reutilizables (barra de búsqueda, tarjetas de libro, grid, UI común).
- `lib/` – Lógica de acceso a la API de Google Books y utilidades (`google-books-api.ts`, `storage.ts`).
- `public/` – Activos públicos y `sw.js` (service worker).
- `types/` – Definiciones TypeScript para `Book` y `StoredBook`.
- `package.json` – Scripts y dependencias.

### Tecnologías y dependencias principales

- next 16.x
- react 19.x
- TypeScript
- axios (para llamadas HTTP)
- tailwindcss
- next-pwa (presente en dependencias; el proyecto usa un SW manual en `public/sw.js`)
- lucide-react para iconos

## Cómo ejecutar la app (desarrollo)

Este proyecto puede ejecutarse con Bun o con Node. Aquí se muestra cómo hacerlo con Bun (recomendado por el usuario):

1. Instala Bun: https://bun.sh/
2. En la raíz del proyecto, instala dependencias y ejecuta el servidor en modo desarrollo:

```bash
bun install
bun dev
```

Si prefieres Node (opcional):

```bash
npm install
npm run dev
```

### Notas sobre HTTPS local

El script de desarrollo usa `next dev --experimental-https` ya que las PWAs requieren HTTPS para ciertas funcionalidades (service workers, instalación). En producción, GitHub Pages sirve sobre HTTPS automáticamente.

## Build y despliegue

1. Generar build estático:

```bash
bun build # si usas Bun para correr `next build` a través de npm scripts, usa: bun x npm run build
# o con npm
npm run build
```

2. Exportar para GitHub Pages (u otra carpeta `out`):

```bash
npm run build
npm run export # si tienes configurado un export; este proyecto usa `gh-pages -d out` en `deploy`
```

Nota: El proyecto ya incluye un script `deploy` que usa `gh-pages -d out`. Ajusta según tu flujo de build/export.

## Service worker y offline

- El proyecto incluye un `public/sw.js` con una estrategia sencilla: precachea `./`, `./index.html`, `./manifest.json` y `./offline.html`. Maneja llamadas API con `network-first` y activos estáticos con `cache-first`.
- Para que el sw encuentre `offline.html` en la ruta correcta tras desplegar en un subdirectorio, usa rutas relativas en `sw.js` (ya usa `"./offline.html"`) o actualiza `CACHE_NAME`/rutas en tiempo de build.

## LocalStorage: últimos 5 libros

- La lógica está en `lib/storage.ts`. Guarda objetos `StoredBook` completos en la clave `book_recent_books` y limita a 5 entradas.
- Al iniciar la aplicación (`app/page.tsx`), se carga `getRecentBooks()` para mostrar las tarjetas (no solo keys).