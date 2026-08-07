import { Facebook, Twitter, Instagram, Youtube, Phone, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {t('footerTitle')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('footerDesc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">{t('home')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">{t('aboutUs')}</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">{t('courses')}</Link></li>
              <li><Link to="/teachers" className="text-gray-400 hover:text-orange-400 transition-colors">{t('teachers')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('resources')}</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-orange-400 transition-colors">{t('blog')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">{t('contact')}</Link></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">FAQs</a></li> */}
             {/* <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Career</a></li> */}
            </ul>
          </div>

          <div>
  <h4 className="font-bold text-lg mb-4">{t('contactUs')}</h4>
  <ul className="space-y-3">
 <li className="flex items-center gap-2 text-gray-400">
  <Mail className="w-5 h-5 text-orange-400" />
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=raanuvaveeranhindiacademy666@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-orange-400 transition-colors"
  >
    Gmail
  </a>
</li>



    <li className="flex items-center gap-2 text-gray-400">
      <Phone className="w-5 h-5 text-orange-400" />
      <a href="tel:06397255377" className="hover:text-orange-400 transition-colors">
        06397 255 377
      </a>
    </li>
    <li className="flex items-center gap-2 text-gray-400">
      <MapPin className="w-5 h-5 text-orange-400" />
      <span>
        22, Sri Angalamman Illam, Krishnasamy Street,<br />
        near Zeon Cinema, Vandipettai,<br />
        Gobichettipalayam, Tamil Nadu 638476
      </span>
    </li>
  </ul>
</div>

        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                {t('termsConditions')}
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                {t('refundPolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
