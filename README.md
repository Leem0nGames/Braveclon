# 🎮 Braveclon - Brave Frontier MVP

<div align="center">
  
**Un RPG táctico por turnos con mecánicas gacha, ventajas elementales y Brave Bursts**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.9-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-06b6d4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Roadmap](#roadmap)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Características Principales](#características-principales)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 📖 Descripción

**Braveclon** es un MVP (Producto Mínimo Viable) de un juego RPG táctico por turnos inspirado en Brave Frontier. El juego combina mecánicas de gacha, gestión de unidades, combates por turnos y un sistema de fusión para mejorar personajes. Incluye innovadoras características como el escaneo de códigos QR para obtener recompensas y la integración con IA generativa de Google Gemini.

---

## ✨ Características

### 🎯 Mecánicas de Juego

- **Sistema de Combate por Turnos**: Batallas estratégicas 1v1 o en equipo
- **Ventajas Elementales**: Fuego, Agua, Tierra, Luz y Oscuridad con interacciones tácticas
- **Brave Bursts**: Habilidades especiales que se cargan con strategia y timing
- **Sistema Gacha**: Caza de unidades y equipo mediante invocar con gemas/moneda
- **Fusión de Unidades**: Mejora tus unidades combinándolas para aumentar su poderío
- **Sistema de Energía**: Recarga automática de energía para realizar misiones

### 🎪 Características de Interface

- **Pantalla de Inicio**: Hub central del juego con acceso rápido a todas las funciones
- **Pantalla de Invocación (Summon)**: Sistema gacha para obtener nuevas unidades
- **Pantalla de Unidades**: Gestión y equipo de tu colección de héroes
- **Pantalla de Misiones (Quest)**: Aventuras por etapas con dificultad progresiva
- **Pantalla de Batalla**: Combate interactivo con mecánicas de turnos
- **Caza de QR**: Escanea códigos QR para obtener recompensas especiales
- **Pantalla de Fusión**: Combina unidades para crear guerreros más poderosos

### 🎨 Experiencia del Usuario

- **Diseño Responsive**: Optimizado para dispositivos móviles y desktop
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales atractivos
- **Interfaz Intuitiva**: Navegación clara entre pantallas y funcionalidades
- **Sistema de Alertas**: Notificaciones en tiempo real de eventos importantes

---

## 📦 Requisitos Previos

- **Node.js** (v18 o superior recomendado)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)
- **Clave API de Gemini** (para características de IA)
- **Navegador moderno** con soporte para cámara (para escaneo QR)

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Leem0nStudio/Braveclon.git
cd Braveclon
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_clave_api_aqui
```

Para obtener tu clave Gemini API, visita [Google AI Studio](https://ai.google.dev/).

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

El juego estará disponible en `http://localhost:3000`

---

## 💻 Uso

### Navegación Principal

La interfaz del juego se divide en las siguientes pantallas accesibles desde el menú principal:

| Icono | Pantalla | Descripción |
|-------|----------|-------------|
| 🏠 | **Home** | Hub central del juego |
| 👥 | **Units** | Gestión de tu equipo y colección |
| ✨ | **Summon** | Invoca nuevas unidades |
| ⚔️ | **Quest** | Realiza misiones y aventuras |
| 🎮 | **Battle** | Combate con enemigos |
| 📱 | **QR Hunt** | Escanea códigos QR para recompensas |
| 🔀 | **Fusion** | Fusiona unidades para mejorarlas |

### Flujo de Juego Básico

1. **Comienza eligiendo un equipo** de hasta 5 unidades desde la pantalla de Unidades
2. **Invoca nuevas unidades** usando gemas en la pantalla Summon
3. **Selecciona una misión** con dificultad que se ajuste a tu equipo
4. **Combate por turnos** usando estrategia elemental
5. **Obtén recompensas** (Zel, EXP, Items)
6. **Fusiona unidades** para crear guerreros más fuertes
7. **Escanea códigos QR** para obtener bonificaciones especiales

---

## �️ Roadmap

### Fase 1: MVP Actual ✅ (Completado)
- ✅ Sistema de combate por turnos
- ✅ Mechanic de ventajas elementales
- ✅ Sistema gacha básico
- ✅ Gestión de unidades y equipo
- ✅ Sistema de energía con regeneración automática
- ✅ Escaneo de códigos QR
- ✅ Sistema de fusión de unidades
- ✅ Interfaz responsive
- ✅ Integración con Google Gemini AI

### Fase 2: Expansión de Contenido 🔄 (En Planificación)
- 📅 **Q2 2026**: Más contenido
  - 🎯 Adición de 20+ nuevas unidades
  - 🎯 10+ misiones adicionales con historias
  - 🎯 Nuevo continente/realm con dificultad progresiva
  - 🎯 Rareza de unidades mejorada (agregar Legendario+)
  - 🎯 Sistema de misiones diarias y semanales

