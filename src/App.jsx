import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Rocket, PenTool, Layers, Anchor, 
  CheckCircle2, X, Menu, ArrowRight, Star, 
  TrendingUp, Users, ChevronDown, Award,
  ShoppingCart, Trash2, Plus, Info, Globe, ShieldCheck,
  Feather, Layout, Monitor, Search, Share2, UserCheck, ExternalLink,
  Mail, Phone, MapPin, GraduationCap, LifeBuoy
} from 'lucide-react';

/* --- CONFIGURATION --- */
const CONFIG = {
  DOMAIN: "publish.naavik.co.in",
  CURRENCY: "₹",
  // REPLACE THIS WITH YOUR ACTUAL RAZORPAY WEBSTORE URL
  RAZORPAY_WEBSTORE_URL: "https://rzp.io/rzp/g7DRzIJw", 
  SUPPORT_EMAILS: ["support@naavik.co.in", "officialnaavik@gmail.com"],
  CONTACT_NUMBERS: ["+91 8595557686", "+91 9953073123"],
  SOCIALS: {
    linkedin: "https://linkedin.com/company/naavik",
    instagram: "https://instagram.com/naavik"
  },
  VENTURES: [
    { name: "Naavik EdTech (Main Site)", url: "https://naavik.co.in", desc: "Maritime Education & Courses" },
    { name: "Naavik Olympiad", url: "https://olympiad.naavik.co.in", desc: "National Maritime Competitions" },
    { name: "Smart Helmet Solutions", url: "https://smarthelmet.naavik.co.in", desc: "Industrial IoT Safety" }
  ]
};

/* --- DATA: PACKAGES --- */
const PACKAGES = [
  { 
    id: 'pkg_basic', 
    name: "Basic Package", 
    price: 1499, 
    desc: "For first-time authors who need essential support.",
    deliverables: [
      "Basic editing + proofreading (up to 10k words)",
      "eBook interior formatting",
      "One ready-to-upload manuscript file",
      "KDP setup help",
      "Basic cover template",
      "1 revision cycle"
    ]
  },
  { 
    id: 'pkg_std', 
    name: "Standard Package", 
    price: 2499, 
    desc: "Professional-level publishing at an affordable price.",
    isPopular: true,
    deliverables: [
      "Full editing + proofreading",
      "Formatting (eBook + paperback)",
      "Custom cover design",
      "KDP upload + keyword setup",
      "SEO-optimized book description",
      "1 LinkedIn shoutout",
      "20-min author guidance call",
      "2 revision cycles"
    ]
  },
  { 
    id: 'pkg_prem', 
    name: "Premium Package", 
    price: 3499, 
    desc: "For authors seeking the complete, polished experience.",
    deliverables: [
      "Premium deep editing",
      "High-quality eBook + print formatting",
      "Premium custom cover",
      "KDP upload + full optimization",
      "Metadata & keyword research",
      "Marketing boost (LinkedIn + Insta + Club)",
      "30-minute coaching call",
      "Priority support",
      "3 revision cycles"
    ]
  },
];

