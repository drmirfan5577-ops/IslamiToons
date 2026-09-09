import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pattern-islamic">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl mb-6 floating">🔍</div>
        <h1 className="text-6xl font-extrabold text-gradient-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-xl font-bold text-amber-600 mb-6" dir="rtl">
          صفحہ نہیں ملا
        </p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. Let's get you back to the stories!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all btn-bounce"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            to="/stories"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-300 text-green-700 rounded-xl font-bold hover:border-green-500 transition-all"
          >
            <Search size={18} />
            Browse Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
