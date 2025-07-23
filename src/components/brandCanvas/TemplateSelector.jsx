import React from 'react';
import { Check } from 'lucide-react';
import template1 from '../../assests/template1.jpg'
import template2 from '../../assests/template2.jpeg'
import template3 from '../../assests/template3.jpg'
import template4 from '../../assests/template4.jpg'
import template5 from '../../assests/template5.jpeg'
import template6 from '../../assests/template6.jpeg'

const TemplateSelector = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  // Mock restaurant marketing templates
  const templates = [
    {
      id: 'social-story',
      name: 'Instagram Story',
    //   image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: template1,
      category: 'Social Media'
    },
    {
      id: 'facebook-post',
      name: 'Facebook Post',
    //   image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: template2,
      category: 'Social Media'
    },
    {
      id: 'menu-board',
      name: 'Digital Menu Board',
    //   image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: template3,
      category: 'Restaurant Display'
    },
    {
      id: 'promotional-flyer',
      name: 'Promotional Flyer',
    //   image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: template4,
      category: 'Print Marketing'
    },
    {
      id: 'banner-ad',
      name: 'Web Banner',
    //   image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: template5,
      category: 'Digital Marketing'
    },
    {
      id: 'special-offer',
      name: 'Special Offer',
    //   image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    image: template6,
      category: 'Promotions'
    }
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Marketing Template</h3>
        <p className="text-gray-600">Select a template that matches your restaurant's marketing needs</p>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h4 className="text-sm font-medium text-purple-700 mb-3 uppercase tracking-wide">{category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates
              .filter(template => template.category === category)
              .map(template => (
                <div
                  key={template.id}
                  onClick={() => onTemplateSelect(template.image)}
                  className={`
                    relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:scale-105
                    ${selectedTemplate === template.image 
                      ? 'border-purple-500 ring-4 ring-purple-200' 
                      : 'border-gray-200 hover:border-purple-300'
                    }
                  `}
                >
                  <div className="aspect-square">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Template name */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {template.name}
                    </p>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedTemplate === template.image && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
