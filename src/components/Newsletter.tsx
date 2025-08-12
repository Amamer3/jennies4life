import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Gift, Star, CheckCircle, Users } from 'lucide-react';
import { newsletterAPI } from '../services/newsletterApi';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await newsletterAPI.subscribe(email);
      
      if (response.success) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        setError(response.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

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


  // Newsletter Section
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
              {/*  */}
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
                      {/* <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" /> */}
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
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
                    >
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </motion.div>
                  )}
                  
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
            {/* Newsletter Section Background */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center text-white relative z-10 max-w-md"
              >
                
                
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
                    <div className="text-3xl font-bold mb-1 text-amber-400">20%</div>
                    <div className="text-sm opacity-80 text-amber-400">Welcome Bonus</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1 text-amber-400">75K+</div>
                    <div className="text-sm opacity-80 text-amber-400">VIP Members</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1 text-amber-400">Daily</div>
                    <div className="text-sm opacity-80 text-amber-400">New Deals</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-15 rounded-xl p-4 backdrop-blur-sm border border-white border-opacity-20 shadow-lg"
                  >
                    <div className="text-3xl font-bold mb-1 text-amber-400">4.9★</div>
                    <div className="text-sm opacity-80 text-amber-400">Rating</div>
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