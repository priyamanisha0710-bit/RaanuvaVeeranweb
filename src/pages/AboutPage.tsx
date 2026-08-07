import { Target, Users, Award, Heart, TrendingUp, Globe, BookOpen, Video, MessageCircle, Shield, Clock, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function useInView(options = {}): [React.RefObject<any>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
}

export default function AboutPage() {
  const { t } = useLanguage();
  const [storyRef, storyInView] = useInView();
  const [missionRef, missionInView] = useInView();
  const [whyChooseRef, whyChooseInView] = useInView();
  const [impactRef, impactInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [journeyRef, journeyInView] = useInView();

  return (
    <div className="pt-16">
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .animate-fade-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
      `}</style>

      <div className="relative overflow-hidden bg-pink-400/20 backdrop-blur-xl border border-white/30 hover:shadow-pink-400/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-500 mb-6 animate-fade-in">
              {t('aboutHeroTitle')}
            </h1>
            <p className="text-xl text-purple-500 max-w-3xl mx-auto animate-fade-in-delay">
              {t('aboutHeroDesc')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Our Story Section */}
        <div ref={storyRef} className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
          <div className={storyInView ? 'animate-fade-left' : 'opacity-0'}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">{t('ourStoryTitle')}</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed text-justify break-words hyphens-auto">
              {t('ourStoryP1')}
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed text-justify break-words hyphens-auto">
              {t('ourStoryP2')}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-justify break-words hyphens-auto">
              {t('ourStoryP3')}
            </p>
          </div>
          <div className={`relative ${storyInView ? 'animate-fade-right' : 'opacity-0'}`}>
            <img
              src="/ranuva_veeran.jpg"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="text-3xl sm:text-4xl font-bold text-orange-500">50k+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{t('happyStudents')}</div>
            </div>
          </div>
        </div>

        {/* Mission, Values, Vision Section */}
        <div ref={missionRef} className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center ${missionInView ? 'animate-fade-up' : 'opacity-0'}`}>
            <Target className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{t('ourMissionTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('ourMissionDesc')}
            </p>
          </div>
          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center ${missionInView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: missionInView ? '0.1s' : '0s' }}>
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{t('ourValuesTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('ourValuesDesc')}
            </p>
          </div>
          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg text-center ${missionInView ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: missionInView ? '0.2s' : '0s' }}>
            <Globe className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{t('ourVisionTitle')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('ourVisionDesc')}
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div ref={whyChooseRef} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 sm:p-12 mb-12 sm:mb-20">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center ${whyChooseInView ? 'animate-fade-down' : 'opacity-0'}`}>{t('whyChooseUsTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`flex gap-4 ${whyChooseInView ? 'animate-fade-left' : 'opacity-0'}`}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t('expertTeachersTitle')}</h4>
                <p className="text-gray-600">{t('expertTeachersDesc')}</p>
              </div>
            </div>
            <div className={`flex gap-4 ${whyChooseInView ? 'animate-fade-right' : 'opacity-0'}`}
              style={{ animationDelay: whyChooseInView ? '0.1s' : '0s' }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t('coursesTitle')}</h4>
                <p className="text-gray-600">{t('coursesDesc')}</p>
              </div>
            </div>
            <div className={`flex gap-4 ${whyChooseInView ? 'animate-fade-left' : 'opacity-0'}`}
              style={{ animationDelay: whyChooseInView ? '0.2s' : '0s' }}>
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t('provenResultsTitle')}</h4>
                <p className="text-gray-600">{t('provenResultsDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers Section */}
        <div ref={impactRef} className="text-center mb-12 sm:mb-20">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-6 ${impactInView ? 'animate-fade-down' : 'opacity-0'}`}>{t('impactTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg ${impactInView ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{t('studentsEnrolled')}</div>
            </div>
            <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg ${impactInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: impactInView ? '0.1s' : '0s' }}>
              <div className="text-3xl sm:text-4xl font-bold text-blue-500 mb-2">40+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{t('countriesReached')}</div>
            </div>
            <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg ${impactInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: impactInView ? '0.2s' : '0s' }}>
              <div className="text-3xl sm:text-4xl font-bold text-green-500 mb-2">95%</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{t('successRate')}</div>
            </div>
            <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg ${impactInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: impactInView ? '0.3s' : '0s' }}>
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">4.9/5</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{t('averageRatingLabel')}</div>
            </div>
          </div>
        </div>

        {/* Learning Features Section */}
        <div ref={featuresRef} className="mb-12 sm:mb-20">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center ${featuresInView ? 'animate-fade-down' : 'opacity-0'}`}>
            {t('learningFeaturesTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 ${featuresInView ? 'animate-fade-left' : 'opacity-0'}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{t('featureVideoTitle')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t('featureVideoDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 ${featuresInView ? 'animate-fade-right' : 'opacity-0'}`}
              style={{ animationDelay: featuresInView ? '0.1s' : '0s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{t('featureLiveTitle')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t('featureLiveDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 ${featuresInView ? 'animate-fade-left' : 'opacity-0'}`}
              style={{ animationDelay: featuresInView ? '0.2s' : '0s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{t('featureMaterialsTitle')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t('featureMaterialsDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className={`bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 sm:p-8 ${featuresInView ? 'animate-fade-right' : 'opacity-0'}`}
              style={{ animationDelay: featuresInView ? '0.3s' : '0s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{t('featurePathTitle')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t('featurePathDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Journey Section */}
        <div
          ref={journeyRef}
          className="relative rounded-3xl p-8 sm:p-12 text-white mb-12 sm:mb-20 overflow-hidden"
        >
          {/* Background: Image + Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `
        linear-gradient(to right, rgba(128,0,255,0.75), rgba(255,0,128,0.75)),
        url('https://images.pexels.com/photos/32417518/pexels-photo-32417518.jpeg')
      `,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center ${journeyInView ? "animate-fade-down" : "opacity-0"
                }`}
            >
              {t('journeyTitle')}
            </h2>

            <div className="grid md:grid-cols-4 gap-6 sm:gap-8">

              {/* Step 1 */}
              <div className={`text-center ${journeyInView ? "animate-fade-up" : "opacity-0"}`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl font-bold">1</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('step1Title')}</h3>
                <p className="text-sm sm:text-base text-white/90">
                  {t('step1Desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div
                className={`text-center ${journeyInView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: journeyInView ? "0.1s" : "0s" }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl font-bold">2</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('step2Title')}</h3>
                <p className="text-sm sm:text-base text-white/90">
                  {t('step2Desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div
                className={`text-center ${journeyInView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: journeyInView ? "0.2s" : "0s" }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl font-bold">3</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('step3Title')}</h3>
                <p className="text-sm sm:text-base text-white/90">
                  {t('step3Desc')}
                </p>
              </div>

              {/* Step 4 */}
              <div
                className={`text-center ${journeyInView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: journeyInView ? "0.3s" : "0s" }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl sm:text-3xl font-bold">4</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{t('step4Title')}</h3>
                <p className="text-sm sm:text-base text-white/90">
                  {t('step4Desc')}
                </p>
              </div>

            </div>
          </div>
        </div>


        {/* Team & Support Section */}
        <div ref={teamRef} className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg ${teamInView ? 'animate-fade-left' : 'opacity-0'}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{t('studentSupportTitle')}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  {t('studentSupportDesc')}
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {t('supportFeature1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {t('supportFeature2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                    {t('supportFeature3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg ${teamInView ? 'animate-fade-right' : 'opacity-0'}`}
            style={{ animationDelay: teamInView ? '0.1s' : '0s' }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{t('flexibleLearningTitle')}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  {t('flexibleLearningDesc')}
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                    {t('flexibleFeature1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                    {t('flexibleFeature2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                    {t('flexibleFeature3')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('callToActionTitle')}</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t('callToActionDesc') }} />
          <Link to="/contact">
            <button className="bg-white text-orange-500 px-8 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              {t('getStartedBtn')}
            </button></Link>

        </div>
      </div>
    </div>
  );
}
