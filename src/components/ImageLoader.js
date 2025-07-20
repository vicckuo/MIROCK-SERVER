import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import SocialMedia from "./SocialMedia";

import Countdown from "react-countdown";
import {
    getVendorConfig,
    hasValidLogo,
    hasValidSocialMedia,
    shouldShowBackground,
    shouldShowBranding,
} from "../config/vendorConfig";
import VendorLogo from "./VendorLogo";

function ImageLoader() {
    const { imageId } = useParams();
    const location = useLocation();

    const [imageUrl, setImageUrl] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expired, setExpired] = useState(false); // 新增状态用于跟踪图片是否过期

    const [expirationDate, setExpirationDate] = useState(null); // 添加状态变量

    const pathSegments = location.pathname.split("/");
    const vendor1 = pathSegments[1];
    const vendor2 = pathSegments[2];

    useEffect(() => {
        const vendorConfig = getVendorConfig(vendor1, vendor2);
        if (!vendorConfig || !vendorConfig.api) {
            setError(true);
            setLoading(false);
            return;
        }

        const imageUrl = vendorConfig.api.getImageUrl(vendor2, imageId);

        const loadImageAndCheckExpiration = async (retryCount = 0) => {
            const maxRetries = 3;

            try {
                // 添加重試延遲
                if (retryCount > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, 1000 * retryCount)
                    );
                }

                // 檢查圖片是否存在，添加錯誤處理選項
                const response = await fetch(imageUrl, {
                    method: "HEAD",
                    cache: "no-cache", // 避免緩存問題
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                });

                if (response.status === 200) {
                    // 圖片存在，設置 URL
                    setImageUrl(imageUrl);

                    // 檢查過期時間
                    const lastModified = response.headers.get("last-modified");
                    if (lastModified) {
                        const lastModifiedDate = new Date(lastModified);
                        const newExpirationDate = new Date(
                            lastModifiedDate.getTime() + 7 * 24 * 60 * 60 * 1000
                        );

                        setExpirationDate(newExpirationDate);

                        if (new Date() > newExpirationDate) {
                            setExpired(true);
                        } else {
                            setExpired(false);
                        }
                    }

                    // 預載圖片，添加重試邏輯
                    const loadImageWithRetry = (attempts = 0) => {
                        const image = new Image();
                        image.onload = () => {
                            setLoading(false);
                            setError(false);
                        };
                        image.onerror = () => {
                            if (attempts < 2) {
                                console.log(
                                    `圖片載入失敗，重試第 ${attempts + 1} 次...`
                                );
                                setTimeout(
                                    () => loadImageWithRetry(attempts + 1),
                                    1000
                                );
                            } else {
                                setLoading(false);
                                setError(true);
                            }
                        };
                        image.src = imageUrl;
                    };

                    loadImageWithRetry();
                } else if (response.status === 404) {
                    console.error("Image URL not found (404)");
                    setImageUrl(null);
                    setLoading(false);
                    setError(true);
                }
            } catch (error) {
                console.error(
                    `Error loading image (attempt ${retryCount + 1}):`,
                    error
                );

                // 網絡錯誤重試邏輯
                if (
                    retryCount < maxRetries &&
                    (error.name === "TypeError" ||
                        error.message.includes("QUIC") ||
                        error.message.includes("network"))
                ) {
                    console.log(
                        `網絡錯誤，${2000 * (retryCount + 1)}ms 後重試...`
                    );
                    setTimeout(
                        () => loadImageAndCheckExpiration(retryCount + 1),
                        2000 * (retryCount + 1)
                    );
                } else {
                    setLoading(false);
                    setError(true);
                }
            }
        };

        loadImageAndCheckExpiration();
    }, [imageId, vendor1, vendor2]);

    useEffect(() => {
        const vendorConfig = getVendorConfig(vendor1, vendor2);
        if (!vendorConfig || !vendorConfig.api) {
            setMediaUrl(null);
            return;
        }

        const mediaUrl = vendorConfig.api.getMediaUrl(vendor2, imageId);

        const checkMediaUrl = async (retryCount = 0) => {
            const maxRetries = 2;

            try {
                if (retryCount > 0) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, 1000 * retryCount)
                    );
                }

                const response = await fetch(mediaUrl, {
                    method: "HEAD",
                    cache: "no-cache",
                    headers: {
                        "Cache-Control": "no-cache",
                    },
                });

                if (response.status === 200) {
                    setMediaUrl(mediaUrl);
                } else if (response.status === 404) {
                    console.error("Media URL not found (404)");
                    setMediaUrl(null);
                }
            } catch (error) {
                console.error(
                    `Error checking media URL (attempt ${retryCount + 1}):`,
                    error
                );

                if (retryCount < maxRetries) {
                    console.log(`媒體文件檢查失敗，重試中...`);
                    setTimeout(
                        () => checkMediaUrl(retryCount + 1),
                        1500 * (retryCount + 1)
                    );
                } else {
                    setMediaUrl(null);
                }
            }
        };

        checkMediaUrl();
    }, [imageId, vendor1, vendor2]);

    const downloadImage = async () => {
        try {
            const response = await fetch(imageUrl);

            const blob = await response.blob();

            const file = new File([blob], `MIROCK紐約美拍鏡.jpg`, {
                type: blob.type,
            });

            if (navigator.userAgent.indexOf("Windows") !== -1) {
                // Fallback method for Windows devices
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `MIROCK紐約美拍鏡.jpg`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({
                    files: [file],
                    title: "MIROCK紐約美拍鏡",
                    text: "MIROCK紐約美拍鏡：https://www.easy4music.com/mirock",
                });
            } else {
                // Fallback method for devices that do not support Web Share API
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `MIROCK紐約美拍鏡.jpg`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error("Download failed:", error);
        }
    };
    const downloadVideo = async () => {
        try {
            const response = await fetch(mediaUrl);
            const blob = await response.blob();
            const file = new File([blob], `MIROCK紐約美拍鏡.mp4`, {
                type: blob.type,
            });

            if (
                navigator.userAgent.indexOf("Windows") !== -1 ||
                navigator.userAgent.indexOf("Android") !== -1
            ) {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `MIROCK紐約美拍鏡.mp4`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({
                    files: [file],
                    title: "MIROCK紐約美拍鏡",
                    text: "MIROCK紐約美拍鏡：https://www.easy4music.com/mirock",
                });
            } else {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `MIROCK紐約美拍鏡.mp4`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const countdownRenderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }) => {
        if (completed) {
            // 时间已到，显示过期信息
            return (
                <div className="text-white my-4">可下載時間已過期，謝謝。</div>
            );
        } else {
            // 时间未到，显示剩余时间
            return (
                <div className="text-white my-2">
                    下載剩餘時間：{days}天 {hours}時 {minutes}分 {seconds}秒
                </div>
            );
        }
    };

    // 取得當前配置
    const currentConfig = getVendorConfig(vendor1, vendor2);
    const showBackground = shouldShowBackground(vendor1, vendor2);
    const showBranding = shouldShowBranding(vendor1, vendor2);

    return (
        <div
            className="flex flex-col items-center lg:justify-center h-screen relative overflow-hidden"
            style={{
                backgroundColor: currentConfig?.background?.color || "black",
            }}
        >
            {showBackground && (
                <div
                    className="absolute inset-0 opacity-75"
                    style={{
                        backgroundImage: `url('${currentConfig.background.image}')`,
                        backgroundSize: "10%",
                        transform: "rotate(-45deg) scale(2.5)",
                        backgroundRepeat: "space",
                    }}
                ></div>
            )}

            {loading && (
                <div
                    id="loadingMessage"
                    className="text-lg text-white m-auto z-10"
                >
                    圖片讀取中，請稍後...
                </div>
            )}
            {!loading && !error && expirationDate && (
                <>
                    <div className="h-1/2 z-[99]">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Images"
                                className={`object-contain w-full ${
                                    imageUrl && mediaUrl ? "h-1/2" : "h-full"
                                } pt-8`}
                                style={{ display: !expired ? "block" : "none" }}
                            />
                        )}
                        {mediaUrl && (
                            <video
                                src={mediaUrl}
                                className={`object-contain w-full ${
                                    imageUrl && mediaUrl ? "h-1/2" : "h-full"
                                } pt-8 z-10`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ display: !expired ? "block" : "none" }}
                            />
                        )}
                    </div>
                    <Countdown
                        className="z-10"
                        date={expirationDate}
                        renderer={countdownRenderer}
                    />
                    <div id="downloadButton" className="mt-4 relative z-10">
                        <div className="flex gap-4">
                            {imageUrl && (
                                <button
                                    onClick={downloadImage}
                                    style={{
                                        display: !expired ? "block" : "none",
                                        background:
                                            "linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
                                    }}
                                    className="px-4 py-2 text-center  text-black rounded transition duration-300 flex items-center justify-center m-auto"
                                >
                                    保存圖片
                                </button>
                            )}
                            {mediaUrl && (
                                <button
                                    onClick={downloadVideo}
                                    style={{
                                        display: !expired ? "block" : "none",
                                        background:
                                            "linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
                                    }}
                                    className="px-4 py-2 text-center  text-black rounded transition duration-300 flex items-center justify-center m-auto"
                                >
                                    保存影片
                                </button>
                            )}
                        </div>

                        {showBranding && (
                            <div className="text-3xl text-highlight-light z-10 text-white flex flex-col items-center justify-center m-auto">
                                {hasValidLogo(currentConfig) && (
                                    <VendorLogo
                                        logoConfig={currentConfig.logo}
                                    />
                                )}
                                {hasValidSocialMedia(currentConfig) && (
                                    <SocialMedia
                                        socialLinks={
                                            currentConfig.socialMedia.links
                                        }
                                        title={currentConfig.socialMedia.title}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            {!loading && error && (
                <div className="text-lg text-white flex flex-col items-center justify-center m-auto z-10">
                    圖片讀取失敗，請稍後再試。
                    <button
                        style={{
                            background:
                                "linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)",
                        }}
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 mt-4 bg-blue-500 text-black rounded hover:bg-blue-700 transition duration-300"
                    >
                        重新整理
                    </button>
                    {showBranding && (
                        <div className="text-3xl z-10 text-highlight-light text-white flex flex-col items-center justify-center m-auto absolute bottom-0 mb-4">
                            {hasValidLogo(currentConfig) && (
                                <VendorLogo logoConfig={currentConfig.logo} />
                            )}
                            {hasValidSocialMedia(currentConfig) && (
                                <SocialMedia
                                    socialLinks={
                                        currentConfig.socialMedia.links
                                    }
                                    title={currentConfig.socialMedia.title}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImageLoader;
