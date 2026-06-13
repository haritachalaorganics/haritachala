import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  position: string;
  bio: string;
  image?: string;
}

export default function TeamMemberCard({ 
  name, 
  position, 
  bio, 
  image 
}: TeamMemberCardProps) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px]">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full h-[280px] md:h-[320px] flex-shrink-0 bg-gray-200">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 340px, 400px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F5F5F0]">
              <div className="text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#B3B0D1] flex items-center justify-center">
                  <span className="text-4xl text-white alegreya-regular">
                    {name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="rubik-light text-xl md:text-2xl text-[var(--foreground-pink)] mb-2 text-center sm:text-center md:text-center">
            {name}
          </h3>
          
          {position && (
            <p className="rubik-light text-sm text-[var(--foreground-purple)] uppercase mb-3 text-center sm:text-center md:text-center">
              {position}
            </p>
          )}
          
          <p className="rubik-light text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-center md:text-center">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
