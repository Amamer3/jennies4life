import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Gift, Star, CheckCircle, Sparkles, Heart, TrendingUp, Users, Zap, Crown } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: Crown,
      title: 'VIP Access',
      description: 'Exclusive early access to sales and limited-edition products',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Flash Deals',
      description: 'Lightning-fast notifications for time-sensitive offers',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Curated Picks',
      description: 'Handpicked products tailored to your lifestyle and preferences',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      icon: TrendingUp,
      title: 'Trend Alerts',
      description: 'Stay ahead with the latest fashion and lifestyle trends',
      gradient: 'from-purple-400 to-indigo-500'
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    y: [-20, -100, -200], 
                    scale: [0, 1, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut"
                  }}
                  className={`absolute w-3 h-3 rounded-full ${
                    i % 3 === 0 ? 'bg-emerald-400' : i % 3 === 1 ? 'bg-teal-400' : 'bg-cyan-400'
                  }`}
                  style={{
                    left: `${20 + (i * 6)}%`,
                    top: '60%'
                  }}
                />
              ))}
            </div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4"
            >
              Welcome to the Jennies4Life Family! 🎉
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Thank you for joining our community of savvy shoppers! Your exclusive welcome package is being prepared.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-30 -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-3">
                  <Gift className="h-6 w-6 text-emerald-600 mr-2" />
                  <span className="text-emerald-800 font-bold text-lg">Exclusive Welcome Gift</span>
                </div>
                <p className="text-emerald-700 font-medium text-lg">
                  🎁 Your 20% discount code + free shipping is on its way!
                </p>
                <p className="text-emerald-600 text-sm mt-2">
                  Check your inbox in the next few minutes
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 sm:p-12 lg:p-16 relative">
              <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-50 animate-bounce"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-50 animate-pulse"></div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-center mb-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Mail className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                      <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">VIP Newsletter</span>
                    </div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
                  >
                    <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      Join the Elite
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Shopping Circle
                    </span>
                  </motion.h2>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-indigo-600" />
                      <span className="text-indigo-600 font-semibold">75,000+ Members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">(4.9/5)</span>
                    </div>
                  </motion.div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  Unlock exclusive access to <span className="font-semibold text-indigo-600">premium deals</span>, 
                  <span className="font-semibold text-purple-600"> insider reviews</span>, and 
                  <span className="font-semibold text-blue-600">lifestyle secrets</span>. 
                  Plus, enjoy a <span className="font-bold text-emerald-600">20% welcome bonus</span> on your first order!
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${benefit.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors">{benefit.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for VIP access"
                          className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isLoading || !email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-lg hover:shadow-xl"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Join VIP
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Instant access</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Unsubscribe anytime</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By joining, you agree to our{' '}
                    <a href="/privacy" className="text-indigo-600 hover:underline font-medium">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="/terms" className="text-indigo-600 hover:underline font-medium">
                      Terms of Service
                    </a>
                  </p>
                </motion.form>
              </motion.div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  className="absolute bottom-10 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full"
                />
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full"
                />
                <motion.div
                  animate={{ 
                    x: [-5, 5, -5],
                    y: [-5, 5, -5]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-20 left-1/3 w-12 h-12 bg-white bg-opacity-10 rounded-full"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center text-white relative z-10 max-w-md"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="w-28 h-28 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white border-opacity-30 shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Gift className="h-14 w-14 text-white" />
                  </motion.div>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                >
                  VIP Perks Await!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-lg opacity-90 mb-8 leading-relaxed"
                >
                  Join our exclusive community of savvy shoppers and unlock premium benefits that save you money every day.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4 text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1">20%</div>
                    <div className="text-sm opacity-80">Welcome Bonus</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1">75K+</div>
                    <div className="text-sm opacity-80">VIP Members</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1">Daily</div>
                    <div className="text-sm opacity-80">New Deals</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1">4.9★</div>
                    <div className="text-sm opacity-80">Rating</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;