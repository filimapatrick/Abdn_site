import React from 'react';
import { Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    content: "Being part of ABDN has transformed my research capabilities. The network's support and resources have been invaluable in advancing neuroscience research in Africa.",
    author: "Dr. Sarah Mwangi",
    role: "Neuroscientist at University of Nairobi",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    content: "The collaborative environment and mentorship opportunities at ABDN have helped me develop cutting-edge research methodologies and expand my professional network.",
    author: "Dr. Mohammed Ahmed",
    role: "Research Fellow at ICIPE",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Researcher Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our network of African researchers making significant contributions to neuroscience
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal 
              key={index} 
              direction={index % 2 === 0 ? 'left' : 'right'} 
              delay={index * 0.2}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
                <p className="text-gray-700 text-lg mb-6 relative z-10">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}