import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Lock, 
  Unlock, 
  Save, 
  LogOut, 
  ChevronLeft, 
  Eye, 
  PenTool,
  Search,
  LayoutDashboard,
  FileText,
  History,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

// --- CONFIGURATION & CONSTANTS ---
const SITE_PASSWORD = "URfavraut1";
const APP_VERSION = "2.1.0-mg-pro";
const STORAGE_KEY = 'mg_invoice_history_v2';
const LAST_NUM_KEY = 'mg_last_inv_num';

const initialInvoiceData = {
  companyInfo: {
    name: "MG INSTALLATIONS",
    address: "21 King Street, 19 Kingsgate Centre",
    city: "CBD, uMnambithi, 3370",
    email: "matchlessgifts888@gmail.com",
    phone: "+27 (0) 00 000 0000"
  },
  clientInfo: {
    name: "CLIENT NAME / COMPANY",
    idNumber: "",
    address: "Client Street Address",
    city: "Client City, Code",
  },
  invoiceDetails: {
    number: "INV-2026-0001",
    date: new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }),
    currency: "ZAR"
  },
  items: [
    { id: crypto.randomUUID(), description: "High-grade security system installation...", qty: 1, rate: 0 },
  ],
  discountAmount: 0.00,
  bankDetails: {
    bankName: "FNB/RMB",
    accountName: "Renata Raut",
    accountNumber: "63172829823",
    branchCode: "250655",
    reference: "INV-2026-0001"
  }
};