/* --- DATA: DETAILED SERVICES --- */
const SERVICES_DETAILED = [
  {
    id: 'srv_edit',
    title: "Editing & Proofreading",
    price: 499,
    range: "₹499 – ₹1,499",
    desc: "Polish your manuscript to perfection. We correct grammar, flow, clarity, and consistency.",
    includes: ["Grammar & spelling", "Flow improvement", "Line editing", "Removal of AI patterns"],
    icon: <PenTool />
  },
  {
    id: 'srv_fmt',
    title: "Book Formatting",
    price: 399,
    range: "₹399 – ₹799",
    desc: "Professional KDP-compatible formatting for both digital and print editions.",
    includes: ["Clean layout design", "Page styling", "Mobile-responsive eBook", "Print-ready PDF"],
    icon: <Layers />
  },
  {
    id: 'srv_cvr',
    title: "Custom Cover Design",
    price: 499,
    range: "₹499 – ₹1,299",
    desc: "A stunning cover that grabs attention and gives your book a professional identity.",
    includes: ["Front cover", "Back cover", "Spine design", "High-res 300 DPI export"],
    icon: <BookOpen />
  },
  {
    id: 'srv_kdp',
    title: "KDP Setup & Upload",
    price: 599,
    range: "₹599 – ₹1,499",
    desc: "We handle the entire Amazon KDP upload process so you don't struggle with technical steps.",
    includes: ["Account setup", "Category selection", "Keywords optimization", "Final publishing checklist"],
    icon: <Rocket />
  },
  {
    id: 'srv_desc',
    title: "SEO Book Description",
    price: 249,
    range: "₹249 – ₹399",
    desc: "A compelling, keyword-rich book description that improves discoverability.",
    includes: ["Keyword research", "Hook & emotional connection", "Conversion optimization"],
    icon: <Search />
  },
  {
    id: 'srv_mkt',
    title: "Marketing Boost",
    price: 299,
    range: "₹299 – ₹499",
    desc: "Get your book visible through our Naavik audience.",
    includes: ["LinkedIn shoutout", "Instagram story mention", "Naavik Authors Club listing"],
    icon: <Share2 />
  },
  {
    id: 'srv_coa',
    title: "Author Coaching",
    price: 199,
    range: "₹199 – ₹499",
    desc: "A 20–30 minute 1:1 session to guide you through writing and strategy.",
    includes: ["Writing structure", "Publishing strategy", "Book positioning"],
    icon: <UserCheck />
  }
];

/* --- DATA: FAQ --- */
const FAQ_DATA = [
  { q: "How long does publishing take?", a: "Typically 7–14 days depending on edits and revisions. We move as fast as you need without compromising quality." },
  { q: "Can I publish on Amazon KDP through Naavik?", a: "Yes — we handle the complete upload & optimization so you don't have to worry about technical details or formatting errors." },
  { q: "Do I own all rights to my book?", a: "Absolutely. You retain 100% copyright and 100% of your earnings from Amazon. We are a service provider, not a traditional publisher that takes royalties." },
  { q: "What if I need revisions?", a: "Each package includes specific revision cycles to ensure you are happy with the output. Additional revisions can be purchased if needed." },
  { q: "Is the pricing fixed?", a: "Yes. Transparent pricing with no hidden charges. The price you see is the price you pay." },
  { q: "Can Naavik help me promote my book?", a: "Yes. Our Marketing Boost includes LinkedIn + Instagram promotion to our maritime and student community." }
];

/* --- ANIMATIONS --- */
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

/* --- COMPONENTS --- */

