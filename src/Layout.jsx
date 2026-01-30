import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children, currentPageName }) {
  const noHeaderFooter = ['Privacy', 'Terms', 'Shipping', 'Returns'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-[#F5F1E8] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --color-navy: #0E2A47;
          --color-charcoal: #2B2B2B;
          --color-cream: #F5F1E8;
          --color-beige: #EBE4D8;
          --color-gold: #A88D4B;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        
        .font-sans {
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        ::selection {
          background: var(--color-gold);
          color: var(--color-cream);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      
      {!noHeaderFooter && <Header />}
      
      <main>
        {children}
      </main>
      
      {!noHeaderFooter && <Footer />}
    </div>
  );
}