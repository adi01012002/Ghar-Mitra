import React, {useMemo } from 'react';
import {
  IconHome,
  IconCalendarDollar,
  IconUsers,
  IconReceipt,
  IconShieldLock,
  IconChartBar,
  IconBellRinging,
  IconSettings
} from '@tabler/icons-react';

// Lazy load the heaviest components (if needed)
// const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default React.memo(function FeaturesSection() {
  const features = useMemo(() => [
    {
      title: "Property Management",
      description: "Easily manage all your PG properties from one dashboard",
      icon: <IconHome size={24} className="text-blue-500" />,
    },
    {
      title: "Rent Collection",
      description: "Track and collect rent payments automatically",
      icon: <IconCalendarDollar size={24} className="text-green-500" />,
    },
    {
      title: "Tenant Management",
      description: "Manage tenant details, documents, and communication",
      icon: <IconUsers size={24} className="text-purple-500" />,
    },
    {
      title: "Expense Tracking",
      description: "Record and categorize all property-related expenses",
      icon: <IconReceipt size={24} className="text-yellow-500" />,
    },
    {
      title: "Security Features",
      description: "Secure access control and tenant verification",
      icon: <IconShieldLock size={24} className="text-red-500" />,
    },
    {
      title: "Analytics Dashboard",
      description: "Get insights into your property performance",
      icon: <IconChartBar size={24} className="text-indigo-500" />,
    },
    {
      title: "Maintenance Alerts",
      description: "Get notified about upcoming maintenance tasks",
      icon: <IconBellRinging size={24} className="text-pink-500" />,
    },
    {
      title: "Customizable Settings",
      description: "Configure the system to match your business needs",
      icon: <IconSettings size={24} className="text-gray-500" />,
    },
  ], []);

  return (
    <section className="py-20 px-4 sm:px-10 lg:px-24 bg-gradient-to-br from-gray-50 to-blue-50 bg-purple-600">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-purple-700">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
}
)
const FeatureCard = React.memo(({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-200 hover:shadow-2xl hover:border-purple-400 transition-all duration-200 group">
      <div className="mb-6 flex items-center justify-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-purple-600 mb-3 text-center group-hover:text-purple-700 transition-colors">{title}</h3>
      <p className="text-gray-600 text-base text-center">{description}</p>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';