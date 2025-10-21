import { useState } from 'react';
import { X, Check, Star, CreditCard, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PaywallScreenProps {
  onClose: () => void;
  onPaymentComplete: () => void;
}

const packages = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: 'per month',
    popular: false,
    features: ['Unlimited lessons', 'Progress tracking', 'Offline access']
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$79.99',
    period: 'per year',
    popular: true,
    originalPrice: '$119.88',
    discount: 'Save 33%',
    features: ['Unlimited lessons', 'Progress tracking', 'Offline access', 'Premium support']
  }
];

export function PaywallScreen({ onClose, onPaymentComplete }: PaywallScreenProps) {
  const [currentStep, setCurrentStep] = useState<'benefits' | 'payment' | 'thankyou'>('benefits');
  const [selectedPackage, setSelectedPackage] = useState('yearly');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('thankyou');
    }, 2000);
  };

  const handleThankYou = () => {
    onPaymentComplete();
  };

  if (currentStep === 'benefits') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Unlock Premium</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Benefits Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unlock Your Learning Potential</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get unlimited access to all lessons, track your progress, and learn at your own pace.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {[
              { icon: '📚', title: 'Unlimited Lessons', desc: 'Access to all sign language lessons' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Monitor your learning journey' },
              { icon: '📱', title: 'Offline Access', desc: 'Learn anywhere, anytime' },
              { icon: '🎯', title: 'Personalized Learning', desc: 'Adaptive content based on your progress' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Packages */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Choose Your Plan</h3>
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`relative p-6 cursor-pointer transition-all ${
                  selectedPackage === pkg.id 
                    ? 'ring-2 ring-orange-500 bg-orange-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{pkg.name}</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-orange-500">{pkg.price}</span>
                      <span className="text-gray-600">{pkg.period}</span>
                    </div>
                    {pkg.originalPrice && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">{pkg.originalPrice}</span>
                        <span className="text-sm font-medium text-green-600">{pkg.discount}</span>
                      </div>
                    )}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPackage === pkg.id 
                      ? 'border-orange-500 bg-orange-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedPackage === pkg.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <Button 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg"
            onClick={() => setCurrentStep('payment')}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4 z-10">
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentStep('benefits')} className="text-gray-500 hover:text-gray-700">
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Payment</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {/* Selected Package */}
          <Card className="p-4 mb-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {packages.find(p => p.id === selectedPackage)?.name} Plan
                </h3>
                <p className="text-sm text-gray-600">
                  {packages.find(p => p.id === selectedPackage)?.period}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">
                  {packages.find(p => p.id === selectedPackage)?.price}
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={paymentInfo.name}
                  onChange={(e) => setPaymentInfo({...paymentInfo, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={paymentInfo.email}
                  onChange={(e) => setPaymentInfo({...paymentInfo, email: e.target.value})}
                />
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Pay Button */}
          <Button 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 text-lg"
            onClick={handlePayment}
          >
            Pay {packages.find(p => p.id === selectedPackage)?.price}
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'thankyou') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-8">
            You now have access to all premium features!
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Unlimited access to all lessons</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Progress tracking enabled</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Offline access available</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
