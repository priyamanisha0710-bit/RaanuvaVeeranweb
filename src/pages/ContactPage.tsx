import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Facebook, Twitter, Instagram, Linkedin, Youtube, Users, Headphones, Award, CheckCircle, MessageSquare, Zap, Shield, Star, Loader2, AlertCircle, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ------------------- CONSTANTS & DATA -------------------
const getContactMethods = (t: any) => [
  {
    icon: Mail,
    title: t('emailUsTitle'),
    description: t('emailUsDesc'),
    value: 'info@raanuvaveeran.com',
    link: 'mailto:raanuvaveeranhindiacademy666@gmail.com',
    color: 'bg-orange-100',
    iconColor: 'text-orange-500'
  },
  {
    icon: Phone,
    title: t('callUsTitle'),
    description: t('callUsDesc'),
    value: '+91 6397255377',
    link: 'tel:+916397255377',
    color: 'bg-blue-100',
    iconColor: 'text-blue-500'
  },
  {
    icon: MapPin,
    title: t('visitUsTitle'),
    description: t('visitUsDesc'),
    value: t('visitUsValue'),
    link: '#map',
    color: 'bg-green-100',
    iconColor: 'text-green-500'
  }
];

const getSupportStats = (t: any) => [
  { icon: Users, label: t('happyStudentsLabel'), value: '50,000+', color: 'bg-blue-500' },
  { icon: Headphones, label: t('supportTicketsLabel'), value: '10K+', color: 'bg-purple-500' },
  { icon: Award, label: t('satisfactionRateLabel'), value: '98%', color: 'bg-orange-500' },
  { icon: Clock, label: t('avgResponseTimeLabel'), value: '< 2hrs', color: 'bg-green-500' }
];

const getFaqs = (t: any) => [
  {
    question: t('faqQ1'),
    answer: t('faqA1')
  },
  {
    question: t('faqQ2'),
    answer: t('faqA2')
  },
  {
    question: t('faqQ3'),
    answer: t('faqA3')
  },
  {
    question: t('faqQ4'),
    answer: t('faqA4')
  },
  {
    question: t('faqQ5'),
    answer: t('faqA5')
  },
  {
    question: t('faqQ6'),
    answer: t('faqA6')
  }
];

const getOfficeLocations = (t: any) => [
  {
    city: t('locCity1'),
    address: t('locAddress1'),
    phone: '+91 63972 55377',
    email: 'raanuvaveeranhindiacademy666@gmail.com',
    hours: t('locHours')
  },
  {
    city: t('locCity2'),
    address: t('locAddress2'),
    phone: '+91 98765 43211',
    email: 'raanuvaveeranhindiacademy666@gmail.com',
    hours: t('locHours')
  },
  {
    city: t('locCity3'),
    address: t('locAddress3'),
    phone: '+91 98765 43212',
    email: 'raanuvaveeranhindiacademy666@gmail.com',
    hours: t('locHours')
  }
];

const socialLinks = [
  { icon: Facebook, name: 'Facebook', link: '#', color: 'bg-blue-600' },
  { icon: Twitter, name: 'Twitter', link: '#', color: 'bg-sky-500' },
  { icon: Instagram, name: 'Instagram', link: '#', color: 'bg-pink-600' },
  { icon: Linkedin, name: 'LinkedIn', link: '#', color: 'bg-blue-700' },
  { icon: Youtube, name: 'YouTube', link: '#', color: 'bg-red-600' }
];

const getWhyContactUs = (t: any) => [
  {
    icon: Zap,
    title: t('supportQuickRespTitle'),
    description: t('supportQuickRespDesc')
  },
  {
    icon: Shield,
    title: t('supportSecureTitle'),
    description: t('supportSecureDesc')
  },
  {
    icon: Star,
    title: t('supportExpertTitle'),
    description: t('supportExpertDesc')
  },
  {
    icon: CheckCircle,
    title: t('supportProblemSolvedTitle'),
    description: t('supportProblemSolvedDesc')
  }
];

