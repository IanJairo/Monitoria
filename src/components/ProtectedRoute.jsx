import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, role, children }) {
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',').map(email => email.trim());
  const allowedDomain = import.meta.env.VITE_ALLOWED_DOMAIN;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = adminEmails.includes(user.email);
  const isAllowedStudent = user.email.endsWith(allowedDomain);

  if (role === 'admin' && !isAdmin) {
    return <Navigate to="/calendar" replace />;
  }

  if (!isAdmin && !isAllowedStudent) {
    return <Navigate to="/" replace />;
  }

  return children;
}