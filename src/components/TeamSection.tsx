
import React from 'react';
import TeamMember from './TeamMember';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "dr. Indra Wijaya",
      role: "Founder & Dokter Spesialis Anak",
      description: "20+ tahun pengalaman dalam kesehatan anak dan tumbuh kembang",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      isOnline: true
    },
    {
      name: "Siti Rahmawati, M.Gz",
      role: "Ahli Gizi & Nutrisi",
      description: "Spesialis gizi anak dengan pengalaman di WHO dan UNICEF",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      isOnline: true
    },
    {
      name: "Reza Firmansyah",
      role: "CTO",
      description: "Pengembang aplikasi kesehatan dengan pengalaman 8+ tahun",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
      isOnline: false
    },
    {
      name: "Amalia Putri",
      role: "UI/UX Designer",
      description: "Desainer dengan fokus pada pengalaman pengguna dalam aplikasi kesehatan",
      imageUrl: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1989&auto=format&fit=crop",
      isOnline: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tim Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Puspadaya didukung oleh tim ahli kesehatan, gizi, dan teknologi
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              imageUrl={member.imageUrl}
              isOnline={member.isOnline}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