// --- Assets ---
const LotusLogo = ({ className = "w-12 h-12", color = "text-amber-500" }) => (
  <svg viewBox="0 0 100 100" className={`${className} ${color}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 25 C50 25 35 45 25 55 C15 65 10 75 10 75 C10 75 25 70 50 85 C75 70 90 75 90 75 C90 75 85 65 75 55 C65 45 50 25 50 25 Z" opacity="0.9"/>
    <path d="M50 85 C50 85 40 70 30 65 C20 60 10 55 10 55 C10 55 20 65 30 75 C40 85 50 95 50 95 C50 95 60 85 70 75 C80 65 90 55 90 55 C90 55 80 60 70 65 C60 70 50 85 50 85 Z" opacity="0.7"/>
    <path d="M50 20 C50 20 55 40 65 50 C75 60 85 60 85 60 C85 60 75 50 65 35 C60 30 50 20 50 20 Z" opacity="0.6" />
    <path d="M50 20 C50 20 45 40 35 50 C25 60 15 60 15 60 C15 60 25 50 35 35 C40 30 50 20 50 20 Z" opacity="0.6" />
  </svg>
);

export default function App() {
  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNumberPicker, setShowNumberPicker] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [startingNumber, setStartingNumber] = useState("1");
  const [loginError, setLoginError] = useState(false);

  const [viewMode, setViewMode] = useState('dashboard'); // dashboard, invoice, receipt
  const [invoice, setInvoice] = useState(initialInvoiceData);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDeleting, setIsDeleting] = useState(null);
  const [deletePin, setDeletePin] = useState("");
  const [deleteError, setDeleteError] = useState(false);

  // --- LOGIC ---
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setHistory(JSON.parse(data));
  }, []);

  const generateNextNumber = useCallback(() => {
    const lastNum = parseInt(localStorage.getItem(LAST_NUM_KEY) || "0");
    const nextNum = lastNum + 1;
    const formattedNum = nextNum.toString().padStart(4, '0');
    const newID = `INV-2026-${formattedNum}`;

    setInvoice(prev => ({
      ...prev,
      invoiceDetails: { ...prev.invoiceDetails, number: newID },
      bankDetails: { ...prev.bankDetails, reference: newID }
    }));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === SITE_PASSWORD) {
      setShowNumberPicker(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput("");
    }
  };

  const finalizeLogin = (e) => {
    e.preventDefault();
    const startNum = parseInt(startingNumber) || 1;
    localStorage.setItem(LAST_NUM_KEY, (startNum - 1).toString());
    generateNextNumber();
    setIsAuthenticated(true);
  };

  const saveToHistory = async () => {
    setIsSaving(true);
    const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const total = subtotal - invoice.discountAmount;
    
    const entry = {
      id: Date.now(),
      type: viewMode === 'receipt' ? 'Receipt' : 'Invoice',
      number: invoice.invoiceDetails.number,
      client: invoice.clientInfo.name,
      date: invoice.invoiceDetails.date,
      amount: total,
      data: { ...invoice }
    };

    const updatedHistory = [entry, ...history.filter(h => h.number !== entry.number)];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    
    // Update last number if it's new
    const parts = invoice.invoiceDetails.number.split('-');
    const currentSeq = parseInt(parts[parts.length - 1]);
    if (!isNaN(currentSeq)) {
        localStorage.setItem(LAST_NUM_KEY, currentSeq.toString());
    }
    
    setTimeout(() => setIsSaving(false), 600);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    if (deletePin === SITE_PASSWORD) {
      const updated = history.filter(item => item.id !== isDeleting);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsDeleting(null);
      setDeletePin("");
      setDeleteError(false);
    } else {
      setDeleteError(true);
      setDeletePin("");
    }
  };

  const handleCreateNew = () => {
    generateNextNumber();
    setInvoice({ ...initialInvoiceData, items: [{ ...initialInvoiceData.items[0], id: crypto.randomUUID() }] });
    setViewMode('invoice');
    setIsEditing(true);
  };

  const loadFromHistory = (entry) => {
    setInvoice(entry.data);
    setViewMode(entry.type.toLowerCase());
    setIsEditing(false);
  };

  const handlePrint = async () => {
    await saveToHistory();
    window.print();
  };

  // --- RENDERING HELPERS ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border-t-8 border-amber-500">
          <div className="p-10 text-center">
            <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <LotusLogo className="w-12 h-12" color="text-amber-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">MG Installations</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Secure System Access</p>
            
            {!showNumberPicker ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="password"
                  className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 transition-all outline-none text-center text-xl font-mono text-slate-900 ${loginError ? 'border-red-500' : 'border-slate-100 focus:border-amber-500'}`}
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-lg">Authenticate</button>
              </form>
            ) : (
              <form onSubmit={finalizeLogin} className="space-y-4">
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Initialize Sequence</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-slate-400 font-mono text-lg font-bold">INV-2026-</span>
                    <input type="number" className="bg-transparent text-lg font-mono text-slate-900 font-bold outline-none w-20 border-b-2 border-amber-500" value={startingNumber} onChange={(e) => setStartingNumber(e.target.value)} autoFocus />
                  </div>
                </div>
                <button type="submit" className="w-full bg-amber-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-lg">Begin Session</button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans print:bg-white print:p-0">
      <style>{`
        @media print { 
          .no-print { display: none !important; } 
          .print-area { box-shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; padding: 0 !important; }
        }
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fade 0.4s ease-out forwards; }
      `}</style>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center border border-slate-100">
             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
             </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Confirm Delete</h3>
            <p className="text-slate-400 text-xs font-bold uppercase mb-6 tracking-widest">Pin required for removal</p>
            <input 
              type="password" 
              className={`w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 mb-6 outline-none text-center font-mono text-xl ${deleteError ? 'border-red-500' : 'border-slate-100 focus:border-slate-900'}`} 
              placeholder="••••" 
              value={deletePin} 
              onChange={(e) => setDeletePin(e.target.value)} 
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={() => setIsDeleting(null)} className="flex-1 px-4 py-4 rounded-2xl text-[10px] font-black uppercase border border-slate-200 hover:bg-slate-50">Cancel</button>
              <button onClick={handleConfirmDelete} className="flex-1 px-4 py-4 rounded-2xl text-[10px] font-black uppercase bg-red-600 text-white shadow-lg shadow-red-100 hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="no-print bg-slate-900 sticky top-0 z-50 border-b border-white/5 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('dashboard')}>
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
              <LotusLogo className="w-8 h-8" color="text-amber-500" />
            </div>
            <div>
              <h2 className="text-white font-black text-lg tracking-tight leading-none uppercase">MG Installations</h2>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-black">Authorized Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Operator</p>
               <p className="text-white font-bold text-sm">Welcome, Rudz</p>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 flex items-center justify-center transition-all border border-white/5 hover:border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-10 no-print">
        {viewMode === 'dashboard' ? (
          <Dashboard 
            history={history} 
            onCreate={handleCreateNew} 
            onLoad={loadFromHistory} 
            onDelete={(id) => setIsDeleting(id)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ) : (
          <Editor 
            invoice={invoice} 
            setInvoice={setInvoice} 
            viewMode={viewMode} 
            setViewMode={setViewMode}
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            onPrint={handlePrint}
            isSaving={isSaving}
          />
        )}
      </main>

      {/* Actual Print Sheet */}
      {(viewMode === 'invoice' || viewMode === 'receipt') && (
        <div className="hidden print:block">
            <PrintSheet invoice={invoice} viewMode={viewMode} />
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

const Dashboard = ({ history, onCreate, onLoad, onDelete, searchTerm, setSearchTerm }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);
  const totalRevenue = history.reduce((a, b) => a + b.amount, 0);
  
  const filteredHistory = history.filter(h => 
    h.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-1">Infrastructure Control</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Global Account Management</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search Client or Reference..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all shadow-sm"
            />
          </div>
          <button onClick={onCreate} className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Documentation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Deployments" value={history.length} icon={<FileText className="w-5 h-5" />} />
        <StatCard label="Revenue Pool" value={formatCurrency(totalRevenue)} icon={<ShieldCheck className="w-5 h-5" />} dark />
        <StatCard label="Latest Sync" value={history[0] ? history[0].date : 'N/A'} icon={<History className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
           <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Archived Documents</h3>
           <span className="bg-slate-50 px-3 py-1 rounded-lg text-[10px] font-black text-slate-400">{filteredHistory.length} Matches</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-8 py-5">Reference</th>
                <th className="px-8 py-5">Client Identity</th>
                <th className="px-8 py-5">Date Issued</th>
                <th className="px-8 py-5 text-right">Settlement</th>
                <th className="px-8 py-5 text-center">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.map(item => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-8 py-6 font-mono font-bold text-slate-400">{item.number}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-900 uppercase tracking-tight">{item.client}</p>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${item.type === 'Invoice' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{item.type}</span>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-500 text-sm">{item.date}</td>
                  <td className="px-8 py-6 text-right font-black text-slate-900 text-lg">{formatCurrency(item.amount)}</td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => onLoad(item)} className="p-2 bg-white border border-slate-200 rounded-xl hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="p-2 bg-white border border-slate-200 rounded-xl hover:border-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="opacity-20 flex flex-col items-center">
                      <LotusLogo className="w-20 h-20 grayscale mb-4" />
                      <p className="text-xs font-black uppercase tracking-widest">No matching records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, dark = false }) => (
  <div className={`p-8 rounded-[2.5rem] border transition-all shadow-sm ${dark ? 'bg-slate-900 text-white border-slate-800 shadow-slate-200' : 'bg-white text-slate-900 border-slate-200'}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${dark ? 'bg-white/10' : 'bg-slate-100'}`}>
      {icon}
    </div>
    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${dark ? 'text-white/40' : 'text-slate-400'}`}>{label}</p>
    <h3 className="text-3xl font-black tracking-tight">{value}</h3>
  </div>
);

const Editor = ({ invoice, setInvoice, viewMode, setViewMode, isEditing, setIsEditing, onPrint, isSaving }) => {
  const updateField = (section, field, value) => {
    setInvoice(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = field === 'description' ? value : parseFloat(value) || 0;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { id: crypto.randomUUID(), description: "", qty: 1, rate: 0 }] });
  };

  const removeItem = (index) => {
    if (invoice.items.length > 1) {
      setInvoice({ ...invoice, items: invoice.items.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="animate-fade flex flex-col items-center gap-10">
      {/* Toolbar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-4 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {['invoice', 'receipt'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${viewMode === m ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"}`}>{m}</button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isSaving && <span className="text-[9px] font-black uppercase text-amber-500 animate-pulse">Synchronizing...</span>}
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all ${isEditing ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"}`}
          >
            {isEditing ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            {isEditing ? "Lock Secure" : "Modify Fields"}
          </button>
          <button 
            onClick={onPrint} 
            className="flex items-center gap-2 px-8 py-2.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-100"
          >
            <Printer className="w-4 h-4" /> Save & Export
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full items-start">
        {/* Workspace Panels (Visible when Editing) */}
        {isEditing && (
          <div className="w-full lg:w-[400px] space-y-6 animate-fade no-print">
            <Panel title="Document Identification">
               <div className="space-y-4">
                  <InputField label="Reference ID" value={invoice.invoiceDetails.number} onChange={(v) => updateField('invoiceDetails', 'number', v)} />
                  <InputField label="Issue Date" type="text" value={invoice.invoiceDetails.date} onChange={(v) => updateField('invoiceDetails', 'date', v)} />
               </div>
            </Panel>
            <Panel title="Client Profile">
               <div className="space-y-4">
                  <InputField label="Identity / Name" value={invoice.clientInfo.name} onChange={(v) => updateField('clientInfo', 'name', v)} />
                  <InputField label="Contact / ID" value={invoice.clientInfo.idNumber} onChange={(v) => updateField('clientInfo', 'idNumber', v)} />
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:border-amber-500 outline-none h-24 resize-none"
                    value={invoice.clientInfo.address}
                    onChange={(e) => updateField('clientInfo', 'address', e.target.value)}
                    placeholder="Physical Address"
                  />
               </div>
            </Panel>
            <Panel title="Financial Adjustments">
               <InputField label="Discount / Offset (ZAR)" type="number" value={invoice.discountAmount} onChange={(v) => setInvoice({...invoice, discountAmount: parseFloat(v) || 0})} />
            </Panel>
          </div>
        )}

        {/* Live Preview Paper */}
        <div className={`flex-grow flex justify-center w-full`}>
           <div className="print-area bg-white w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] shadow-2xl border border-slate-100 flex flex-col justify-between overflow-hidden relative">
              <PrintSheetContent invoice={invoice} viewMode={viewMode} isEditing={isEditing} updateItem={updateItem} removeItem={removeItem} addItem={addItem} />
           </div>
        </div>
      </div>
    </div>
  );
};

const Panel = ({ title, children }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-50 pb-2">{title}</p>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[8px] font-black uppercase text-slate-400 ml-1">{label}</label>
    <input 
      type={type}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:border-amber-500 transition-all outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const PrintSheetContent = ({ invoice, viewMode, isEditing, updateItem, removeItem, addItem }) => {
  const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const total = subtotal - invoice.discountAmount;
  const formatCurrency = (val) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-900 print:bg-slate-900"></div>
      
      <div>
        {/* Header Block */}
        <div className="flex justify-between items-start mb-20">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
              <LotusLogo className="w-10 h-10" color="text-amber-500" />
            </div>
            <div>
               <h1 className="text-3xl font-black tracking-tighter text-slate-900 leading-none mb-1 uppercase">MG INSTALLATIONS</h1>
               <div className="flex gap-2">
                  <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-400 px-2 py-0.5 rounded tracking-widest">Security</span>
                  <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-400 px-2 py-0.5 rounded tracking-widest">Infrastructure</span>
               </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 mb-2 leading-none">{viewMode}</h2>
            <div className="inline-block bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-md">
              REF {invoice.invoiceDetails.number}
            </div>
          </div>
        </div>

        {/* Stakeholder Info */}
        <div className="grid grid-cols-2 gap-20 mb-16">
          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-l-4 border-slate-900 pl-3">Provider Identity</p>
             <div className="text-[13px] leading-relaxed text-slate-500 font-semibold">
                <p className="text-slate-900 font-black text-base">{invoice.companyInfo.name}</p>
                <p>{invoice.companyInfo.address}</p>
                <p>{invoice.companyInfo.city}</p>
                <p className="text-slate-900 font-bold mt-2">{invoice.companyInfo.email}</p>
                <p>{invoice.companyInfo.phone}</p>
             </div>
          </div>
          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-l-4 border-amber-500 pl-3">Client Identity</p>
             <div className="text-[13px] leading-relaxed text-slate-500 font-semibold">
                <p className="text-slate-900 font-black text-base uppercase">{invoice.clientInfo.name || 'VALUED CUSTOMER'}</p>
                <p>{invoice.clientInfo.address}</p>
                <p>{invoice.clientInfo.city}</p>
                {invoice.clientInfo.idNumber && <p className="text-[9px] font-black text-slate-400 mt-2 uppercase">Reference: {invoice.clientInfo.idNumber}</p>}
             </div>
          </div>
        </div>

        {/* Temporal Data */}
        <div className="flex gap-16 border-y border-slate-100 py-6 mb-12">
           <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Documented</p>
              <p className="font-black text-slate-900">{invoice.invoiceDetails.date}</p>
           </div>
           <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Currency</p>
              <p className="font-black text-slate-900">{invoice.invoiceDetails.currency}</p>
           </div>
        </div>

        {/* Itemization */}
        <table className="w-full mb-10">
          <thead>
            <tr className="border-b-2 border-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-900">
              <th className="text-left py-4 w-[60%]">Operational Description</th>
              <th className="text-center py-4">Quantity</th>
              <th className="text-right py-4">Rate</th>
              <th className="text-right py-4">Total</th>
              {isEditing && <th className="w-8 no-print"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoice.items.map((item, i) => (
              <tr key={item.id} className="group transition-colors">
                <td className="py-6 pr-10">
                  {isEditing ? (
                    <textarea 
                      className="w-full bg-slate-50 border-b border-slate-100 text-[13px] font-bold p-2 outline-none h-16 resize-none" 
                      value={item.description} 
                      onChange={(e) => updateItem(i, 'description', e.target.value)}
                    />
                  ) : (
                    <p className="text-[13px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                  )}
                </td>
                <td className="py-6 text-center align-top">
                  {isEditing ? (
                    <input 
                      type="number" 
                      className="w-16 text-center bg-slate-50 font-black text-slate-900 border-b" 
                      value={item.qty} 
                      onChange={(e) => updateItem(i, 'qty', e.target.value)}
                    />
                  ) : (
                    <span className="font-black text-slate-400 text-sm">{item.qty}</span>
                  )}
                </td>
                <td className="py-6 text-right align-top">
                  {isEditing ? (
                    <input 
                      type="number" 
                      className="w-24 text-right bg-slate-50 font-black text-slate-900 border-b" 
                      value={item.rate} 
                      onChange={(e) => updateItem(i, 'rate', e.target.value)}
                    />
                  ) : (
                    <span className="font-bold text-slate-400 text-sm">{formatCurrency(item.rate)}</span>
                  )}
                </td>
                <td className="py-6 text-right align-top font-black text-slate-900 text-base">
                  {formatCurrency(item.qty * item.rate)}
                </td>
                {isEditing && (
                  <td className="py-6 text-center align-top no-print">
                    <button onClick={() => removeItem(i)} className="text-red-200 hover:text-red-600">×</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {isEditing && (
          <button onClick={addItem} className="no-print mb-12 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform">
             <Plus className="w-3.5 h-3.5" /> Add Operational Item
          </button>
        )}

        {/* Calculation Summary */}
        <div className="flex justify-end mt-10">
          <div className="w-full max-w-[340px] space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Gross Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-xs font-bold text-amber-600 bg-amber-50 p-3 rounded-xl border border-amber-100">
                <span className="uppercase tracking-widest">Adjustments / Credit</span>
                <span>- {formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-6 border-t-[3px] border-slate-900">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-900">Settlement Due</span>
              <span className="text-4xl font-black tracking-tighter text-slate-900">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Block */}
      <div className="mt-20 flex flex-col md:flex-row justify-between items-end gap-10 border-t-2 border-slate-900 pt-10">
         <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex-grow max-w-[450px]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 border-b border-white pb-3">Remittance Instructions (EFT)</p>
            <div className="grid grid-cols-2 gap-y-3 text-[11px] font-bold">
               <span className="text-slate-300 uppercase">Financial Institution</span>
               <span className="text-right text-slate-900">{invoice.bankDetails.bankName}</span>
               <span className="text-slate-300 uppercase">Account Name</span>
               <span className="text-right text-slate-900">{invoice.bankDetails.accountName}</span>
               <span className="text-slate-300 uppercase">Account Number</span>
               <span className="text-right text-slate-900 font-mono text-base">{invoice.bankDetails.accountNumber}</span>
               <span className="text-slate-300 uppercase">Branch Key</span>
               <span className="text-right text-slate-900 font-mono">{invoice.bankDetails.branchCode}</span>
               <span className="text-slate-300 uppercase">Payment Reference</span>
               <span className="text-right text-amber-600 font-black">{invoice.bankDetails.reference}</span>
            </div>
         </div>
         <div className="text-right">
            <div className="mb-8">
              <p className="text-[11px] font-black uppercase text-slate-900">MG INSTALLATIONS</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Electronic Documentation</p>
            </div>
            <div className="flex flex-col items-end opacity-20">
               <LotusLogo className="w-12 h-12 mb-2" color="text-slate-900" />
               <p className="text-[6px] font-black uppercase tracking-widest">Verified System Ver {APP_VERSION}</p>
            </div>
         </div>
      </div>
    </>
  );
};

const PrintSheet = ({ invoice, viewMode }) => (
  <div className="bg-white p-0 m-0">
    <div className="print-area bg-white w-[210mm] min-h-[297mm] p-[20mm] flex flex-col justify-between">
      <PrintSheetContent invoice={invoice} viewMode={viewMode} isEditing={false} />
    </div>
  </div>
);
