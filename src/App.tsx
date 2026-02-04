import React, { useState } from 'react';
import Admin from './Admin';
import { Menu, X, CheckCircle, ArrowRight, Smartphone, Globe, Sprout, Users, BarChart3 } from 'lucide-react';
import logo from './assets/logo.png';
import heroImage from './assets/hero.png';
import agriImage from './assets/agri.png';
import techImage from './assets/tech.png';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const BACKEND = (import.meta.env.VITE_BACKEND_URL as string) || 'http://localhost:3000';
  const waHref = `${BACKEND.replace(/\/$/, '')}/api/whatsapp?text=${encodeURIComponent('Hello, I saw your site')}`;

  // If running at /admin path, render the admin UI
  if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Atikwanduka Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-slate-900 hidden sm:block">Atikwanduka Digital</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#agri-tech" className="text-slate-600 hover:text-green-600 transition-colors">Agri-Tech</a>
              <a href="#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-slate-600 hover:text-blue-600 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#home" onClick={toggleMenu} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 rounded-lg">Home</a>
              <a href="#about" onClick={toggleMenu} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 rounded-lg">About</a>
              <a href="#services" onClick={toggleMenu} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 rounded-lg">Services</a>
              <a href="#agri-tech" onClick={toggleMenu} className="block px-3 py-3 text-green-600 font-medium hover:bg-green-50 rounded-lg">Agri-Tech</a>
              <a href="#contact" onClick={toggleMenu} className="block px-3 py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg">Contact Us</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 lg:pt-28 pb-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Now serving Mzumbe & Morogoro
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Growing Business, <span className="text-blue-600">Digitally.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                We are the trusted bridge connecting Tanzanian small businesses and farmers to the digital economy. Affordable, reliable, and made for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                  Start Your Growth
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#services" className="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all">
                  View Services
                </a>
              </div>
              <div className="pt-4 flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Reliable
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Affordable
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Local Support
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-green-100 rounded-3xl transform rotate-3 opacity-70 blur-lg"></div>
              <img 
                src={heroImage} 
                alt="African Business Team" 
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[400px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About / Mission Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">More Than Just Tech Support</h2>
            <p className="text-lg text-slate-600">
              Born at Mzumbe University, Atikwanduka Digital Solutions understands the unique challenges of Tanzanian entrepreneurs. We don't just build websites; we build systems that bring you customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-blue-600" />,
                title: "Student-Led Innovation",
                desc: "Combining academic knowledge with real-world business hustle."
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-green-600" />,
                title: "Trust & Reliability",
                desc: "We value 'Uaminifu'. When we say we'll do it, consider it done."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-blue-600" />,
                title: "Focus on Growth",
                desc: "Every service we offer is designed to increase your efficiency or sales."
              }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-slate-50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="mb-4 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Everything You Need to Grow</h2>
            </div>
            <a href="#contact" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden">
                <img src={techImage} alt="Digital Identity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Digital Identity</h3>
                <p className="text-slate-600 mb-6">
                  Professional websites, Google Maps registration, and social media setup to make your business visible and trusted.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> One-Page Websites</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Google Business Profile</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Social Media Branding</li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-48 overflow-hidden bg-slate-200 flex items-center justify-center">
                 {/* Placeholder for Business Systems if no specific image, reusing tech image with filter or similar */}
                 <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-slate-600 opacity-50" />
                 </div>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Business Efficiency</h3>
                <p className="text-slate-600 mb-6">
                  Simple digital record-keeping systems and basic IT support to replace chaotic paper trails and keep your office running.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Digital Receipts & Invoices</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Inventory Tracking</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> IT Troubleshooting</li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border-b-4 border-green-500">
              <div className="h-48 overflow-hidden">
                <img src={agriImage} alt="Agri Tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                  <Sprout className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Agri-Connect</h3>
                <p className="text-slate-600 mb-6">
                  Specialized digital services for farmers. We use our own agricultural projects to prove that tech grows yields.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Farm Record Keeping</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Market Linkage Support</li>
                  <li className="flex items-center text-sm text-slate-500"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Product Showcasing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study / Agri Section */}
      <section id="agri-tech" className="py-20 bg-green-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
            <img src={agriImage} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-300 font-semibold tracking-wide uppercase text-sm">Our Proof of Concept</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">We Are Farmers Too.</h2>
              <p className="text-green-100 text-lg mb-8 leading-relaxed">
                We don't just talk about tech; we use it in the field. Our agricultural division uses the same digital tools we offer you to manage crops, track expenses, and find buyers.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <p className="italic text-green-50">
                  "Using digital records helped us reduce waste by 20% and connect with buyers in Dar es Salaam directly."
                </p>
                <div className="mt-4 font-semibold text-white">- The Atikwanduka Farm Team</div>
              </div>
            </div>
            <div className="relative">
               {/* Abstract visual representation of data + nature */}
               <div className="aspect-square rounded-full bg-gradient-to-br from-green-500 to-blue-600 opacity-80 blur-3xl absolute inset-0"></div>
               <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">The Digital Farm Advantage</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                        <div className="bg-green-500 p-1 rounded-full mr-3 mt-1"><CheckCircle size={16} /></div>
                        <span>Real-time expense tracking</span>
                    </li>
                    <li className="flex items-start">
                        <div className="bg-green-500 p-1 rounded-full mr-3 mt-1"><CheckCircle size={16} /></div>
                        <span>Digital inventory management</span>
                    </li>
                    <li className="flex items-start">
                        <div className="bg-green-500 p-1 rounded-full mr-3 mt-1"><CheckCircle size={16} /></div>
                        <span>Direct-to-consumer WhatsApp marketing</span>
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Grow?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Let's discuss how we can help your business or farm thrive with simple digital tools.
          </p>
          
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
            <form className="space-y-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+255..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">How can we help?</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32" placeholder="I need a website / I need farm records..."></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
                Send Message
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-slate-500 mb-4">Or chat with us directly:</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="Logo" className="h-8 w-auto brightness-0 invert" />
                <span className="text-white text-lg font-bold">Atikwanduka</span>
              </div>
              <p className="max-w-xs">
                Empowering Mzumbe's businesses and farmers with digital tools that work.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Web Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agri-Tech</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>Mzumbe University</li>
                <li>Morogoro, Tanzania</li>
                <li>info@atikwanduka.co.tz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <div className="mb-2">&copy; {new Date().getFullYear()} Atikwanduka Digital Solutions. All rights reserved.</div>
            <div><a href="/admin" className="text-slate-400 hover:text-white">Admin</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;