### Fase 3: Sistemas Avanzados 🚀 (Próximos)
- 📅 **Q3 2026**: Mecánicas profundas
  - 🎯 Sistema de Dungeons (mazmorras) con oleadas
  - 🎯 Árbol de habilidades para personalizar unidades
  - 🎯 Sistema de Guilds para multijugador cooperativo
  - 🎯 Arena PvP con ranking global
  - 🎯 Sistema de montar/monturas
  - 🎯 Evolución avanzada de unidades (Ascensión)

### Fase 4: Características Sociales 👥 (Futuro)
- 📅 **Q4 2026**: Experiencia multijugador
  - 🎯 Backend de autenticación (Firebase/Supabase)
  - 🎯 Base de datos en tiempo real para sincronización
  - 🎯 Chat global y del gremio
  - 🎯 Sistema de amigos
  - 🎯 Trading entre jugadores
  - 🎯 Eventos cooperativos globales

### Fase 5: Monetización y Analytics 💰 (Largo Plazo)
- 📅 **2027**: Producción
  - 🎯 Sistema de batalla de bots mejorado
  - 🎯 Tienda de cosmética (skins, temas)
  - 🎯 Pase de batalla premium
  - 🎯 Analytics y telemetría de jugadores
  - 🎯 Marketing y promociones
  - 🎯 Publicación en tiendas de juegos / plataformas (Android/iOS)

### Fase 6: Optimización y Pulido 🎨 (Iterativo)
- 📅 **Contínuo**: Mejora constante
  - 🎯 Optimización de rendimiento
  - 🎯 Mejoras de UI/UX basadas en feedback
  - 🎯 Soporte multiidioma (i18n)
  - 🎯 Accesibilidad mejorada
  - 🎯 Nuevas animaciones y efectos visuales
  - 🎯 Balanceo de juego

### Características Futuras Bajo Consideración 💡

| Característica | Dificultad | Prioridad | Notas |
|---|---|---|---|
| Sistema de Pets/Mascotas | Media | Alta | Acompañante adicional en batalla |
| Raids cooperativos | Alta | Media | Jefes gigantes multijugador |
| Modo Roguelike | Alta | Baja | Aventura procedural infinita |
| Modo Historia Campaña | Media | Alta | Narrativa completa con cutscenes |
| Sistema de Dimensiones Paralelas | Alta | Baja | Desafíos con mecánicas alteradas |
| Trading Card Game (TCG) Mode | Alta | Baja | Modo juego de cartas alternativo |
| Expediciones Autónomas | Media | Media | Enviar unidades a misiones pasivas |
| Vinculación con otras apps | Media | Baja | Cross-game rewards |

---

## �📁 Estructura del Proyecto

```
Braveclon/
├── app/                          # Proyecto Next.js
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página principal del juego
│   └── globals.css              # Estilos globales
├── components/                  # Componentes React
│   ├── HomeScreen.tsx           # Pantalla de inicio
│   ├── UnitsScreen.tsx          # Gestión de unidades
│   ├── SummonScreen.tsx         # Sistema gacha
│   ├── QuestScreen.tsx          # Selección de misiones
│   ├── BattleScreen.tsx         # Pantalla de combate
│   ├── QRHuntScreen.tsx         # Escaneo de QR
│   ├── FusionScreen.tsx         # Fusión de unidades
│   ├── UnitSprite.tsx           # Sprite de unidad (visual)
│   ├── BBCutIn.tsx              # Animación Brave Burst
│   └── ElementalParticles.tsx   # Efectos de elementos
├── hooks/                        # React Hooks personalizados
│   └── use-mobile.ts            # Detección de dispositivo móvil
├── lib/                          # Lógica del juego
│   ├── gameData.ts              # Datos de unidades y equipo
│   ├── gameState.ts             # Estado global del juego
│   ├── gameTypes.ts             # Tipos TypeScript
│   ├── battleTypes.ts           # Tipos de combate
│   ├── audio.ts                 # Gestión de audio
│   └── utils.ts                 # Funciones de utilidad
├── next.config.ts               # Configuración de Next.js
├── tsconfig.json                # Configuración de TypeScript
├── package.json                 # Dependencias del proyecto
├── eslint.config.mjs            # Configuración de ESLint
├── postcss.config.mjs           # Configuración de PostCSS
├── tailwind.config.ts           # Configuración de Tailwind CSS
└── README.md                    # Este archivo
```

---

## 🛠️ Tecnologías

### Frontend
- **Next.js 15.4.9**: Framework React con SSR y optimizaciones
- **React 19.2.1**: Librería UI con Hooks y componentes funcionales
- **TypeScript 5.9.3**: Tipado estático para JavaScript

### Estilos
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **PostCSS 8.5.6**: Procesador de CSS con autoprefixer
- **Class Variance Authority**: Sistema de variantes de componentes

### Características
- **Google Generative AI (@google/genai 1.17.0)**: Integración con Gemini AI
- **React QR Scanner (@yudiel/react-qr-scanner 2.5.1)**: Escaneo de códigos QR
- **Motion 12.23.24**: Animations y transiciones fluidas
- **Lucide React 0.553.0**: Librería de iconos SVG

### Herramientas de Desarrollo
- **ESLint 9.39.1**: Linting para código limpio
- **Firebase Tools 15.0.0**: Herramientas de Firebase
- **TW Animate CSS 1.4.0**: Animaciones CSS personalizadas

