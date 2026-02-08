import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Calendar, AlertCircle } from 'lucide-react';

export default function Login({ user }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const allowedDomain = import.meta.env.VITE_ALLOWED_DOMAIN;
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS.split(',').map(email => email.trim());

  useEffect(() => {
    if (user) {
      const isAdmin = adminEmails.includes(user.email);
      const isAllowedStudent = user.email.endsWith(allowedDomain);

      if (isAdmin) {
        navigate('/admin');
      } else if (isAllowedStudent) {
        navigate('/calendar');
      } else {
        signOut(auth).then(() => {
          setError(`Acesso negado. O e-mail ${user.email} não pertence ao domínio institucional (${allowedDomain}).`);
        });
      }
    }
  }, [user, navigate, allowedDomain, adminEmails]);

  const handleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      
      const isAdmin = adminEmails.includes(email);
      const isAllowedStudent = email.endsWith(allowedDomain);

      if (!isAdmin && !isAllowedStudent) {
        await signOut(auth);
        setError(`Acesso negado. O e-mail ${email} não pertence ao domínio institucional (${allowedDomain}).`);
        return;
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login cancelado.');
      } else {
        setError('Erro ao tentar fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-emerald-500/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-teal-400/15 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-emerald-400/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-teal-500/15 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 border-2 border-emerald-500/20 rounded-full"></div>
        
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#1e293b" fillOpacity="0.5" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#334155" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-xl shadow-emerald-500/30 mb-6 transform hover:scale-105 transition-transform">
            <Calendar className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Monitoria de ALPG</h1>
          <p className="text-slate-300 text-lg">Responsável: Ian Torrez</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">Bem-vindo(a)!</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-100">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="group-hover:tracking-wide transition-all">Entrar com Google</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-300 text-sm">
              Acesso restrito a usuários
            </p>
            <p className="text-white font-medium mt-1">{allowedDomain}</p>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Faça login para agendar o seu horário de monitoria.
        </p>
      </div>
    </div>
  );
}
