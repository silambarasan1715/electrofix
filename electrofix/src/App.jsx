import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Signup/SignupPage';
import StartingPage from './pages/Starting/StartingPage';
import TechnicianRegistrationPage from './pages/TechnicianRegistration/TechnicianRegistrationPage';

import TechnicianCertificationPage from './pages/TechnicianCertification/TechnicianCertificationPage';
import TechnicianReviewPage from './pages/TechnicianReview/TechnicianReviewPage';
import TechnicianDiscoveryPage from './pages/TechnicianDiscovery/TechnicianDiscoveryPage';
import TechnicianProfilePage from './pages/TechnicianProfile/TechnicianProfilePage';
import TechnicianLoginPage from './pages/TechnicianLogin/TechnicianLoginPage';
import BookServicePage from './pages/BookService/BookServicePage';
import MyBookingsPage from './pages/MyBookings/MyBookingsPage';
import TechnicianDashboardPage from './pages/TechnicianDashboard/TechnicianDashboardPage';
import { RegistrationProvider } from './context/RegistrationContext';
import StaticPage from './components/StaticPage';
import AITroubleshootingPage from './pages/AITroubleshooting/AITroubleshootingPage';
import BookingConfirmationPage from './pages/BookingConfirmation/BookingConfirmationPage';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ErrorBoundary>
        <BrowserRouter>
        <RegistrationProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/starting" element={<StartingPage />} />
            <Route path="/ai-troubleshooting" element={<AITroubleshootingPage />} />
            <Route path="/technician-login" element={<TechnicianLoginPage />} />
            <Route path="/technician-registration" element={<TechnicianRegistrationPage />} />

            <Route path="/technician-certification" element={<TechnicianCertificationPage />} />
            <Route path="/technician-review" element={<TechnicianReviewPage />} />
            <Route path="/discovery/:category?" element={<TechnicianDiscoveryPage />} />
            <Route path="/profile/:id" element={<TechnicianProfilePage />} />
            <Route path="/technician-dashboard" element={<TechnicianDashboardPage />} />
            <Route path="/book/:id" element={<BookServicePage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/how-it-works" element={<StaticPage title="How it Works" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>Our platform is designed to make connecting with trusted, high-quality professionals as effortless as possible. You begin by simply searching for the specific service you need, from plumbing to electrical work.</p><p>Once you enter your requirements, we present you with a curated list of vetted experts in your area. You can compare their profiles, read authentic reviews from previous customers, and check their availability in real-time.</p><p>After selecting your preferred expert, booking is completed in just a few clicks. Your technician will arrive at the scheduled time, complete the job to the highest standards, and you can securely pay directly through the platform.</p></div>} />} />
            <Route path="/pricing" element={<StaticPage title="Pricing" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>We firmly believe in transparent and competitive pricing for all services booked through our platform. There are no hidden fees or surprise charges; what you see is what you get.</p><p>Before any work begins, our technicians provide a clear, upfront estimate based on the scope and complexity of your specific job. This ensures that you have complete financial visibility and control throughout the process.</p><p>For standard maintenance tasks, we offer flat-rate pricing so you know exactly what to expect. For complex repairs, the final cost will reflect the actual hours worked and any necessary materials, always aligned with our fair pricing guarantee.</p></div>} />} />
            <Route path="/help-center" element={<StaticPage title="Help Center" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>We understand that occasionally things do not go exactly as planned, and we are fully committed to resolving any issues you might encounter swiftly and fairly.</p><p>Our dedicated support team is available around the clock to assist you with booking modifications, billing inquiries, or disputes. You can browse our comprehensive FAQ section to find immediate answers to the most common questions.</p><p>If you require personalized assistance, please do not hesitate to reach out to our support agents. We pride ourselves on offering responsive, empathetic, and effective customer service to ensure your complete satisfaction.</p></div>} />} />
            <Route path="/terms" element={<StaticPage title="Terms of Service" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>Please review our terms of service carefully. These terms act as a binding legal agreement between you and our platform, governing your use of our services, website, and mobile applications.</p><p>By accessing or using our platform, you explicitly agree to abide by these rules, which are designed to maintain a safe, respectful, and reliable environment for both customers and service professionals.</p><p>We reserve the right to update or modify these terms at any time. Continued use of the platform after any such changes constitutes your consent to the updated terms. If you violate these terms, we reserve the right to suspend or terminate your account.</p></div>} />} />
            <Route path="/privacy" element={<StaticPage title="Privacy Policy" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>Your privacy is of the utmost importance to us. We are deeply committed to protecting your personal information and ensuring that your data is handled with the highest level of security and transparency.</p><p>We collect only the essential information required to connect you with service professionals and process your bookings. We do not sell your personal data to third parties, and we employ industry-standard encryption protocols to safeguard your payment details.</p><p>You maintain full control over your data. You can access, update, or request the deletion of your personal information at any time through your account settings or by contacting our dedicated privacy team.</p></div>} />} />
            <Route path="/safety" element={<StaticPage title="Safety Protocols" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>Your safety and peace of mind are our absolute top priorities. We have implemented a rigorous set of safety protocols to ensure that every interaction facilitated by our platform is secure and trustworthy.</p><p>Every technician on our platform undergoes a comprehensive background check, including criminal history and professional credential verification, before they are ever permitted to accept bookings.</p><p>Furthermore, we require all professionals to adhere to strict on-site safety guidelines and maintain proper insurance coverage. In the rare event of an incident, our dedicated safety response team is available 24/7 to provide immediate assistance.</p></div>} />} />
            <Route path="/about" element={<StaticPage title="About Us" content={<div className="space-y-5 text-[15px] text-justify leading-relaxed text-slate-700"><p>We are a premier platform dedicated to seamlessly connecting you with the highest-rated repair professionals and technicians in your local area. Our core mission is to make home and industrial maintenance as simple, transparent, and highly reliable as possible for everyone.</p><p>We understand that finding trustworthy help can be incredibly stressful. That is why we meticulously vet every single expert on our platform to ensure they meet strict quality and safety standards before they ever step foot in your home.</p><p>Whether you are dealing with a sudden late-night emergency fix, planning a major renovation, or simply scheduling routine seasonal maintenance, our dedicated experts are always ready to step in and help you get the job done right.</p></div>} />} />
            <Route path="/contact" element={<StaticPage title="Contact Us" content={<div className="space-y-5 text-[15px] text-center leading-relaxed text-slate-700"><p className="text-justify mb-4">We highly value your feedback and are always here to support you. Whether you have a question about a recent booking, need help navigating the platform, or want to inquire about partnering with us, our team is ready to assist. Please feel free to reach out to us through any of the following channels.</p><p><strong className="text-slate-900">Email:</strong> support@repairhub.com</p><p><strong className="text-slate-900">Phone:</strong> 1-800-REPAIR-HUB</p><p><strong className="text-slate-900">Address:</strong> 123 Innovation Drive, Tech City</p></div>} />} />
          </Routes>
        </RegistrationProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
