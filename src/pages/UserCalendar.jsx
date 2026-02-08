import { useEffect } from 'react';
import { logAccess } from '../services/logService';
import { auth } from '../config/firebase';
import { Calendar, LogOut, User } from 'lucide-react';

export default function UserCalendar({ user }) {
  const calendarUrl = import.meta.env.VITE_CALENDAR_URL;

  useEffect(() => {
    if (user) {
      logAccess(user);
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4 gap-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-6 py-4 shadow-lg">
        <div className="max-w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg shadow-emerald-500/30">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Bem-vindo,</p>
              <p className="text-white font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                {user.displayName}
              </p>
            </div>
          </div>
          <button 
            onClick={() => auth.signOut()} 
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold px-4 py-2 rounded-lg transition-all border border-red-500/30"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="h-full bg-white rounded-2xl border border-slate-300/50 shadow-2xl overflow-hidden">
          <iframe 
            src={calendarUrl} 
            className="w-full h-full border-none"
            title="Calendário de Agendamentos"
          />
        </div>
      </div>
    </div>
  );
}
