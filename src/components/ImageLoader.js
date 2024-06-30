import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../assets/images/logo.png";
import SocialMedia from "./SocialMedia";

import Countdown from "react-countdown";

function ImageLoader() {
    const { imageId } = useParams();

    const [imageUrl, setImageUrl] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expired, setExpired] = useState(false); // 新增状态用于跟踪图片是否过期

    const [expirationDate, setExpirationDate] = useState(null); // 添加状态变量

    useEffect(() => {
        const imageUrl = `https://pics.easy4music.com/mirock/${imageId}.jpg`;
        setImageUrl(imageUrl);

        const image = new Image();
        image.onload = () => setLoading(false);
        image.onerror = () => {
            setLoading(false);
            setError(true);
        };
        image.src = imageUrl;

        const checkImageExpiration = async () => {
            try {
                const response = await fetch(imageUrl, { method: "HEAD" });
                const lastModified = response.headers.get("last-modified");
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
            } catch (error) {
                console.error("Error checking image expiration:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        checkImageExpiration();
    }, [imageId, imageUrl]);

    useEffect(() => {
        const mediaUrl = `https://pics.easy4music.com/mirock/${imageId}.mp4`;
        setMediaUrl(mediaUrl);
    }, [imageId, mediaUrl]);

    const downloadImage = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `MIROCK紐約美拍鏡.jpg`, {
                type: blob.type,
            });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "MIROCK紐約美拍鏡",
                    text: "MIROCK紐約美拍鏡：https://www.easy4music.com/mirock",
                });
                console.log("Image shared successfully");
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
                console.log("Image downloaded using fallback method");
            }
        } catch (error) {
            console.error("Download failed:", error);
        }
    };
    const downloadVideo = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `MIROCK紐約美拍鏡.mp4`, {
                type: blob.type,
            });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "MIROCK紐約美拍鏡",
                    text: "MIROCK紐約美拍鏡：https://www.easy4music.com/mirock",
                });
                console.log("Image shared successfully");
            } else {
                // Fallback method for devices that do not support Web Share API
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = `MIROCK紐約美拍鏡.mp4`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                console.log("Image downloaded using fallback method");
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

    return (
        <div className="flex flex-col items-center lg:justify-center h-screen bg-black relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-75"
                style={{
                    backgroundImage: `url('/mirock.png')`,
                    backgroundSize: "10%",
                    transform: "rotate(-45deg) scale(2.5)",
                    backgroundRepeat: "space",
                }}
            ></div>

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
                    <div className="h-1/2  z-[99]">
                        <img
                            src={imageUrl}
                            alt="Images"
                            className="object-contain w-full h-1/2 pt-8"
                            style={{ display: !expired ? "block" : "none" }}
                        />
                        <video
                            src={mediaUrl}
                            className="object-contain w-full h-1/2 pt-8 z-10"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ display: !expired ? "block" : "none" }}
                        />
                    </div>
                    <Countdown
                        className="z-10"
                        date={expirationDate}
                        renderer={countdownRenderer}
                    />
                    <div id="downloadButton" className="mt-4 relative z-10">
                        <div className="flex gap-4">
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
                        </div>

                        <div className="text-3xl text-highlight-light z-10 text-white flex flex-col items-center justify-center m-auto">
                            <img
                                src={Logo}
                                alt="logo"
                                className="w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer"
                                onClick={() =>
                                    (window.location.href =
                                        "https://www.easy4music.com/mirock")
                                }
                            />
                            <SocialMedia />
                        </div>
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
                    <div className="text-3xl z-10 text-highlight-light text-white flex flex-col items-center justify-center m-auto absolute bottom-0 mb-4">
                        <img
                            src={Logo}
                            alt="logo"
                            className="w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer"
                            onClick={() =>
                                (window.location.href =
                                    "https://www.easy4music.com/mirock")
                            }
                        />
                        <SocialMedia />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageLoader;
