import Logo from "../assets/images/logo.png";

// Vendor configurations
export const vendorConfigs = {
    mirock: {
        logo: {
            src: Logo,
            alt: "Mirock Logo",
            clickUrl: "https://www.easy4music.com/mirock",
            className:
                "w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer",
        },
        socialMedia: {
            title: "Follow Us",
            links: [
                {
                    platform: "facebook",
                    url: "https://www.facebook.com/viamusicstudio/",
                },
                {
                    platform: "instagram",
                    url: "https://www.instagram.com/mirock.nyc/",
                },
                {
                    platform: "youtube",
                    url: "https://www.youtube.com/channel/UCw1mhfFiSJEMysE2BROjD-g",
                },
            ],
        },
        api: {
            baseUrl: "https://pics.easy4music.com/mirock",
            // URL pattern functions
            getImageUrl: (vendor2, imageId) => {
                return /^\d+$/.test(vendor2)
                    ? `https://pics.easy4music.com/mirock/${imageId}.jpg`
                    : `https://pics.easy4music.com/mirock/${vendor2}/${imageId}.jpg`;
            },
            getMediaUrl: (vendor2, imageId) => {
                return /^\d+$/.test(vendor2)
                    ? `https://pics.easy4music.com/mirock/${imageId}.mp4`
                    : `https://pics.easy4music.com/mirock/${vendor2}/${imageId}.mp4`;
            },
        },
    },
    tos: {
        logo: {
            src: Logo, // 你需要替換成 TOS 的 logo
            alt: "TOS Logo",
            clickUrl: "https://www.tos-example.com", // 替換成 TOS 的網址
            className:
                "w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer",
        },
        socialMedia: {
            title: "Follow Us",
            links: [
                {
                    platform: "facebook",
                    url: "https://www.facebook.com/tos-page/", // 替換成 TOS 的 Facebook
                },
                {
                    platform: "instagram",
                    url: "https://www.instagram.com/tos.official/", // 替換成 TOS 的 Instagram
                },
                {
                    platform: "youtube",
                    url: "https://www.youtube.com/channel/TOS-CHANNEL", // 替換成 TOS 的 YouTube
                },
            ],
        },
        api: {
            baseUrl: "https://pics.tos-example.com/mirock/tos", // 替換成 TOS 的 API baseUrl
            // URL pattern functions for TOS
            getImageUrl: (vendor2, imageId) => {
                return /^\d+$/.test(vendor2)
                    ? `https://pics.tos-example.com/mirock/tos/${imageId}.jpg` // 替換成 TOS 的圖片 URL 格式
                    : `https://pics.tos-example.com/mirock/tos/${vendor2}/${imageId}.jpg`;
            },
            getMediaUrl: (vendor2, imageId) => {
                return /^\d+$/.test(vendor2)
                    ? `https://pics.tos-example.com/mirock/tos/${imageId}.mp4` // 替換成 TOS 的媒體 URL 格式
                    : `https://pics.tos-example.com/mirock/tos/${vendor2}/${imageId}.mp4`;
            },
        },
    },
};

// Helper function to get vendor config
export const getVendorConfig = (vendorName) => {
    const config = vendorConfigs[vendorName];
    if (!config) {
        console.warn(`No configuration found for vendor: ${vendorName}`);
        return null;
    }
    return config;
};
