import { Video, MessageCircle, Trophy, Clock, BookMarked, Headphones } from 'lucide-react';
import { motion } from "framer-motion";

import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    { icon: Video, title: t('feature1Title'), description: t('feature1Desc'), color: 'bg-purple-500', direction: 'left' },
    { icon: MessageCircle, title: t('feature2Title'), description: t('feature2Desc'), color: 'bg-purple-500', direction: 'right' },
    { icon: Trophy, title: t('feature3Title'), description: t('feature3Desc'), color: 'bg-purple-500', direction: 'left' },
    { icon: Clock, title: t('feature4Title'), description: t('feature4Desc'), color: 'bg-purple-500', direction: 'right' },
    { icon: BookMarked, title: t('feature5Title'), description: t('feature5Desc'), color: 'bg-purple-500', direction: 'left' },
    { icon: Headphones, title: t('feature6Title'), description: t('feature6Desc'), color: 'bg-purple-500', direction: 'right' }
  ];

// Motion variants for faster, snappy entrance
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 120, damping: 12 }
  }
};

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* TITLE */}
      <div className="text-center mb-14 md:mb-16" id="features">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          {t('featuresTitle')}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
          {t('featuresDesc')}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="
              group relative rounded-2xl p-6 md:p-8 shadow-xl 
              bg-pink-400/20 backdrop-blur-lg border border-white/30
              transition-transform transform hover:-translate-y-2 hover:scale-105 hover:shadow-pink-400/50
            "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
            whileHover={{ rotateX: 6, rotateY: -6, transition: { type: "spring", stiffness: 150 } }}
          >
            {/* ICON */}
            <div className={`${feature.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 md:mb-6 shadow-lg shadow-pink-500/40`}>
              <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>

            {/* TITLE */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 break-words">
              {feature.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
