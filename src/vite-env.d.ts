/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_BASE_URL: string // Aquí declaras las variables de entorno que quieres usar
  }


interface ImportMeta {
    readonly env: ImportMetaEnv;
  }