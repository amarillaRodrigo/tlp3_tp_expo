# TP3 - React Native

Aplicación móvil desarrollada con React Native y Expo que implementa un sistema de login, dashboard con pestañas y múltiples pantallas interactivas.

## Características

- **Sistema de autenticación**: Login simple con persistencia de datos.
- **Dashboard con navegación por pestañas**: Home, Productos, Calculadora y Perfil.
- **Pantallas creativas**:
  - Calculadora funcional.
  - Catálogo de productos con búsqueda y filtros.
  - Feed de noticias con datos dinámicos.
  - Perfil de usuario personalizable.

## Tecnologías utilizadas

- React Native
- Expo Router para navegación
- React Native Paper para componentes UI
- AsyncStorage para persistencia de datos
- Axios para consumo de APIs

## Requisitos previos

- Node.js (v14.0.0 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Un dispositivo físico con Expo Go instalado o un emulador

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd tlp3_tp_expo
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**:
   ```bash
   npx expo start
   ```

   - Escanear el código QR con la app **Expo Go** (Android) o la **cámara** (iOS).
   - Una vez iniciada la app en la terminal de Expo, también podés presionar la tecla `w` para abrirla directamente en el navegador web.

---

## Estructura del proyecto

```
app/
├── _layout.js          # Layout principal y configuración del tema
├── index.js            # Pantalla de login
├── dashboard/
│   ├── _layout.js      # Configuración de las pestañas
│   ├── home.js         # Pantalla de inicio con noticias
│   ├── products.js     # Catálogo de productos
│   ├── calculator.js   # Calculadora funcional
│   └── profile.js      # Perfil de usuario
```

## Funcionalidades

### Login

- Permite ingresar con cualquier usuario y contraseña
- Almacena datos de usuario para su uso en otras pantallas

### Home

- Muestra un feed de noticias con datos cargados desde una API
- Implementa estados de carga y manejo de errores

### Productos

- Catálogo de productos con imágenes
- Búsqueda en tiempo real
- Filtrado por categorías

### Calculadora

- Implementa operaciones matemáticas básicas
- Diseño responsivo e intuitivo

### Perfil

- Muestra datos del usuario que inició sesión
- Permite cerrar sesión y volver a la pantalla de login
- Imagen de perfil generada aleatoriamente
