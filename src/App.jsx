import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Edit3, 
  Save, 
  Upload, 
  LogOut, 
  ChevronLeft, 
  Eye, 
  PenTool,
  Search
} from 'lucide-react';

// --- Constants & Utilities ---

const AUTH_KEY = "URfavraut1";
const STORAGE_KEY = "invoicify_data_v1";

const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

const defaultInvoiceState = {
  id: '',
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  currency: 'USD',
  taxRate: 10,
  logoUrl: '',
  status: 'draft',
  sender: {
    name: 'MG Installations',
    email: 'contact@mginstallations.com',
    address: '123 Premium Way, Design District',
    phone: '+1 (555) 000-0000',
  },
  client: {
    name: '',
    email: '',
    address: '',
    phone: '',
  },
  items: [
    { id: generateId(), description: 'Installation Services', quantity: 1, price: 1000 },
  ],
  notes: 'Thank you for choosing MG Installations.',
};

// --- Custom Components ---

const LotusLogo = ({ className = "w-12 h-12", color = "text-amber-500" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} ${color}`} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 25 C50 25 35 45 25 55 C15 65 10 75 10 75 C10 75 25 70 50 85 C75 70 90 75 90 75 C90 75 85 65 75 55 C65 45 50 25 50 25 Z" opacity="0.9"/>
    <path d="M50 85 C50 85 40 70 30 65 C20 60 10 55 10 55 C10 55 20 65 30 75 C40 85 50 95 50 95 C50 95 60 85 70 75 C80 65 90 55 90 55 C90 55 80 60 70 65 C60 70 50 85 50 85 Z" opacity="0.7"/>
    <path d="M50 20 C50 20 55 40 65 50 C75 60 85 60 85 60 C85 60 75 50 65 35 C60 30 50 20 50 20 Z" opacity="0.6" />
    <path d="M50 20 C50 20 45 40 35 50 C25 60 15 60 15 60 C15 60 25 50 35 35 C40 30 50 20 50 20 Z" opacity="0.6" />
  </svg>
);

/**
 * Login Screen
 */
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === AUTH_KEY) {
      onLogin();
    } else {
      setError('Invalid Access Key');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl rounded-b-lg shadow-2xl overflow-hidden max-w-md w-full flex flex-col border-t-4 border-amber-500">
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
              <LotusLogo className="w-12 h-12" color="text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">MG Installations</h1>
            <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-medium">Workspace for Rudra</p>
          </div>
        </div>
        <div className="p-10 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Security Access</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-none border-b-2 border-slate-200 focus:border-amber-500 bg-slate-50 focus:bg-white transition-all outline-none text-lg text-slate-800 placeholder-slate-400"
                placeholder="Enter Passkey"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded border border-red-100">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Verify Identity & Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Application Component
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('dashboard'); // dashboard, builder
  const [invoices, setInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setInvoices(JSON.parse(savedData));
    }
    const sessionAuth = sessionStorage.getItem('invoicify_auth');
    if (sessionAuth === 'true') setIsAuthenticated(true);
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('invoicify_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('invoicify_auth');
  };

  const handleCreateNew = () => {
    const newInvoice = { ...defaultInvoiceState, id: generateId(), items: [{ ...defaultInvoiceState.items[0], id: generateId() }] };
    setCurrentInvoice(newInvoice);
    setView('builder');
  };

  const handleEdit = (invoice) => {
    setCurrentInvoice(JSON.parse(JSON.stringify(invoice))); // Deep copy
    setView('builder');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  const handleSaveInvoice = (invoice) => {
    const existingIndex = invoices.findIndex((inv) => inv.id === invoice.id);
    if (existingIndex >= 0) {
      const updated = [...invoices];
      updated[existingIndex] = invoice;
      setInvoices(updated);
    } else {
      setInvoices([invoice, ...invoices]);
    }
    setView('dashboard');
  };

  // --- Bulk Import Logic ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const delimiter = file.name.endsWith('.csv') ? ',' : '|';
      parseImportData(text, delimiter);
    };
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };

  const parseImportData = (text, delimiter) => {
    try {
      const lines = text.split('\n');
      const newInvoices = [];
      
      lines.forEach((line) => {
        if (!line.trim()) return;
        const cols = line.split(delimiter).map(c => c.trim());
        if (cols.length < 3) return; // Skip invalid lines
        if (cols[0].toLowerCase().includes('invoice')) return; // Skip header

        newInvoices.push({
          ...defaultInvoiceState,
          id: generateId(),
          invoiceNumber: cols[0] || `INV-${Math.floor(Math.random()*1000)}`,
          date: cols[1] || new Date().toISOString().split('T')[0],
          client: {
            ...defaultInvoiceState.client,
            name: cols[2] || 'Unknown Client',
            email: cols[3] || '',
          },
          items: [{
            id: generateId(),
            description: 'Imported Service',
            quantity: 1,
            price: parseFloat(cols[4]) || 0
          }]
        });
      });

      setInvoices([...newInvoices, ...invoices]);
      alert(`Successfully imported ${newInvoices.length} invoices.`);
    } catch (err) {
      alert('Failed to parse file. Please ensure it uses CSV or Pipe format.');
    }
  };

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 no-print shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('dashboard')}>
              <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 group-hover:border-amber-500/50 transition-colors">
                <LotusLogo className="w-8 h-8" color="text-amber-500" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white block leading-none">MG Installations</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Internal System</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                  <span className="block text-xs text-slate-400 uppercase tracking-wider">Signed in as</span>
                  <span className="text-sm font-semibold text-white">Welcome, Rudz</span>
              </div>
              <div className="h-8 w-px bg-slate-700 mx-2 hidden sm:block"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' ? (
          <Dashboard 
            invoices={invoices} 
            onCreate={handleCreateNew} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            onImport={() => fileInputRef.current.click()}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        ) : (
          <InvoiceBuilder 
            initialData={currentInvoice} 
            onSave={handleSaveInvoice} 
            onBack={() => setView('dashboard')} 
          />
        )}
      </main>
    </div>
  );
}

/**
 * Dashboard Component
 */
const Dashboard = ({ invoices, onCreate, onEdit, onDelete, onImport, fileInputRef, handleFileUpload, searchTerm, setSearchTerm }) => {
  const filteredInvoices = invoices.filter(inv => 
    inv.client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 mt-1">Overview of recent installation projects and invoices.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
           <div className="relative flex-grow md:flex-grow-0 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search clients or invoice #..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-full shadow-sm"
            />
          </div>
          <button 
            onClick={onImport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold shadow-sm"
          >
            <Upload className="w-4 h-4" /> Import Data
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".csv,.txt" 
            onChange={handleFileUpload} 
          />
          <button 
            onClick={onCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl text-sm font-bold border border-slate-900"
          >
            <Plus className="w-4 h-4" /> New Project Invoice
          </button>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
            <LotusLogo className="w-10 h-10" color="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No invoices found</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8">Ready to start? Create a new invoice for your next installation project.</p>
          <button onClick={onCreate} className="text-amber-600 font-bold hover:text-amber-700 underline underline-offset-4">Create First Invoice</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((inv) => (
            <InvoiceCard key={inv.id} invoice={inv} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

const InvoiceCard = ({ invoice, onEdit, onDelete }) => {
  const total = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const totalWithTax = total + (total * (invoice.taxRate / 100));

  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900 transition-all"></div>
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
        <LotusLogo className="w-24 h-24" color="text-slate-900" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
            <div>
            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 mb-3 border border-slate-200">
                {invoice.invoiceNumber}
            </span>
            <h3 className="text-lg font-bold text-slate-900 truncate max-w-[200px] leading-tight" title={invoice.client.name}>
                {invoice.client.name || 'Untitled Client'}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">{formatDate(invoice.date)}</p>
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
            <button onClick={() => onEdit(invoice)} className="p-2 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-slate-400 hover:text-amber-600 transition-colors shadow-sm" title="Edit">
                <Edit3 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(invoice.id)} className="p-2 bg-white border border-slate-200 hover:border-red-500 rounded-lg text-slate-400 hover:text-red-500 transition-colors shadow-sm" title="Delete">
                <Trash2 className="w-4 h-4" />
            </button>
            </div>
        </div>

        <div className="flex justify-between items-end pt-4 border-t border-slate-100">
            <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{formatCurrency(totalWithTax, invoice.currency)}</p>
            </div>
            <button 
            onClick={() => onEdit(invoice)} 
            className="text-xs font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1 transition-colors uppercase tracking-wide"
            >
            Manage <ChevronLeft className="w-3 h-3 rotate-180" />
            </button>
        </div>
      </div>
    </div>
  );
};


/**
 * Invoice Builder Component
 */
const InvoiceBuilder = ({ initialData, onSave, onBack }) => {
  const [data, setData] = useState(initialData);
  const [mode, setMode] = useState('edit'); // edit, preview

  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmount;

  const handlePrint = () => {
    // Switch to preview mode before printing just in case
    setMode('preview');
    setTimeout(() => window.print(), 100);
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    if (keys.length === 1) {
      setData({ ...data, [keys[0]]: value });
    } else {
      setData({
        ...data,
        [keys[0]]: { ...data[keys[0]], [keys[1]]: value }
      });
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { id: generateId(), description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    if (data.items.length === 1) return;
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  return (
    <div className="animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 no-print">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
                <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-slate-900">
                {mode === 'edit' ? 'Editor' : 'Preview'}
            </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="bg-white border border-slate-200 p-1 rounded-lg flex items-center shadow-sm">
            <button 
              onClick={() => setMode('edit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'edit' ? 'bg-amber-50 text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <PenTool className="w-4 h-4" /> Design
            </button>
            <button 
              onClick={() => setMode('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'preview' ? 'bg-amber-50 text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Eye className="w-4 h-4" /> View
            </button>
          </div>

          <div className="h-6 w-px bg-slate-300 mx-2 hidden md:block"></div>

          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-bold shadow-sm">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={() => onSave(data)} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg text-sm font-bold border border-slate-900">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Editor Sidebar - Only visible in Edit Mode */}
        {mode === 'edit' && (
          <div className="w-full lg:w-1/3 space-y-6 no-print order-2 lg:order-1">
             {/* Configuration Cards */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
                    Invoice Details
                </h3>
                <div className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Invoice Number</label>
                        <input type="text" value={data.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Date</label>
                            <input type="date" value={data.date} onChange={(e) => updateField('date', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none font-medium" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Due Date</label>
                            <input type="date" value={data.dueDate} onChange={(e) => updateField('dueDate', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none font-medium" />
                        </div>
                    </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
                    Participants
                </h3>
                <div className="space-y-5">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <label className="text-xs font-bold text-slate-400 block mb-3 uppercase tracking-wider">Client (Bill To)</label>
                        <input type="text" placeholder="Client Name" value={data.client.name} onChange={(e) => updateField('client.name', e.target.value)} className="w-full mb-2 p-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none" />
                        <input type="email" placeholder="Client Email" value={data.client.email} onChange={(e) => updateField('client.email', e.target.value)} className="w-full mb-2 p-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none" />
                        <textarea placeholder="Address" value={data.client.address} onChange={(e) => updateField('client.address', e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded text-sm h-20 resize-none focus:border-amber-500 outline-none" />
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                         <label className="text-xs font-bold text-slate-400 block mb-3 uppercase tracking-wider">Sender (From)</label>
                         <input type="text" placeholder="Your Company" value={data.sender.name} onChange={(e) => updateField('sender.name', e.target.value)} className="w-full mb-2 p-2 bg-white border border-slate-200 rounded text-sm focus:border-amber-500 outline-none" />
                         <textarea placeholder="Address" value={data.sender.address} onChange={(e) => updateField('sender.address', e.target.value)} className="w-full p-2 bg-white border border-slate-200 rounded text-sm h-20 resize-none focus:border-amber-500 outline-none" />
                    </div>
                </div>
             </div>
             
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
                    Financial Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Tax Rate (%)</label>
                        <input type="number" value={data.taxRate} onChange={(e) => updateField('taxRate', parseFloat(e.target.value))} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Currency</label>
                        <select value={data.currency} onChange={(e) => updateField('currency', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="ZAR">ZAR (R)</option>
                        </select>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* Invoice Preview Canvas */}
        <div className={`w-full ${mode === 'edit' ? 'lg:w-2/3 order-1 lg:order-2' : 'max-w-4xl mx-auto'}`}>
            <div className="bg-white shadow-2xl rounded-none sm:rounded-lg overflow-hidden min-h-[1000px] print:shadow-none print:w-full print:h-full print:m-0 print:overflow-visible" id="invoice-preview">
                {/* Visual Invoice Paper */}
                <div className="p-8 md:p-16 h-full flex flex-col justify-between relative">
                    
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-3 bg-slate-900 print:bg-slate-900"></div>
                    <div className="absolute top-3 left-0 w-full h-1 bg-amber-500 print:bg-amber-500"></div>

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-16 pt-6">
                        <div className="flex items-start gap-4">
                             <div className="text-slate-900 mt-1">
                                <LotusLogo className="w-16 h-16" color="text-amber-500" />
                             </div>
                             <div>
                                <div className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1 uppercase">
                                    {data.sender.name}
                                </div>
                                <div className="text-xs font-medium text-amber-600 uppercase tracking-widest mb-4">Professional Services</div>
                                <div className="text-sm text-slate-500 whitespace-pre-line leading-relaxed max-w-xs">
                                    {data.sender.address}
                                    {data.sender.phone && <div className="mt-1 font-medium text-slate-700">{data.sender.phone}</div>}
                                    {data.sender.email && <div className="font-medium text-slate-700">{data.sender.email}</div>}
                                </div>
                             </div>
                        </div>
                        <div className="mt-10 md:mt-0 text-right">
                            <h1 className="text-6xl font-thin text-slate-100 uppercase tracking-tighter mb-6 select-none print:text-slate-200">Invoice</h1>
                            <div className="flex flex-col gap-2 items-end">
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Date</span>
                                    <span className="font-bold text-slate-900 min-w-[100px]">{formatDate(data.date)}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Invoice No</span>
                                    <span className="font-bold text-slate-900 min-w-[100px]">{data.invoiceNumber}</span>
                                </div>
                                {data.dueDate && (
                                    <div className="flex items-center gap-4 text-sm mt-2 pt-2 border-t border-slate-100">
                                        <span className="text-amber-600 font-bold uppercase tracking-wider text-xs">Due Date</span>
                                        <span className="font-bold text-slate-900 min-w-[100px]">{formatDate(data.dueDate)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Client Section */}
                    <div className="mb-16 bg-slate-50 p-6 rounded-lg border-l-4 border-amber-500 print:bg-transparent print:p-0 print:border-none">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</div>
                        <div className="text-2xl font-bold text-slate-900 mb-2">{data.client.name || 'Client Name'}</div>
                        <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed max-w-lg">
                            {data.client.address || 'Client Address'}
                            {data.client.email && <div className="mt-2 font-medium text-amber-600">{data.client.email}</div>}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex-grow">
                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-slate-900">
                                    <th className="text-left py-4 text-xs font-extrabold text-slate-900 uppercase tracking-widest w-1/2">Description</th>
                                    <th className="text-center py-4 text-xs font-extrabold text-slate-900 uppercase tracking-widest w-24">Qty</th>
                                    <th className="text-right py-4 text-xs font-extrabold text-slate-900 uppercase tracking-widest w-32">Price</th>
                                    <th className="text-right py-4 text-xs font-extrabold text-slate-900 uppercase tracking-widest w-32">Total</th>
                                    {mode === 'edit' && <th className="w-10 no-print"></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.items.map((item, index) => (
                                    <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-5 align-top">
                                            {mode === 'edit' ? (
                                                <input 
                                                    type="text" 
                                                    value={item.description} 
                                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                    className="w-full bg-transparent border-b border-dashed border-slate-300 focus:border-amber-500 outline-none transition-colors font-medium text-slate-800"
                                                    placeholder="Item Description"
                                                />
                                            ) : (
                                                <span className="font-bold text-slate-800 text-sm">{item.description}</span>
                                            )}
                                        </td>
                                        <td className="py-5 text-center align-top">
                                            {mode === 'edit' ? (
                                                <input 
                                                    type="number" 
                                                    value={item.quantity} 
                                                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                                                    className="w-full text-center bg-transparent border-b border-dashed border-slate-300 focus:border-amber-500 outline-none transition-colors"
                                                />
                                            ) : (
                                                <span className="text-slate-600 text-sm font-medium">{item.quantity}</span>
                                            )}
                                        </td>
                                        <td className="py-5 text-right align-top text-slate-600">
                                            {mode === 'edit' ? (
                                                 <input 
                                                    type="number" 
                                                    value={item.price} 
                                                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                                                    className="w-full text-right bg-transparent border-b border-dashed border-slate-300 focus:border-amber-500 outline-none transition-colors"
                                                />
                                            ) : (
                                                <span className="text-sm">{formatCurrency(item.price, data.currency)}</span>
                                            )}
                                        </td>
                                        <td className="py-5 text-right align-top font-bold text-slate-900">
                                            {formatCurrency(item.quantity * item.price, data.currency)}
                                        </td>
                                        {mode === 'edit' && (
                                            <td className="py-5 text-center align-top no-print">
                                                <button onClick={() => removeItem(index)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {mode === 'edit' && (
                            <button onClick={addItem} className="no-print flex items-center gap-2 text-amber-600 text-sm font-bold hover:bg-amber-50 px-4 py-3 rounded-lg transition-colors mb-8 border border-amber-100 hover:border-amber-200">
                                <Plus className="w-4 h-4" /> Add Item Line
                            </button>
                        )}
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end mt-4">
                        <div className="w-full sm:w-1/2 lg:w-5/12">
                            <div className="flex justify-between py-3 text-sm text-slate-600 border-b border-slate-100">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-bold text-slate-800">{formatCurrency(subtotal, data.currency)}</span>
                            </div>
                            <div className="flex justify-between py-3 text-sm text-slate-600 border-b border-slate-100">
                                <span className="font-medium">Tax ({data.taxRate}%)</span>
                                <span className="font-bold text-slate-800">{formatCurrency(taxAmount, data.currency)}</span>
                            </div>
                            <div className="flex justify-between py-5 text-xl font-extrabold text-slate-900">
                                <span>Total</span>
                                <span className="text-amber-600">{formatCurrency(total, data.currency)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Bank Details */}
                    <div className="mt-16 pt-8 border-t-2 border-slate-900 flex flex-col md:flex-row gap-8 justify-between text-xs text-slate-500">
                        <div className="space-y-1">
                            <p className="font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                Bank Details
                            </p>
                            <p className="font-medium">Bank: <span className="text-slate-700">City Central Bank</span></p>
                            <p className="font-medium">Account Name: <span className="text-slate-700">{data.sender.name}</span></p>
                            <p className="font-medium">Account No: <span className="text-slate-700">**** **** **** 1234</span></p>
                        </div>
                        <div className="md:text-right max-w-xs">
                             <p className="font-bold text-slate-900 uppercase tracking-widest mb-3">Terms & Conditions</p>
                             <p className="leading-relaxed">{data.notes || "Please pay within 15 days. Thank you for your business."}</p>
                             <p className="mt-4 font-bold text-slate-900">MG Installations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
