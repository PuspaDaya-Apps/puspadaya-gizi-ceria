
import TeamMember from './TeamMember';

const TeamSection = () => {
  const teamMembers = [
   {
  name: "The University of Sydney",
  role: "Global Research Advisor",
  // description: "Lembaga akademik terkemuka yang memberikan arahan strategis dalam pengembangan teknologi kesehatan dan riset berbasis data global.",
  imageUrl: "https://ih1.redbubble.net/image.3512201100.7135/st,small,507x507-pad,600x600,f8f8f8.jpg"
},
{
  name: "Universitas Airlangga",
  role: "Nutrition Research ",
  // description: "Berperan sebagai mitra riset bidang gizi dan kesehatan masyarakat dalam pengembangan aplikasi berbasis data lokal.",
  imageUrl: "https://unair.ac.id/wp-content/uploads/2023/11/Logo-Branding-UNAIR-biru.png",
  isOnline: true
},
{
  name: "Universitas Patimura",
  role: "Nutrition Research",
  // description: "Berperan sebagai mitra riset bidang gizi dan kesehatan masyarakat dalam pengembangan aplikasi berbasis data lokal.",
  imageUrl: "https://assetd.kompas.id/BWIhEtxAPZhaqWPbtg-bkX2Tldc=/1024x1024/https%3A%2F%2Fkompaspedia.kompas.id%2Fwp-content%2Fuploads%2F2020%2F08%2Flogo_Universitas-Patimura.png",
  isOnline: false
},
{
  name: "Politeknik Negeri Banyuwangi",
  role: "Health App Developer",
  // description: "Tim pengembang teknologi dari Poliwangi yang berfokus pada solusi digital untuk pemantauan kesehatan dan gizi masyarakat.",
  imageUrl: "https://upload.wikimedia.org/wikipedia/id/e/e3/Logo_Politeknik_Negeri_Banyuwangi.png",
  isOnline: true
}

  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tim Kami</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Didukung oleh lembaga dan tenaga ahli di bidang kesehatan, gizi, serta teknologi untuk mewujudkan pelayanan yang berkualitas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
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
