# Pokédex

Aplicación web de una Pokédex construida con **React 19**, **Redux Toolkit** y **Vite**, que consume la [PokéAPI](https://pokeapi.co/) para listar, filtrar y consultar el detalle de los Pokémon.

Repositorio: https://github.com/Ciberstein/Pokedex

---

## Características

- **Pantalla de bienvenida**: el entrenador ingresa su nombre antes de acceder a la Pokédex.
- **Rutas protegidas**: `/pokedex` y `/pokedex/:id` solo son accesibles si hay un nombre de entrenador en el store; en caso contrario redirige al inicio.
- **Listado de Pokémon** con tarjetas que muestran sprite oficial, tipos y estadísticas base.
- **Búsqueda** por nombre o ID (navega directamente al detalle).
- **Filtro por tipo**, alimentado dinámicamente desde el endpoint `/type` de la PokéAPI.
- **Paginación en cliente** con tamaño de página configurable (4, 8, 12, 16 o 20).
- **Vista de detalle** con artwork oficial, tipos, altura, peso, gráfico de estadísticas y habilidades.
- **Pantallas de estado**: cargando y "Pokémon no encontrado".
- Estilos temáticos por tipo de Pokémon y diseño responsive.

---

## Stack

| Herramienta | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | Librería de UI |
| [Vite](https://vite.dev/) | 8 | Bundler y servidor de desarrollo |
| [Redux Toolkit](https://redux-toolkit.js.org/) | 2 | Estado global |
| [React Redux](https://react-redux.js.org/) | 9 | Bindings de Redux para React |
| [React Router](https://reactrouter.com/) | 7 | Enrutamiento (`HashRouter`) |
| [Axios](https://axios-http.com/) | 1 | Cliente HTTP |

> Se usa `HashRouter` en lugar de `BrowserRouter` para que la app funcione en hosting estático (GitHub Pages, etc.) sin necesidad de configurar reescritura de rutas en el servidor.

---

## Requisitos

- **Node.js >= 20.19** (requerido por Vite 8)
- npm 10 o superior

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/Ciberstein/Pokedex.git
cd Pokedex

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo (http://localhost:5173)
npm run dev
```

### Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Compila la app para producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

---

## Estructura del proyecto

```
POKEDEX/
├── index.html                 # Punto de entrada HTML
├── vite.config.js             # Configuración de Vite
├── public/                    # Assets estáticos (imágenes, video de fondo)
└── src/
    ├── main.jsx               # Bootstrap: HashRouter + Provider de Redux
    ├── App.jsx                # Definición de rutas
    ├── App.css / index.css    # Estilos globales y por tipo de Pokémon
    ├── pages/
    │   ├── Home.jsx           # Formulario de nombre del entrenador
    │   ├── Pokedex.jsx        # Listado, búsqueda, filtro y paginación
    │   ├── PokeInfo.jsx       # Detalle de un Pokémon
    │   └── ProtectedRoutes.jsx# Guard de rutas
    ├── components/
    │   ├── Home/              # PokeHeader, PokeFooter
    │   ├── Pokedex/           # PokeCard, SelectTypes, Pagination
    │   └── Screens/           # Loading, NotFound
    └── store/
        ├── index.js           # configureStore
        └── slices/
            ├── trainerName.slice.js  # Nombre del entrenador
            └── isLoading.slice.js    # Estado de carga global
```

---

## Rutas

| Ruta | Componente | Protegida |
|---|---|---|
| `/` | `Home` | No |
| `/pokedex` | `Pokedex` | Sí |
| `/pokedex/:id` | `PokeInfo` | Sí |

`:id` acepta tanto el ID numérico como el nombre del Pokémon (por ejemplo `#/pokedex/25` o `#/pokedex/pikachu`).

---

## Estado global (Redux)

| Slice | Estado inicial | Acción | Descripción |
|---|---|---|---|
| `nameTrainer` | `''` | `setNameTrainer(name)` | Nombre del entrenador; habilita las rutas protegidas |
| `loadScreen` | `false` | `setIsLoading(bool)` | Controla la pantalla de carga durante las peticiones |

---

## API

Se consume la [PokéAPI v2](https://pokeapi.co/docs/v2) (pública, sin autenticación):

- `GET /pokemon?limit=30&offset=0` — listado inicial de Pokémon
- `GET /pokemon/{id|name}` — detalle de un Pokémon
- `GET /type` — catálogo de tipos para el filtro
- `GET /type/{id}` — Pokémon de un tipo específico

---

## Notas y limitaciones conocidas

- El nombre del entrenador **no se persiste**: al recargar la página se pierde y la app redirige al inicio. Persistirlo requeriría `localStorage` o `redux-persist`.
- El listado principal está limitado a los **primeros 30 Pokémon** (`limit=30`); la paginación opera sobre ese conjunto ya cargado en cliente.
- Cada `PokeCard` realiza su propia petición de detalle, por lo que el listado genera N peticiones adicionales.
- Los GIF de las pantallas de carga y "no encontrado" se enlazan desde dominios externos.

---

## Autor

**Daniel Rojas** (Cyberstein)

[GitHub](https://github.com/Ciberstein) · [LinkedIn](https://www.linkedin.com/in/cyberstein/)