---

## 🏗️ Arquitectura

### Estado Global

El juego utiliza un hook personalizado `useGameState` que gestiona:

- **PlayerState**: Información del jugador (nivel, energía, gemas, inventario)
- **UnitInstance**: Instancias de unidades con equipo y progreso
- **EquipInstance**: Equipo del jugador
- **QRState**: Historial de códigos QR escaneados

### Flujo de Datos

```
UI Components ↔ useGameState Hook ↔ Local Storage
                                    (React Hooks)
```

### Sistemas Principales

1. **Sistema de Combate**: Lógica de turnos, cálculo de daño y elementales
2. **Sistema de Energía**: Regeneración automática y consumo por misión
3. **Sistema Gacha**: Probabilidades configurables para rareza de unidades
4. **Sistema de Fusión**: Cálculo de mejoras y consumo de recursos
5. **Sistema de QR**: Hash y validación de códigos escaneados

---

## ⚙️ Configuración

### Configuración de Next.js

El archivo `next.config.ts` incluye:

- **Image Optimization**: Soporte para imágenes remotas (picsum.photos, cdn.jsdelivr.net)
- **React Strict Mode**: Detección de efectos secundarios en desarrollo
- **TypeScript Strict**: Validación de tipos en build
- **HMR Deshabilitado**: Optimizado para AI Studio

### Configuración de Tailwind CSS

- **PostCSS 4.1.11**: Procesamiento avanzado de CSS
- **Typography Plugin**: Estilos de documentación
- **Animate CSS Plugin**: Animaciones predefinidas

### Variables de Entorno

```env
# Requerida
GEMINI_API_KEY=sk-...

# Opcional
DISABLE_HMR=true  # Para desabilitar Hot Module Replacement
```

---

## 📝 Scripts Disponibles

### Desarrollo

```bash
# Inicia el servidor de desarrollo
npm run dev

# Ejecuta linting del código
npm run lint

# Limpia caché de Next.js
npm run clean
```

### Producción

```bash
# Construye el juego para producción
npm run build

# Inicia el servidor de producción
npm run start
```

---

## 🎮 Características Principales Detalladas

### 1. Sistema de Combate
- Combate por turnos basado en velocidad
- Ventajas elementales que modifican daño (x1.5 con ventaja, x0.75 sin)
- Brave Burst que se carga con acciones en batalla
- Sistema de defensa y esquive

### 2. Sistema Gacha
- Múltiples niveles de rareza (Normal, Raro, Épico, Legendario)
- Probabilidades distintas según tipo de invocación
- Protecciones pity (garantías después de X tiradas)
- Moneda de juego y gemas premium

### 3. Gestión de Equipo
- Cargas de armas, armaduras y accesorios
- Bonus de atributos por equipamiento
- Instancias de ítems únicos
- Sincronización automática con guardado

### 4. Sistema de Energía
- Regeneración automática (1 energía cada cierto tiempo)
- Sistema en tiempo real con persistencia
- Límite de energía máxima
- Consumo variable según dificultad de misión

### 5. Escaneo de QR
- Máximo de escaneos diarios (límite configurable)
- Hash para evitar duplicados
- Recompensas especiales por escaneo
- Historial de escaneos

### 6. Fusión de Unidades
- Selecciona unidad objetivo y unidades para fusionar
- Incremento de experiencia y estadísticas
- Consumo de Zel (moneda de juego)
- Efectos visuales de fusión

---

## 📱 Responsividad

El proyecto es completamente responsive gracias a:

- **Tailwind CSS**: Grid y flexbox responsive
- **Hook `useMobile`**: Detección de dispositivo móvil
- **Next.js Image**: Optimización automática de imágenes
- **Diseño Mobile-First**: Priorita experiencia móvil

---

## 🐛 Debugging

### En Desarrollo

```bash
# Con Chrome DevTools
npm run dev
# Abre http://localhost:3000 y abre DevTools (F12)

# Con logging
// En componentes
console.log('Debug:', gameState);
```

### Logs Disponibles

- **Debug de Estado**: `useGameState` retorna estado completo
- **Debug de Batalla**: Sistema de combate tiene logging detallado
- **Debug de QR**: Validación de códigos QR con hash

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. **Fork** el repositorio
2. **Crea una rama** con tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commits** con mensajes claros (`git commit -m 'Add AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Código de Conducta

Sé respetuoso y mantén un ambiente acogedor para todos.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**Leem0n Studio**

- GitHub: [@Leem0nStudio](https://github.com/Leem0nStudio)

---

## 🔗 Enlaces Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Brave Frontier (Juego Original)](https://bravefrontier.gumi.sg/)

---

## 📞 Soporte

¿Encuentras problemas? Por favor:

1. Revisa las issues existentes en GitHub
2. Crea una new issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Tu ambiente (SO, navegador, Node.js version)
   - Screenshots si es posible

---

<div align="center">

**¡Gracias por jugar Braveclon! 🎮✨**

Hecho con ❤️ por Leem0n Studio

</div>