// ------------------- ANIMATION COMPONENT -------------------
function AnimatedSection({ children, direction = 'left', className = '' }: { children: React.ReactNode; direction?: 'left' | 'right' | 'up' | 'fade'; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animations: Record<string, string> = {
    left: 'translate-x-[-100px] opacity-0',
    right: 'translate-x-[100px] opacity-0',
    up: 'translate-y-[50px] opacity-0',
    fade: 'opacity-0'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'translate-x-0 translate-y-0 opacity-100' : animations[direction]
        } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const supportStats = getSupportStats(t);
  const contactMethods = getContactMethods(t);
  const whyContactUs = getWhyContactUs(t);
  const faqs = getFaqs(t);
  const officeLocations = getOfficeLocations(t);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 1. ADDED: State for form handling
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  // 2. ADDED: Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. ADDED: Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    // 🔴 REPLACE WITH YOUR DEPLOYED GOOGLE SCRIPT URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlQ6c1XZgOkvqPryBvnc9IVxhr8_1z5sqQQLAQTR8t7w_8xRrEtsfsAvbnEe6Vx1we/exec";

    try {
      // We use 'no-cors' mode often for Google Scripts to avoid CORS errors, 
      // but standard fetch works best if the script returns proper JSON headers.
      // If you get CORS errors, ensure your Script is deployed as "Anyone".
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData)
        // Note: We don't set Content-Type header to avoid preflight OPTIONS request issues with GAS
      });

      setSubmitStatus({
        type: 'success',
        message: 'formSuccessMsg'
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });

    } catch (error) {
      console.error("Error submitting form", error);
      setSubmitStatus({
        type: 'error',
        message: 'formErrorMsg'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-orange-400/20 backdrop-blur-xl py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection direction="fade" className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-600 mb-6">
              {t('getInTouchTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-purple-500 max-w-3xl mx-auto">
              {t('getInTouchDesc')}
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Support Stats */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {supportStats.map((stat, index) => (
              <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="text-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-all">
                  <div className={`${stat.color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('howCanWeHelpTitle')}</h2>
            <p className="text-base sm:text-lg text-gray-600">{t('howCanWeHelpDesc')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">{method.description}</p>
                  <a href={method.link} className={`${method.iconColor} font-semibold hover:underline text-sm sm:text-base`}>
                    {method.value}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Why Contact Us */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('whySupportTitle')}</h2>
            <p className="text-base sm:text-lg text-gray-600">{t('whySupportDesc')}</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyContactUs.map((item, index) => (
              <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-br from-orange-500 to-pink-500 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* 4. UPDATED: Form Section */}
            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">{t('sendMessageTitle')}</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  {t('sendMessageDesc')}
                </p>

                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {submitStatus.type === 'success' ? <Check className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                    <p>{t(submitStatus.message)}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('formFirstName')}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('formLastName')}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('formEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('formPhone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('formSubject')}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="General Inquiry">{t('subjectGeneral')}</option>
                      <option value="Course Information">{t('subjectCourseInfo')}</option>
                      <option value="Technical Support">{t('subjectTechSupport')}</option>
                      <option value="Partnership Opportunities">{t('subjectPartnership')}</option>
                      <option value="Other">{t('subjectOther')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('formMessage')}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder={t('placeholderMessage')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm sm:text-base"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('formSubmitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('formSubmitBtn')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Side Info */}
            <div className="space-y-6 sm:space-y-8">
              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('officeHoursTitle')}</h3>
                      <div className="space-y-2 text-sm sm:text-base text-gray-600">
                        <p>{t('officeHoursMonFri')}</p>
                        <p>{t('officeHoursSat')}</p>
                        <p>{t('officeHoursSun')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('liveChatTitle')}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {t('liveChatDesc')}
                      </p>
                      <button
                        onClick={() => {
                          document
                            .getElementById('hindi-chat')
                            ?.scrollIntoView({ behavior: 'smooth' });

                          window.dispatchEvent(new Event('open-hindi-chat'));
                        }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        {t('startChatBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('faqSideTitle')}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {t('faqSideDesc')}
                      </p>
                      <button
                        onClick={() => {
                          document
                            .getElementById('faq-section')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
                      >
                        {t('viewFaqsBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 sm:p-8 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('immediateHelpTitle')}</h3>
                  <p className="mb-6 text-sm sm:text-base">
                    {t('immediateHelpDesc')}
                  </p>
                  <a
                    href="tel:+916397255377"
                    className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors text-sm sm:text-base"
                  >
                    {t('callNowBtn')}: +91 6397 255 377
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq-section" className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('faqSectionTitle')}</h2>
            <p className="text-base sm:text-lg text-gray-600">{t('faqSectionDesc')}</p>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900 pr-4 text-sm sm:text-base">{faq.question}</span>
                    <MessageSquare className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('officeLocationsTitle')}</h2>
            <p className="text-base sm:text-lg text-gray-600">{t('officeLocationsDesc')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {officeLocations.map((location, index) => (
              <AnimatedSection key={index} direction={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-500 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{location.city}</h3>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base text-gray-600">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                      {location.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      {location.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      {location.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                      {location.hours}
                    </p>
                  </div>
                  <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
                    {t('getDirectionsBtn')}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('connectWithUsTitle')}</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8">{t('connectWithUsDesc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className={`${social.color} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <div id="map" className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="h-64 sm:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15641.745997116495!2d77.45705008494906!3d11.448387052413247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1764853670846!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
