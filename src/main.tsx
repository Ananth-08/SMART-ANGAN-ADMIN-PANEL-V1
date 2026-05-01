import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// PrimeReact Styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"; // Good for layouts

import './index.css'
import AppRouter from './routes/AppRouter.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
)
