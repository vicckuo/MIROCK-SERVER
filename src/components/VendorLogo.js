export default function VendorLogo({ logoConfig }) {
    if (!logoConfig) {
        return null;
    }

    const { src, alt, clickUrl, className } = logoConfig;

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onClick={() => {
                if (clickUrl) {
                    window.location.href = clickUrl;
                }
            }}
        />
    );
}
