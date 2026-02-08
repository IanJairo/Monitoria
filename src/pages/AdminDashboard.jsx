import { useEffect, useState } from 'react';
import { getAccessLogs } from '../services/logService';
import { auth } from '../config/firebase';
import { Shield, LogOut, Clock, Mail, User, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getAccessLogs();
      setLogs(data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-emerald-500/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-teal-400/10 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-emerald-400/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-slate-400 text-sm">Monitoramento de acessos ao sistema</p>
            </div>
          </div>
          <button 
            onClick={() => auth.signOut()} 
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold px-5 py-3 rounded-xl transition-all border border-red-500/30 backdrop-blur-sm"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Data/Hora
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Aluno
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      E-mail
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {log.accessedAt?.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {log.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {log.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Acessou Calendário
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logs.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-400 text-lg">Nenhum acesso registrado ainda</p>
                <p className="text-slate-500 text-sm mt-1">Os logs de acesso aparecerão aqui</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Total de acessos: <span className="font-semibold text-white">{logs.length}</span>
        </div>
      </div>
    </div>
  );
}