const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50 pointer-events-none">
    {/* Subtle Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    
    {/* Moving Orbs - Light Theme Optimized */}
    <motion.div 
      animate={{ 
        x: [0, 100, 0], 
        y: [0, -50, 0],
        opacity: [0.3, 0.5, 0.3]
      }} 
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
      className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[100px]" 
    />
    <motion.div 
      animate={{ 
        x: [0, -100, 0], 
        y: [0, 100, 0],
        opacity: [0.3, 0.5, 0.3]
      }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
      className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-cyan-300/30 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2]
      }} 
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }} 
      className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[120px]" 
    />
  </div>
);

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - IMAGE PLACEHOLDER */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-20 w-20 relative overflow-hidden rounded-lg shadow-sm border border-slate-200 bg-white">
            <img 
              src="src\assets\logo.jpg" 
              alt="Naavik Logo" 
              className="object-cover w-full h-full"
              onError={(e) => {e.target.onerror = null; e.target.src = "src\assets\logo.jpg"}}
            />
          </div>
          <div className="flex flex-col">
            <span className={`text-lg md:text-4xl font-bold tracking-tight font-heading leading-none ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Naavik Publishing House
            </span>
            <span className="text-[12px] text-slate-500 uppercase tracking-widest hidden md:block">Empowering Authors</span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {['Services', 'Pricing', 'Process', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-wide">
              {item}
            </a>
          ))}
          <button onClick={onOpenCart} className="relative px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-all flex items-center gap-2 group">
            <ShoppingCart size={16} className="group-hover:text-blue-600 transition-colors" />
            <span className="group-hover:text-blue-600 transition-colors">Cart</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full font-bold shadow-md">{cartCount}</span>}
          </button>
          <button onClick={onOpenCart} className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:scale-105">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={onOpenCart} className="relative text-slate-800">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
          </button>
          <button className="text-slate-800" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl">
            <div className="flex flex-col p-6 gap-4">
              {['Services', 'Pricing', 'Process', 'FAQ'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-slate-700 text-lg font-medium">{item}</a>)}
              <button onClick={() => { setMenuOpen(false); onOpenCart(); }} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold mt-2 shadow-lg">Book Services</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BookingModal = ({ isOpen, onClose, cart, onRemove, total }) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);

  const handleRedirectToStore = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = CONFIG.RAZORPAY_WEBSTORE_URL;
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><ShoppingCart className="text-blue-600" size={20}/> Your Selection</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X/></button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
           {cart.length === 0 ? (
             <div className="text-center py-10">
               <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"><ShoppingCart size={30}/></div>
               <p className="text-slate-500 text-lg">Your cart is empty.</p>
               <button onClick={onClose} className="mt-4 text-blue-600 font-bold hover:underline">Browse Services</button>
             </div>
           ) : (
             <div className="space-y-3">
               {cart.map((item, i) => (
                 <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                   <div>
                     <div className="text-sm text-slate-900 font-bold">{item.name || item.title}</div>
                     <div className="text-xs text-blue-600 font-medium">₹{item.price}</div>
                   </div>
                   <button onClick={() => onRemove(item.id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
           <div className="flex justify-between text-slate-900 font-bold text-xl mb-6">
             <span>Total Estimate</span>
             <span>₹{total.toLocaleString()}</span>
           </div>
           
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4 text-sm text-blue-800 flex items-start gap-2">
              <Info size={16} className="mt-0.5 shrink-0"/>
              <p>You will be redirected to our secure Razorpay Webstore to complete your purchase and enter manuscript details.</p>
           </div>

           <button 
             onClick={handleRedirectToStore}
             disabled={loading} 
             className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 flex justify-center items-center gap-2 text-lg"
           >
              {loading ? 'Redirecting...' : 'Proceed to Payment Gateway'} <ExternalLink size={18}/>
           </button>
           <p className="text-center text-xs text-slate-400 mt-3"><ShieldCheck size={12} className="inline mr-1"/>Secure Payment via Razorpay</p>
        </div>
      </motion.div>
    </div>
  );
};

/* --- MAIN APP --- */
const App = () => {
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  // Cart Logic
  const addToCart = (item, openModal = false) => {
    if (!cart.find(c => c.id === item.id)) {
      setCart([...cart, item]);
    }
    if (openModal) setModalOpen(true);
  };
  const toggleItem = (item) => {
    if (cart.find(c => c.id === item.id)) setCart(cart.filter(c => c.id !== item.id));
    else setCart([...cart, item]);
  };
  const removeItem = (id) => setCart(cart.filter(c => c.id !== id));
  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="font-sans antialiased text-slate-600 bg-slate-50 min-h-screen selection:bg-blue-200 selection:text-blue-900">
      <Background />
      <Navbar cartCount={cart.length} onOpenCart={() => setModalOpen(true)} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest mb-8 uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Empowering the Next Generation of Authors
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-slate-900 mb-6 font-heading">
              Publish Your Book <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
                Professionally.
              </span>
            </h1>
            <h2 className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Naavik Publishing House helps young writers and maritime students turn their ideas into beautifully crafted books — complete with editing, design, formatting, and Amazon KDP launch support.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setModalOpen(true)} className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/20">
                Book Now — Start at ₹1,499
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#pricing" className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-bold hover:bg-white hover:shadow-md transition-all text-center bg-white/50 backdrop-blur-sm">
                Explore Pricing
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
              {["No hidden charges", "Email confirmation", "Full support"].map(i => (
                <span key={i} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-600" /> {i}</span>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: yHero }} className="hidden md:block relative perspective-1000">
             {/* 3D Book Container with Image Placeholder */}
             <div className="relative w-[360px] h-[540px] mx-auto group perspective-1000">
                <div className="relative w-full h-full rounded-r-2xl shadow-[20px_20px_60px_rgba(0,0,0,0.15)] transform rotate-y-[-12deg] rotate-x-[5deg] group-hover:rotate-y-[0deg] transition-transform duration-700 bg-white border-l-4 border-slate-200">
                   {/* BOOK COVER IMAGE PLACEHOLDER */}
                   <img 
                     src="/images/naavik.png" 
                     alt="Book Mockup" 
                     className="w-full h-full object-cover rounded-r-xl"
                     onError={(e) => {e.target.onerror = null; e.target.src = "https://placehold.co/360x540?text=Book+Cover"}}
                   />
                   
                   {/* Spine Effect */}
                   <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -right-8 top-16 bg-white/90 backdrop-blur-xl border border-slate-100 p-4 rounded-xl shadow-xl z-20">
                   <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600"><TrendingUp size={20}/></div>
                      <div><div className="text-xs text-slate-500">Published in</div><div className="font-bold text-slate-900">7 Days</div></div>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR & METRICS */}
      <div className="w-full bg-white border-y border-slate-100 py-12 shadow-sm relative z-20">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-10">
               {[
                 { num: "10,000+", label: "Students Mentored" },
                 { num: "2,000+", label: "LinkedIn Connections" },
                 { num: "1,000+", label: "Naavik Community" },
                 { num: "Top Rated", label: "Service Quality" }
               ].map((stat, idx) => (
                  <div key={idx}>
                     <div className="text-3xl font-bold text-slate-900 mb-1">{stat.num}</div>
                     <div className="text-slate-500 text-sm uppercase tracking-wide font-medium">{stat.label}</div>
                  </div>
               ))}
            </div>
            <div className="flex justify-center flex-wrap gap-4 pt-8 border-t border-slate-100">
              {[
                "Student-Friendly Pricing", "KDP-Ready Deliverables", "Maritime + Youth Focused", "Fast Publishing"
              ].map((badge, idx) => (
                <div key={idx} className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-semibold flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                   <Award size={16} className="text-blue-500" /> {badge}
                </div>
              ))}
            </div>
         </div>
      </div>

      {/* 3. PROBLEM / WHY WRITE */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-heading">Why You Should Write Your Book</h2>
             <p className="text-slate-600 text-lg">Every person carries experiences, insights, and stories that deserve to be shared. Writing a book is no longer a luxury — it’s a powerful tool.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
             {[
               { icon: <Feather/>, title: "Share Your Story", desc: "Your journey can inspire, educate, or even transform someone’s life." },
               { icon: <Award/>, title: "Build Authority", desc: "A published book instantly boosts your credibility in academics or maritime fields." },
               { icon: <UserCheck/>, title: "Stand Out", desc: "Recruiters love candidates with a published title — it says discipline & creativity." },
               { icon: <BookOpen/>, title: "Leave a Legacy", desc: "Your words stay forever — long after the moment has passed." },
               { icon: <TrendingUp/>, title: "Passive Income", desc: "Publish once, earn lifelong royalties through Amazon KDP." },
               { icon: <Rocket/>, title: "Express Yourself", desc: "Writing brings clarity, confidence, and emotional release." }
             ].map((item, i) => (
               <motion.div key={i} whileHover={{y: -5}} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-200 transition-all group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 4. WHY NAAVIK (USP) - Added Label */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Why Choose Us</span>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">Why Choose Naavik?</h2>
             <p className="text-slate-500">We are not just a publisher; we are your partners in success.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { title: "Student-First Pricing", desc: "Premium publishing made affordable. No agency-level ₹20,000+ charges. Only simple & honest pricing.", icon: <Star className="text-yellow-500"/>, color: "bg-yellow-50" },
               { title: "End-to-End Support", desc: "We take care of everything — editing, design, formatting, KDP upload. You simply focus on writing.", icon: <Layout className="text-purple-500"/>, color: "bg-purple-50" },
               { title: "Maritime Expertise", desc: "We understand student challenges and maritime themes better than any traditional publisher.", icon: <Anchor className="text-cyan-500"/>, color: "bg-cyan-50" },
               { title: "AI-Enabled Speed", desc: "We combine human expertise with AI-enhanced workflows to deliver in days, not months.", icon: <Monitor className="text-green-500"/>, color: "bg-green-50" }
             ].map((usp, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 relative overflow-hidden group hover:border-blue-400 transition-colors shadow-sm hover:shadow-lg">
                   <div className={`w-14 h-14 ${usp.color} rounded-xl flex items-center justify-center mb-6`}>{usp.icon}</div>
                   <h3 className="text-lg font-bold text-slate-900 mb-3">{usp.title}</h3>
                   <p className="text-slate-600 text-sm leading-relaxed">{usp.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section id="services" className="py-24 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-heading">Our Publishing Services</h2>
            <p className="text-slate-500">Choose individual services or save money with our packages.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {SERVICES_DETAILED.map((srv) => {
               const isAdded = cart.some(c => c.id === srv.id);
               return (
                 <motion.div 
                   key={srv.id} 
                   className={`p-8 rounded-2xl border transition-all relative group overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl
                     ${isAdded ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'}`}
                 >
                    <div className="flex justify-between items-start mb-6">
                       <div className={`p-3 rounded-xl ${isAdded ? 'bg-blue-600 text-white' : 'bg-slate-100 text-blue-600'}`}>{srv.icon}</div>
                       <div className="text-right">
                          <div className="text-xl font-bold text-slate-900">₹{srv.price}</div>
                          <div className="text-xs text-slate-400 line-through">{srv.range.split('–')[1]}</div>
                       </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">{srv.desc}</p>
                    
                    <div className="mb-6">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-2">Includes:</div>
                       <ul className="space-y-1">
                          {srv.includes.map((inc, k) => (
                             <li key={k} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0"></span> {inc}
                             </li>
                          ))}
                       </ul>
                    </div>

                    <button 
                       onClick={() => toggleItem(srv)}
                       className={`w-full py-3 rounded-xl text-sm font-bold border transition-colors flex items-center justify-center gap-2
                       ${isAdded ? 'bg-white text-red-500 border-red-200 hover:bg-red-50' : 'bg-slate-900 text-white border-transparent hover:bg-slate-800'}`}
                    >
                       {isAdded ? <><Trash2 size={14}/> Remove</> : <><Plus size={14}/> Add to Cart</>}
                    </button>
                 </motion.div>
               )
             })}
          </div>
        </div>
      </section>

      {/* 6. PRICING PACKAGES */}
      <section id="pricing" className="py-24 relative z-10 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-heading">Choose Your Publishing Package</h2>
              <p className="text-slate-500">Simple, transparent pricing for every type of writer.</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
              {PACKAGES.map((pkg) => (
                 <div key={pkg.id} className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col h-full shadow-xl
                    ${pkg.isPopular 
                       ? 'bg-slate-900 text-white border-blue-500 ring-4 ring-blue-500/10 lg:-translate-y-4' 
                       : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300'}`}
                 >
                    {pkg.isPopular && (
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">Most Popular</div>
                    )}
                    <h3 className={`text-xl font-bold mb-2 ${pkg.isPopular ? 'text-cyan-400' : 'text-slate-900'}`}>{pkg.name}</h3>
                    <div className={`text-4xl font-bold mb-4 ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>₹{pkg.price.toLocaleString()}</div>
                    <p className={`text-sm mb-8 min-h-[40px] ${pkg.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.desc}</p>
                    
                    <button 
                       onClick={() => addToCart(pkg, true)}
                       className={`w-full py-4 rounded-xl font-bold transition-all mb-8
                       ${pkg.isPopular ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
                    >
                       Select Package
                    </button>
                    
                    <ul className="space-y-4 flex-grow">
                       {pkg.deliverables.map((item, i) => (
                          <li key={i} className={`flex gap-3 text-sm ${pkg.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                             <CheckCircle2 size={16} className={`shrink-0 ${pkg.isPopular ? 'text-cyan-400' : 'text-blue-600'}`} />
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              ))}
           </div>
           
           {/* A-La-Carte Quick View */}
           <div className="mt-20 max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
             <h4 className="text-xl font-bold text-slate-900 mb-6">A-la-carte Pricing Overview</h4>
             <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
               {SERVICES_DETAILED.map(s => (
                 <span key={s.id}>
                   <span className="text-slate-900 font-medium">{s.title}:</span> ₹{s.price}
                 </span>
               ))}
             </div>
             <div className="mt-6">
                <a href="#services" className="text-blue-600 text-sm font-bold hover:underline">View detailed services above ↑</a>
             </div>
           </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section id="process" className="py-24 relative z-10 bg-white">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-16 font-heading">Simple, Smooth & Student-Friendly Process</h2>
            <div className="relative max-w-4xl mx-auto">
               <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
               {[
                  { step: 1, title: "Book Your Service", desc: "Choose a package or individual service. Pay securely and receive instant email confirmation.", time: "Day 1" },
                  { step: 2, title: "Complete Onboarding", desc: "Fill a short form with your manuscript, bio, and book details.", time: "Day 2" },
                  { step: 3, title: "Editing & Design", desc: "Our team begins working on your files with AI-augmented precision and human expertise.", time: "Day 3-10" },
                  { step: 4, title: "Review & Finalize", desc: "You receive drafts, provide feedback, and approve revisions.", time: "Day 11" },
                  { step: 5, title: "Publish & Promote", desc: "We upload your book on Amazon KDP and boost your visibility through our Naavik community.", time: "Day 12+" }
               ].map((s, i) => (
                  <motion.div key={i} initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} transition={{delay:i*0.1}} className="flex gap-8 mb-12 relative group">
                     <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                        {s.step}
                     </div>
                     <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl w-full hover:bg-white hover:shadow-md transition-all">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="text-xl font-bold text-slate-900">{s.title}</h4>
                           <span className="text-xs font-mono text-blue-600 border border-blue-200 px-2 py-1 rounded bg-blue-50">{s.time}</span>
                        </div>
                        <p className="text-slate-600">{s.desc}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 8. CASE STUDY (MOVED BELOW PROCESS) */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 md:order-1">
               <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block tracking-wide">SUCCESS STORY</span>
               <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading leading-tight">From Manuscript to Amazon Bestseller in 12 Days</h2>
               <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                 "I had the story, but no idea how to publish. Naavik Publishing handled the editing, cover design, and the confusing Amazon KDP upload process. Seeing my book live was a dream come true."
               </p>
               
               <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">200+</div>
                    <div className="text-xs text-slate-400 uppercase">Downloads</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">#1</div>
                    <div className="text-xs text-slate-400 uppercase">New Release Category</div>
                  </div>
               </div>

               <button onClick={() => setModalOpen(true)} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-lg">
                 Start Your Success Story
               </button>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center perspective-1000">
               <div className="relative w-[320px] md:w-[400px] h-[500px] md:h-[600px] bg-slate-800 rounded-lg shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-[0deg] transition-all duration-700 border-4 border-white/10">
                  {/* FIRST BOOK IMAGE PLACEHOLDER */}
                  <img 
                    src="src\assets\seasense.jpg" 
                    alt="Success Story Book Cover" 
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {e.target.onerror = null; e.target.src = "https://placehold.co/400x600?text=Bestseller"}}
                  />
               </div>
            </div>
         </div>
      </section>

      {/* 9. DELIVERABLES MATRIX */}
      <section className="py-24 relative z-10 bg-slate-50">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 font-heading">Compare Deliverables</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
               <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                     <tr className="bg-slate-50">
                        <th className="p-6 border-b border-slate-200 text-slate-500 font-medium uppercase text-xs tracking-wider">Feature</th>
                        <th className="p-6 border-b border-slate-200 text-slate-900 font-bold text-center">Basic</th>
                        <th className="p-6 border-b border-blue-200 text-blue-700 font-bold text-center bg-blue-50">Standard</th>
                        <th className="p-6 border-b border-slate-200 text-slate-900 font-bold text-center">Premium</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                     {[
                        {n: "Editing", b: "Basic (<10k)", s: "Full Line Edit", p: "Developmental"},
                        {n: "Formatting (eBook)", b: "✓", s: "✓", p: "✓"},
                        {n: "Formatting (Print)", b: "-", s: "✓", p: "High-Quality"},
                        {n: "Cover Design", b: "Template", s: "Custom", p: "Premium Custom"},
                        {n: "KDP Upload", b: "Assistance", s: "Full Upload", p: "Full Upload + Meta"},
                        {n: "Keyword Opt", b: "-", s: "✓", p: "✓"},
                        {n: "SEO Description", b: "-", s: "✓", p: "✓"},
                        {n: "Marketing Boost", b: "-", s: "LinkedIn", p: "LinkedIn + Insta"},
                        {n: "Coaching Call", b: "-", s: "20 min", p: "30 min"}
                     ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                           <td className="p-4 pl-6 font-medium text-slate-900">{row.n}</td>
                           <td className="p-4 text-center">{row.b}</td>
                           <td className="p-4 text-center bg-blue-50/50 font-medium text-blue-800">{row.s}</td>
                           <td className="p-4 text-center">{row.p}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* 10. TESTIMONIALS - Added Label */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Testimonials</span>
                <h2 className="text-3xl font-bold text-slate-900 font-heading">What Writers Say About Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
               {[
                  { t: "Naavik made publishing unbelievably easy. The editing and cover design were world-class.", a: "Student Author" },
                  { t: "As a maritime aspirant, having someone who understands our field makes a huge difference.", a: "Cadet, IMU" },
                  { t: "Affordable, fast, and extremely professional. Highly recommended for first-time writers.", a: "Self-Published Author" }
               ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative shadow-sm">
                     <span className="text-4xl text-blue-200 absolute top-4 left-4 font-serif">"</span>
                     <p className="text-slate-600 relative z-10 mb-6 leading-relaxed italic">{item.t}</p>
                     <div className="border-t border-slate-200 pt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">{item.a[0]}</div>
                        <span className="text-sm font-bold text-slate-900 block">{item.a}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 11. FAQ (FIXED VISIBILITY) */}
      <section id="faq" className="py-20 bg-slate-100 relative z-20"> 
         <div className="container mx-auto px-6 max-w-3xl"> 
            <div className="text-center mb-12">
               <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Support Center</div>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading mb-4">Frequently Asked Questions</h2>
               <p className="text-slate-600 text-lg">Everything you need to know about the publishing process.</p>
            </div>
            
            <div className="space-y-4">
               {FAQ_DATA.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200">
                     <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-slate-900">
                           <span className="text-lg font-bold group-hover:text-blue-600 transition-colors text-left">{item.q}</span>
                           <span className="transition group-open:rotate-180">
                             <ChevronDown size={20} className="text-slate-400 group-hover:text-blue-600"/>
                           </span>
                        </summary>
                        <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                           {item.a}
                        </div>
                     </details>
                  </div>
               ))}
            </div>

            <div className="mt-12 text-center bg-blue-600 rounded-2xl p-8 text-white shadow-lg">
               <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
               <p className="mb-6 opacity-90">Can't find the answer you're looking for? Please chat to our friendly team.</p>
               <a href={`mailto:${CONFIG.SUPPORT_EMAILS[0]}`} className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                  <Mail size={18}/> Contact Support
               </a>
            </div>
         </div>
      </section>

      {/* 12. FOOTER (HIGHLY DETAILED) */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-slate-800 relative z-10">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
               {/* Column 1: Brand */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-white rounded flex items-center justify-center overflow-hidden">
                        <img 
                          src="src\assets\logo.jpg" 
                          alt="N" 
                          className="w-full h-full object-cover"
                          onError={(e) => {e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=N"}}
                        />
                     </div>
                     <span className="text-2xl font-bold font-heading">Naavik Publishing<span className="text-cyan-500">.</span></span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm">
                     India's premier student-focused publishing house. We turn manuscripts into legacies with affordable, high-tech publishing solutions designed for the maritime and academic community.
                  </p>
                  <div className="flex gap-4 pt-2">
                     <a href={CONFIG.SOCIALS.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300"><Globe size={18}/></a>
                     <a href={CONFIG.SOCIALS.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white transition-all duration-300"><Users size={18}/></a>
                  </div>
               </div>

               {/* Column 2: Quick Links */}
               <div>
                  <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                     Quick Links
                     <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-cyan-500 rounded-full"></span>
                  </h3>
                  <ul className="space-y-3 text-slate-400">
                     <li><a href="#services" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> Services & Pricing</a></li>
                     <li><a href="#process" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> How it Works</a></li>
                     <li><a href="#faq" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> FAQ</a></li>
                     <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> Authors Login</a></li>
                  </ul>
               </div>

               {/* Column 3: Contact Info (Detailed) */}
               <div>
                  <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                     Contact Us
                     <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-cyan-500 rounded-full"></span>
                  </h3>
                  <ul className="space-y-4 text-slate-400">
                     <li className="flex items-start gap-3">
                        <MapPin className="shrink-0 text-cyan-500 mt-1" size={18}/>
                        <span>New Delhi, India</span>
                     </li>
                     <li className="flex items-start gap-3">
                        <Mail className="shrink-0 text-cyan-500 mt-1" size={18}/>
                        <div className="flex flex-col gap-1">
                           <a href={`mailto:${CONFIG.SUPPORT_EMAILS[0]}`} className="hover:text-white transition-colors">{CONFIG.SUPPORT_EMAILS[0]}</a>
                           <a href={`mailto:${CONFIG.SUPPORT_EMAILS[1]}`} className="hover:text-white transition-colors">{CONFIG.SUPPORT_EMAILS[1]}</a>
                        </div>
                     </li>
                     <li className="flex items-start gap-3">
                        <Phone className="shrink-0 text-cyan-500 mt-1" size={18}/>
                        <div className="flex flex-col gap-1">
                           <a href={`tel:${CONFIG.CONTACT_NUMBERS[0]}`} className="hover:text-white transition-colors">{CONFIG.CONTACT_NUMBERS[0]}</a>
                           <a href={`tel:${CONFIG.CONTACT_NUMBERS[1]}`} className="hover:text-white transition-colors">{CONFIG.CONTACT_NUMBERS[1]}</a>
                        </div>
                     </li>
                  </ul>
               </div>

               {/* Column 4: Our Ventures (Detailed) */}
               <div>
                  <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                     Our Ecosystem
                     <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-cyan-500 rounded-full"></span>
                  </h3>
                  <div className="space-y-4">
                     {CONFIG.VENTURES.map((v, i) => (
                        <a key={i} href={v.url} target="_blank" rel="noreferrer" className="block bg-slate-900 border border-slate-800 p-4 rounded-xl hover:bg-slate-800 hover:border-cyan-500/30 transition-all group">
                           <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{v.name}</span>
                              <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400"/>
                           </div>
                           <p className="text-xs text-slate-500">{v.desc}</p>
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
               <p>&copy; {new Date().getFullYear()} Naavik Publishing House. All rights reserved.</p>
               <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-white transition-colors">Sitemap</a>
               </div>
            </div>
         </div>
         {/* Padding for Mobile Sticky CTA */}
         <div className="h-24 md:hidden"></div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 z-40 flex justify-between items-center pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
         <div>
            <div className="text-xs text-slate-500 uppercase font-bold">Total Estimate</div>
            <div className="text-xl font-bold text-slate-900">₹{totalAmount.toLocaleString()}</div>
         </div>
         <button onClick={() => setModalOpen(true)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg">
           {cart.length > 0 ? `Checkout (${cart.length})` : 'Publish Now'}
         </button>
      </div>

      {/* BOOKING MODAL */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} cart={cart} onRemove={removeItem} total={totalAmount} />
    </div>
  );
};

export default App;
