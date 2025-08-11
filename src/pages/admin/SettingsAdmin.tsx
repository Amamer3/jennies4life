import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  Upload,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Palette,
  Database,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  Info
} from 'lucide-react';


interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const SettingsAdmin: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General',
      description: 'Basic site settings and configuration',
      icon: Settings
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Customize the look and feel',
      icon: Palette
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Email and push notification settings',
      icon: Bell
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Security and authentication settings',
      icon: Shield
    },
    {
      id: 'payments',
      title: 'Payments',
      description: 'Payment gateway and billing settings',
      icon: CreditCard
    },
    {
      id: 'shipping',
      title: 'Shipping',
      description: 'Shipping methods and rates',
      icon: Truck
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Third-party service integrations',
      icon: Database
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Advanced technical settings',
      icon: Key
    }
  ];

  const handleInputChange = () => {
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    setUnsavedChanges(false);
    // Save logic here
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input
              type="text"
              defaultValue="Jennies4Life"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline</label>
            <input
              type="text"
              defaultValue="Your one-stop shop for everything"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
        <textarea
          rows={3}
          defaultValue="Discover amazing products and deals at Jennies4Life. We offer a wide range of quality items for all your needs."
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
          <input
            type="email"
            defaultValue="contact@jennies4life.com"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
        <div className="space-y-3">
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map(day => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-20">
                <span className="text-sm font-medium text-gray-700">{day}</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked={day !== 'Sunday'}
                  className="h-4 w-4 text-[#e72a00] focus:ring-[#e72a00] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">Open</span>
              </div>
              <input
                type="time"
                defaultValue="09:00"
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
              />
              <span className="text-sm text-gray-600">to</span>
              <input
                type="time"
                defaultValue="18:00"
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                defaultValue="#e72a00"
                className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#e72a00"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                defaultValue="#1f2937"
                className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#1f2937"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Logo & Branding</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Logo</label>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/64x64?text=LOGO"
                  alt="Current logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Logo
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/32x32?text=F"
                  alt="Current favicon"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="h-4 w-4 mr-2" />
                Upload Favicon
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Layout Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Dark Mode</span>
              <p className="text-sm text-gray-500">Enable dark theme for the admin panel</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Compact Layout</span>
              <p className="text-sm text-gray-500">Use a more compact layout for better space utilization</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'New Orders', description: 'Get notified when new orders are placed' },
            { label: 'Low Stock Alerts', description: 'Receive alerts when products are running low' },
            { label: 'Customer Reviews', description: 'Notifications for new customer reviews' },
            { label: 'System Updates', description: 'Important system and security updates' },
            { label: 'Marketing Reports', description: 'Weekly marketing performance reports' }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">{notification.label}</span>
                <p className="text-sm text-gray-500">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Server</label>
            <input
              type="text"
              defaultValue="smtp.gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
            <input
              type="number"
              defaultValue="587"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="email"
              defaultValue="noreply@jennies4life.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                defaultValue="••••••••"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
              <p className="text-sm text-gray-500">Add an extra layer of security to admin accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Force Password Reset</span>
              <p className="text-sm text-gray-500">Require users to reset passwords every 90 days</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
            <input
              type="number"
              defaultValue="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API Rate Limit (requests per minute)</label>
            <input
              type="number"
              defaultValue="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">CORS Protection</span>
              <p className="text-sm text-gray-500">Enable Cross-Origin Resource Sharing protection</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Gateways</h3>
        <div className="space-y-4">
          {[
            { name: 'Stripe', enabled: true, description: 'Accept credit cards and digital payments' },
            { name: 'PayPal', enabled: true, description: 'PayPal and PayPal Express Checkout' },
            { name: 'Square', enabled: false, description: 'Square payment processing' },
            { name: 'Apple Pay', enabled: true, description: 'Apple Pay for iOS devices' },
            { name: 'Google Pay', enabled: true, description: 'Google Pay for Android devices' }
          ].map((gateway, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${gateway.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <span className="text-sm font-medium text-gray-700">{gateway.name}</span>
                  <p className="text-sm text-gray-500">{gateway.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">Configure</button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={gateway.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Currency Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
            <input
              type="number"
              step="0.01"
              defaultValue="8.25"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Methods</h3>
        <div className="space-y-4">
          {[
            { name: 'Standard Shipping', rate: '$5.99', time: '5-7 business days', enabled: true },
            { name: 'Express Shipping', rate: '$12.99', time: '2-3 business days', enabled: true },
            { name: 'Overnight Shipping', rate: '$24.99', time: '1 business day', enabled: true },
            { name: 'Free Shipping', rate: 'Free', time: '7-10 business days', enabled: false }
          ].map((method, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-700">{method.name}</span>
                <p className="text-sm text-gray-500">{method.rate} • {method.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Zones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domestic Shipping</label>
            <input
              type="text"
              defaultValue="United States"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">International Shipping</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]">
              <option value="worldwide">Worldwide</option>
              <option value="limited">Limited Countries</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics & Tracking</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Pixel ID</label>
            <input
              type="text"
              placeholder="123456789012345"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Page URL</label>
            <input
              type="url"
              placeholder="https://facebook.com/jennies4life"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
            <input
              type="text"
              placeholder="@jennies4life"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Handle</label>
            <input
              type="text"
              placeholder="@jennies4life"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Channel</label>
            <input
              type="url"
              placeholder="https://youtube.com/c/jennies4life"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
          <span className="text-sm font-medium text-yellow-800">
            Warning: These settings can affect site functionality. Proceed with caution.
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Database Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Database Backup</span>
              <p className="text-sm text-gray-500">Automatically backup database daily</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Backup Retention (days)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Enable Caching</span>
              <p className="text-sm text-gray-500">Improve site performance with caching</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Image Optimization</span>
              <p className="text-sm text-gray-500">Automatically optimize uploaded images</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#e72a00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e72a00]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'payments': return renderPaymentSettings();
      case 'shipping': return renderShippingSettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'advanced': return renderAdvancedSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
        </div>
        {unsavedChanges && (
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="flex items-center text-sm text-yellow-600">
              <Info className="h-4 w-4 mr-1" />
              You have unsaved changes
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#e72a00] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className={`h-4 w-4 mr-3 ${
                    isActive ? 'text-white' : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <div>{section.title}</div>
                    {!isActive && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {section.description}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            {renderContent()}
            
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;