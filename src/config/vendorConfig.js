import Logo from "../assets/images/logo.png";
import TOSLogo from "../assets/images/tos-logo.png";

// Vendor configurations
export const vendorConfigs = {
    mirock: {
        // 預設配置 (用於 /mirock/數字 的情況)
        default: {
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
            background: {
                image: "/mirock.png",
                color: "black", // 預設背景色
            },
        },
        // 特殊配置
        tos: {
            logo: {
                src: TOSLogo, // 你可以替換成 TOS 專用的 logo
                alt: "TOS Logo",
                clickUrl: "",
                className:
                    "w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer",
            },
            socialMedia: {
                title: "",
                links: [
                    {
                        platform: "",
                        url: "",
                    },
                    {
                        platform: "",
                        url: "",
                    },
                    {
                        platform: "",
                        url: "",
                    },
                ],
            },
            background: {
                image: "", // TOS 專用背景圖片
                color: "black",
            },
        },
        // API 配置 (所有子配置共用)
        api: {
            baseUrl: "https://pics.easy4music.com/mirock",
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
    // 可以在這裡添加其他 vendor
};

// Helper function to get vendor config based on vendor1 and vendor2
export const getVendorConfig = (vendor1, vendor2 = null) => {
    const vendorConfig = vendorConfigs[vendor1];
    if (!vendorConfig) {
        console.warn(`No configuration found for vendor: ${vendor1}`);
        return null;
    }

    // 如果是數字或者沒有 vendor2，使用預設配置
    if (!vendor2 || /^\d+$/.test(vendor2)) {
        return {
            ...vendorConfig.default,
            api: vendorConfig.api,
        };
    }

    // 如果有特殊配置，使用特殊配置，否則使用預設配置
    const specificConfig = vendorConfig[vendor2] || vendorConfig.default;
    return {
        ...specificConfig,
        api: vendorConfig.api,
    };
};

// Helper function to check if should show background
export const shouldShowBackground = (vendor1, vendor2) => {
    const config = getVendorConfig(vendor1, vendor2);
    return config && config.background && config.background.image;
};

// Helper function to check if logo has valid content
export const hasValidLogo = (config) => {
    return (
        config &&
        config.logo &&
        config.logo.src &&
        config.logo.src.trim() !== ""
    );
};

// Helper function to check if social media has valid content
export const hasValidSocialMedia = (config) => {
    return (
        config &&
        config.socialMedia &&
        config.socialMedia.links &&
        config.socialMedia.links.some(
            (link) =>
                link.platform &&
                link.platform.trim() !== "" &&
                link.url &&
                link.url.trim() !== ""
        )
    );
};

// Helper function to check if should show logo and social media
export const shouldShowBranding = (vendor1, vendor2) => {
    const config = getVendorConfig(vendor1, vendor2);
    if (!config) return false;

    return hasValidLogo(config) || hasValidSocialMedia(config);
};
