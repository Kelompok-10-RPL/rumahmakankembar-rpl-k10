import React from "react";
import { Head, Link, router } from '@inertiajs/react';
import AppLayout, { money, statusText } from '../../Layouts/AppLayout';

import {
    Leaf,
    ChefHat,
    Zap,
    Heart,
    UtensilsCrossed,
    DollarSign,
    Award,
    Users,
    Star,
    User,
    MapPin,
    Plus,
    Minus,
    Clock,
    Phone,
    Mail,
  } from "lucide-react";

  
  export default function App() {
    const features = [
      {
        icon: Leaf,
        title: "Fresh Ingredients",
        description: "Daily sourced premium local ingredients for authentic taste"
      },
      {
        icon: ChefHat,
        title: "Professional Chefs",
        description: "Expert chefs with decades of culinary experience"
      },
      {
        icon: Zap,
        title: "Fast Service",
        description: "Quick and efficient service without compromising quality"
      },
      {
        icon: Heart,
        title: "Comfortable Place",
        description: "Cozy ambiance perfect for family gatherings"
      },
      {
        icon: UtensilsCrossed,
        title: "Premium Catering",
        description: "Professional catering services for all occasions"
      },
      {
        icon: DollarSign,
        title: "Affordable Prices",
        description: "Quality Indonesian cuisine at reasonable prices"
      }
    ];
  
    const stats = [
      {
        number: "10+",
        label: "Years Experience",
        icon: Award
      },
      {
        number: "5000+",
        label: "Happy Customers",
        icon: Users
      },
      {
        number: "120+",
        label: "Menu Variants",
        icon: UtensilsCrossed
      },
      {
        number: "4.9",
        label: "Customer Rating",
        icon: Star
      }
    ];
  
    const team = [
      {
        name: "Chef Budi Santoso",
        role: "Head Chef",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop",
        description: "20+ years experience in Indonesian cuisine"
      },
      {
        name: "Siti Nurhaliza",
        role: "Restaurant Manager",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        description: "Ensuring excellent customer service daily"
      },
      {
        name: "Ahmad Ridwan",
        role: "Catering Coordinator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Specializing in large-scale event catering"
      }
    ];
  
    const gallery = [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop"
    ];
  
    return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 overflow-auto">
        {/* Dark Purple Navbar */}
  
        {/* Hero Section */}
        <section className="relative h-[500px] bg-gradient-to-r from-[#050B1A] to-[#10213D] overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/images/rumahSaya.png"
              alt="Restaurant Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-6xl mb-6">About Warung Makan Kembar</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Authentic Indonesian Cuisine • Family Tradition Since 1985 • Premium Dining Experience
            </p>
            <Link href="/menu" className="bg-gradient-to-r from-purple-500 to-blue-500 px-10 py-4 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Explore Our Menu
            </Link>
          </div>
        </section>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16">
  
          {/* Restaurant Story Section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1707105064020-308d7441ac94?w=800&h=600&fit=crop"
                  alt="Restaurant Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-5xl text-gray-800 mb-6">Our Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Founded in 1985 by twin siblings who shared a passion for Indonesian culinary heritage,
                  Warung Makan Kembar has been serving authentic traditional dishes for over 40 years.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Our commitment to quality, authenticity, and the warmth of Indonesian hospitality has
                  made us a beloved destination for those seeking genuine Indonesian flavors.
                </p>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="text-2xl text-gray-800 mb-3">Our Vision & Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To preserve authentic Indonesian cuisine while providing exceptional dining experiences
                    that make every guest feel like family.
                  </p>
                </div>
              </div>
            </div>
          </section>
  
          {/* Why Choose Us Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">What makes us special</p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
  
          {/* Statistics Section */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center text-white">
                      <Icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                      <div className="text-5xl mb-2">{stat.number}</div>
                      <div className="text-lg opacity-90">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
  
          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">The people behind our success</p>
            <div className="grid md:grid-cols-3 gap-10">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-purple-600 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Gallery Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Gallery</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Explore our culinary creations</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-64"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
  
          {/* Location Section */}
          <section className="mb-20">
            <h2 className="text-5xl text-center text-gray-800 mb-4">Our Location</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Visit us today</p>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative bg-gray-200 h-96">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                      <MapPin className="w-16 h-16 text-purple-600 fill-purple-600" />
                    </div>
                    <div className="absolute right-4 top-4 bg-white rounded-lg shadow-md">
                      <button className="block p-2 hover:bg-gray-50 border-b">
                        <Plus className="w-5 h-5" />
                      </button>
                      <button className="block p-2 hover:bg-gray-50">
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-3xl text-gray-800 mb-6">Visit Us</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-800">Jl. Sudirman No. 123</p>
                        <p className="text-gray-600">Jakarta Pusat, DKI Jakarta 10110</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-800">Open Daily: 10:00 AM - 10:00 PM</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-purple-600" />
                      <p className="text-gray-800">+62 21 1234 5678</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Warung+Makan+Kembar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
  

      </div>
      </AppLayout>
    );
  }