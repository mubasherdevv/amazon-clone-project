import React from 'react';
import { 
  Volume2, 
  BatteryCharging, 
  Mic, 
  Cpu, 
  CheckCircle, 
  Package, 
  Bluetooth, 
  Sliders
} from 'lucide-react';
import { HeadphoneGraphic } from '../utils/productImages';

export const ProductDescription: React.FC = () => {
  const features = [
    {
      icon: <Cpu className="w-6 h-6 text-[#007185]" />,
      title: 'Integrated Processor V1 & QN1',
      description: 'Specially developed by Sony, the HD Noise Cancelling Processor QN1 unleashes the full potential of our Integrated Processor V1, controlling 8 microphones for unprecedented noise cancellation in busy offices or airplanes.'
    },
    {
      icon: <Volume2 className="w-6 h-6 text-[#007185]" />,
      title: 'Precision-Engineered 30mm Driver Unit',
      description: 'Featuring a soft TPU edge that enhances noise cancellation in low frequencies, and a carbon fiber composite dome that improves high-frequency clarity across the entire audible range.'
    },
    {
      icon: <Mic className="w-6 h-6 text-[#007185]" />,
      title: '4 Beamforming Mics & AI Voice Pickup',
      description: 'Calibrated to pick up only sounds from your mouth. With an improved signal-to-noise ratio, they catch every single word, even in noisy environments.'
    },
    {
      icon: <BatteryCharging className="w-6 h-6 text-[#007185]" />,
      title: '30-Hour Battery & 3-Min Fast Charge',
      description: 'Enjoy enough power even for long trips. With an optional USB-PD compatible AC adapter, you can get 3 hours worth of charge in just 3 minutes.'
    },
    {
      icon: <Sliders className="w-6 h-6 text-[#007185]" />,
      title: 'Intuitive Touch Sensor Controls',
      description: 'Pause, play, skip tracks, control volume, activate your voice assistant, and answer phone calls by simply tapping or swiping the right earcup surface.'
    },
    {
      icon: <Bluetooth className="w-6 h-6 text-[#007185]" />,
      title: 'Multipoint Bluetooth Connection',
      description: 'These headphones can be paired with two Bluetooth devices simultaneously. When a call comes in, the headphones know which device is ringing and connect automatically.'
    }
  ];

  const inTheBox = [
    'Sony WH-1000XM5 Wireless Headphones',
    'Collapsible Magnetic Hard Shell Carrying Case',
    '1.2m Headphone Cable (3.5mm Gold-Plated Stereo Mini Plug)',
    'USB-A to USB-C Charging Cable',
    'Quick Setup Guide & Warranty Card'
  ];

  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-[#0f1111] mb-6">
        Product Description
      </h2>

      {/* Hero Showcase Card */}
      <div className="bg-[#131921] text-white rounded-lg p-6 md:p-8 mb-8 overflow-hidden relative shadow-md">
        <div className="max-w-xl relative z-10">
          <span className="text-[#febd69] font-bold text-xs uppercase tracking-widest mb-2 block">
            Flagship Engineering
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
            Your world. Nothing else.
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            With two processors controlling eight microphones, Auto NC Optimizer for automatically optimizing noise cancellation based on your wearing condition and environment, and a specially designed driver unit, WH-1000XM5 headphones with industry-leading noise canceling rewrite the rules for distraction-free listening.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded">
              <CheckCircle className="w-4 h-4 text-[#febd69]" />
              <span>Hi-Res Audio Wireless (LDAC)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded">
              <CheckCircle className="w-4 h-4 text-[#febd69]" />
              <span>360 Reality Audio Certified</span>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-72 h-72 opacity-90">
          <HeadphoneGraphic color="black" view="driver" className="w-full h-full" />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((f, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="p-2 bg-white rounded-md w-fit border border-gray-200 mb-3 shadow-2xs">
                {f.icon}
              </div>
              <h4 className="font-bold text-sm text-[#0f1111] mb-2">{f.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* What's In The Box Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-bold text-[#0f1111] mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#007185]" />
          <span>What's in the box</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {inTheBox.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="h-40 border border-gray-200 rounded p-2 flex items-center justify-center bg-gray-50">
            <HeadphoneGraphic color="black" view="case" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};
