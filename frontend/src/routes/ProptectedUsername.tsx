import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUsername } from '@/context/login/username'; // Importamos el hook que accede al contexto
import { ROUTES } from '@/routes/AppRoutes'; // Importamos las rutas

// HOC para proteger las rutas
function ProtectedUsernameRoute({ children }: { children: ReactNode }) {
  const { username } = useUsername();  // Obtener el username desde el contexto

  // Si no hay username, redirigimos a login
  if (!username || username === "") {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
}

export default ProtectedUsernameRoute;
