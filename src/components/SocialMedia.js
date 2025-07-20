import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

// Icon mapping for social media platforms
const iconMap = {
    facebook: BsFacebook,
    instagram: AiOutlineInstagram,
    youtube: AiFillYoutube,
};

export default function SocialMedia({ socialLinks = [], title = "Follow Us" }) {
    if (!socialLinks || socialLinks.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="flex items-center justify-center text-center">
                {title}
            </h2>
            <div className="flex items-center justify-center">
                {socialLinks.map((link, index) => {
                    const IconComponent = iconMap[link.platform];

                    if (!IconComponent) {
                        console.warn(
                            `Icon not found for platform: ${link.platform}`
                        );
                        return null;
                    }

                    return (
                        <a
                            key={index}
                            target="_blank"
                            href={link.url}
                            className="m-2"
                            rel="noreferrer"
                            aria-label={link.platform}
                        >
                            <IconComponent />
                        </a>
                    );
                })}
            </div>
        </>
    );
}
