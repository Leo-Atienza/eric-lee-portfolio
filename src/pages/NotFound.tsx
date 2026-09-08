import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <main className="page grid min-h-[100dvh] content-center py-24">
      <p className="label num">404</p>
      <h1 className="mt-3" style={{ fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)" }}>
        Nothing is filed at this address.
      </h1>
      <p className="muted measure mt-4 break-all">{pathname}</p>
      <p className="mt-8">
        <a href="/" className="link cta">
          Return to the portfolio
          <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
        </a>
      </p>
    </main>
  );
};

export default NotFound;
