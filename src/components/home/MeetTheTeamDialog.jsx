import { useState, useEffect } from 'react';
import { X, Github, Linkedin, Twitter, Star, Sparkles } from 'lucide-react';

const MeetTheTeamDialog = ({ isOpen, onClose }) => {
  const [animationClass, setAnimationClass] = useState('');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-fadeInScale');
      setCountdown(10); // Reset countdown when dialog opens
      
      // Auto close after 10 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    }
  }, [isOpen, onClose]);

  const teamMembers = [
    {
      id: 1,
      name: "Rahul Kumar",
      role: "Team Leader",
      image: "https://i.ibb.co/LW3sZR4/img.png",
      description: "Full-Stack Developer & Project Architect",
      skills: ["React", "Node.js", "MongoDB", "Leadership"],
      github: "https://github.com/imRahul05",
      linkedin: "https://www.linkedin.com/in/imrahul05/",
      twitter: "https://x.com/imrahul165"
    },
    {
      id: 2,
      name: "Bikash Prasad Barnwal",
      role: "Developer",
      image: "https://i.ibb.co/6c51XLHk/Bikash.jpg",
      description: "Backend Specialist & UI/UX Enthusiast",
      skills: ["React", "JavaScript", "CSS", "Design"],
      github: "https://github.com/Bikash-design-lab",
      linkedin: "https://www.linkedin.com/in/bikash-prasad-barnwal-a3720a229/",
      twitter: "https://x.com/vmodi5425"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden ${animationClass}`}>
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 translate-x-20 translate-y-20 animate-pulse"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="relative px-8 py-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="h-6 w-6 text-purple-500 mr-2 animate-spin" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Meet Our Amazing Team
            </h2>
            <Sparkles className="h-6 w-6 text-purple-500 ml-2 animate-spin" />
          </div>
          <p className="text-gray-600 text-lg">The brilliant minds behind this project</p>
        </div>

        {/* Team Members */}
        <div className="px-8 pb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white border-opacity-50 ${
                  index === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Leader Badge */}
                {member.role === "Team Leader" && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Leader
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Profile Image */}
                  <div className="relative mx-auto sm:mx-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 p-1 bg-gradient-to-r from-purple-400 to-blue-400">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full bg-white"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-3 border-white animate-pulse"></div>
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-3">{member.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs rounded-full border border-purple-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-3 justify-center sm:justify-start">
                      <a
                        href={member.github}
                        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href={member.linkedin}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={member.twitter}
                        className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors duration-200 hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              This dialog will auto-close in <span className={`font-bold transition-colors duration-300 ${countdown <= 3 ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>{countdown} second{countdown !== 1 ? 's' : ''}</span>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Close Now
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.5s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default MeetTheTeamDialog;
