import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button, EButtonTheme, EComponentSize, LoaderMiddle } from "@sberbusiness/triplex-next";

const successSignAnimation = new URL("../lottie_animations/successSign.json", import.meta.url).href;
const failSignAnimation = new URL("../lottie_animations/failSign.json", import.meta.url).href;
const warningSignAnimation = new URL("../lottie_animations/warningSign.json", import.meta.url).href;
const waitingSignAnimation = new URL("../lottie_animations/waitingSign.json", import.meta.url).href;

/** Размер стороны LoaderMiddle */
const loaderMiddleSize = 64;
/** Диаметр dots в LoaderMiddle */
const loaderMiddleDotSize = 12;

/** Размер стороны Lottie */
const lottieSize = 85;
/** Диаметр dots в Lottie - изначальный диаметр 12×12, под transform scale [80,80] */
const lottieDotSize = 12 * 0.8;

/** Диаметр dots в Lottie после вписывания Lottie в LoaderMiddle */
const lottieDotSizeWhenFitted = (lottieDotSize / lottieSize) * loaderMiddleSize;
/** Масштаб dots в Lottie после вписывания Lottie в LoaderMiddle */
const lottieDotSizeScale = loaderMiddleDotSize / lottieDotSizeWhenFitted;

/** Целевой размер стороны Lottie, при котором dots в Lottie совпадают с dots в LoaderMiddle. */
const lottieViewportSize = loaderMiddleSize * lottieDotSizeScale;

type TStatus = "success" | "fail" | "warning" | "waiting";

const STATUS_TO_ANIMATION_MAP: Record<TStatus, string> = {
    success: successSignAnimation,
    fail: failSignAnimation,
    warning: warningSignAnimation,
    waiting: waitingSignAnimation,
};

export const WithAnimationExample = () => {
    const [lottieStarted, setLottieStarted] = useState(false);
    const [isLottiePlay, setIsLottiePlay] = useState(false);

    const handleChange = () => {
        if (lottieStarted) {
            setLottieStarted(false);
            setIsLottiePlay(false);
            return;
        }

        setLottieStarted(true);
        setIsLottiePlay(true);
    };

    const renderContent = (status: TStatus) => {
        return (
            <div
                style={{
                    width: loaderMiddleSize,
                    height: loaderMiddleSize,
                    position: "relative",
                    margin: "32px 0 0 32px",
                }}
            >
                {!lottieStarted ? (
                    <LoaderMiddle />
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: lottieViewportSize,
                            height: lottieViewportSize,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Player
                            autoplay={isLottiePlay}
                            loop={false}
                            keepLastFrame
                            src={STATUS_TO_ANIMATION_MAP[status]}
                            onEvent={(event) => {
                                if (event === "complete") {
                                    setIsLottiePlay(false);
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={handleChange}>
                {lottieStarted ? "Start Loading" : "Stop Loading"}
            </Button>

            <div style={{ display: "flex", gap: 24 }}>
                {renderContent("success")}
                {renderContent("fail")}
                {renderContent("warning")}
                {renderContent("waiting")}
            </div>
        </div>
    );
};
