import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    Globe,
} from "lucide-react";

import {
    FaTiktok,
    FaWhatsapp,
    FaTelegramPlane,
    FaSnapchatGhost,
    FaPinterestP,
    FaBehance,
    FaDribbble,
} from "react-icons/fa";

const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    whatsapp: FaWhatsapp,
    telegram: FaTelegramPlane,
    tiktok: FaTiktok,
    snapchat: FaSnapchatGhost,
    pinterest: FaPinterestP,
    behance: FaBehance,
    dribbble: FaDribbble,
    email: Mail,
    phone: Phone,
    website: Globe,
};

export default function SocialIcons({ social, color }) {
    if (!Array.isArray(social)) return null;

    return (
        <div className="flex flex-wrap gap-3 mt-2 mx-auto w-fit">
            {social.map(({ name, link }, index) => {
                const Icon = iconMap[name?.toLowerCase()] || Globe;

                return (
                    <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color }}
                        className="text-gray-700 hover:text-blue-600 transition-all duration-200 w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 text-xl flex justify-center items-center"
                    >
                        <Icon />
                    </a>
                );
            })}
        </div>
    );
}
