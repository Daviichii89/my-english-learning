import { useLocation, Link } from 'react-router-dom';
import { routesMap } from '../routesMap';


const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === '/') return null;
  const pathParts = pathname.split('/').filter(Boolean);

  // Construye cada parte con su ruta acumulada
  const breadcrumbs = pathParts.map((part, index) => {
    const route = '/' + pathParts.slice(0, index + 1).join('/');
    const name = routesMap[route] || decodeURIComponent(part);

    return { route, name };
  });

  // Añade el "Home" al principio
  const fullBreadcrumbs = [{ route: '/', name: routesMap['/'] || 'Home' }, ...breadcrumbs];

  return (
    <nav className="text-sm text-gray-600 text-left mb-4">
      {fullBreadcrumbs.map((crumb, index) => {
        const isLast = index === fullBreadcrumbs.length - 1;
        return (
        <span key={crumb.route}>
            {index > 0 && ' / '}
            {
                isLast ? (
                    <span className="font-bold">{crumb.name}</span>
                ) : (
                    <Link to={crumb.route} className="hover:underline">
                        {crumb.name}
                    </Link>
                )}
            </span>
      )})}
    </nav>
  );
};

export default Breadcrumbs;
