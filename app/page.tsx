"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Chat() {
    const searchParams = useSearchParams();
    const deviceType = searchParams.get('type');
    const [isActive, setIsActive] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const [isModalVisible, setModalVisible] = useState(false);
    const chatHistoryRef_PC = useRef<HTMLDivElement>(null);
    const chatHistoryRef_SP = useRef<HTMLDivElement>(null);
    const chatHistoryRef_TB = useRef<HTMLDivElement>(null);

    const toggleClass = () => {
        setIsActive(!isActive);
        setIsAnimation(true);
    };

    useEffect(() => {
        if (chatHistoryRef_PC.current) {
            const element = chatHistoryRef_PC.current;
            element.scrollTop = element.scrollHeight;
        }
        if (chatHistoryRef_SP.current) {
            const element = chatHistoryRef_SP.current;
            element.scrollTop = element.scrollHeight;
        }
        if (chatHistoryRef_TB.current) {
            const element = chatHistoryRef_TB.current;
            element.scrollTop = element.scrollHeight;
        }
    });

    useEffect(() => {
        if (deviceType === "pc") {
            let height = "70px";
            let width = "180px";
            if (isActive) {
                width = "446px";
                height = "720px";
            }
            window.parent.postMessage({ width, height, isActive, deviceType }, "*");
        }

        if (deviceType === "tablet") {
            let height = "70px";
            let width = "180px";
            if (isActive) {
                width = "446px";
                height = "720px";
            }
            window.parent.postMessage({ width, height, isActive, deviceType }, "*");
        }

        if (deviceType === "sp") {
            let height = "70px";
            let width = "180px";
            if (isActive) {
                width = "calc(100% - 40px)";
                height = "calc(100vh - 40px)";
            }
            window.parent.postMessage({ width, height, isActive, deviceType }, "*");
        }
    }, [isActive]);

    const handleBannerClick = () => {
        if (deviceType === "sp") {
            setModalVisible(true);
        }
    }

    const callTo = () => {
        window.location.href = "tel:0120-965-982";
    }

    if (deviceType === "pc") {
        console.log();
        return (
            <div>
                <div
                    className={`fixed bottom-[0px] max-w-[100%] sm:max-w-[450px] bg-[#2E63A5] text-[#fff] px-[10px] py-[20px] rounded-[10px] chatdlg ${isActive ? "active" : ""
                        }`}
                >
                    <div className="w-100 relative">
                        <Image
                            className="absolute top-[0] right-[0] cursor-pointer"
                            src="/images/icons/close.png"
                            width={20}
                            height={20}
                            quality={100}
                            alt="AIドクター うえの君"
                            onClick={toggleClass}
                        />
                        <div className="w-100 flex justify-start items-start">
                            <div className="w-[80px] h-[80px] me-[10px]">
                                <Image
                                    className=""
                                    src="/images/logo/logo-img.png"
                                    width={80}
                                    height={80}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                            </div>
                            <div className="">
                                <Image
                                    className=""
                                    src="/images/logo/logo-text.png"
                                    width={225}
                                    height={30}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                                <p className="text-[14px]">
                                    治療のことなど何でもお聞きください。
                                </p>
                                <p className="text-[14px] mb-[5px]">個人情報不要です。</p>
                                <p className="text-[12px]">
                                    ※専門スタッフへの相談・カウンセリングもご利用ください。
                                </p>
                            </div>
                        </div>
                        <div
                            className="w-100 bg-white p-[15px] mt-[10px] rounded-[10px] h-[40vh] overflow-y-auto border border-2"
                            ref={chatHistoryRef_PC}
                        >
                            <div className="max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px]">
                                AIドクター
                                うえの君です、上野クリニック治療に関することなど、お気軽にお聞きください。
                            </div>
                            {messages.length > 0
                                ? messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={
                                            m.role === "user"
                                                ? "max-w-[300px] bg-[#BABBC5] px-[15px] py-[10px] rounded-b-[10px] rounded-l-[10px] text-[13px] text-black ms-auto mb-[15px] text-left w-fit"
                                                : "max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px] w-fit"
                                        }
                                    >
                                        {m.content}
                                    </div>
                                ))
                                : null}
                        </div>
                        <div className="w-100 mt-[10px] text-black">
                            <div className="relative">
                                <div className="relative">
                                    <textarea
                                        className="bottom-0 w-full max-w-md p-2 pe-[40px] border border-gray-300 rounded shadow-xl outline-none resize-none"
                                        value={input}
                                        placeholder="質問"
                                        onChange={handleInputChange}
                                    />
                                    <Image
                                        className="cursor-pointer absolute right-[20px] bottom-[25px]"
                                        src="/images/icons/submit.png"
                                        width={28}
                                        height={28}
                                        alt=""
                                        quality={100}
                                        onClick={(e) => handleSubmit(e as any)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-[10px]">
                            <p className="text-[15px]">
                                専門スタッフへの無料相談・無料カウンセリングはこちらから
                            </p>
                            <div className="mt-[5px] flex justify-between items-center">
                                <Link href={"https://www.ueno.co.jp/soudan/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer h-[82px] w-auto"
                                        src="/images/banner/01.png"
                                        width={135}
                                        height={80}
                                        quality={100}
                                        alt="専門スタッフへ　メール相談　無料・２4時間以内返信"
                                    />
                                </Link>
                                <div>
                                    <Image
                                        className="cursor-pointer h-[82px] w-auto"
                                        src="/images/banner/02.png"
                                        width={160}
                                        height={80}
                                        quality={100}
                                        alt="24時間無料電話相談　予約ダイヤル　0120-518-550"
                                    />
                                </div>
                                <Link href={"https://www.ueno.co.jp/yoyaku/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer h-[82px] w-auto"
                                        src="/images/banner/03.png"
                                        width={125}
                                        height={80}
                                        quality={100}
                                        alt="各医院での無料カウンセリング　メール予約"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className={`fixed w-[180px] bottom-[0px] chatbtn ${isActive ? "" : "active"
                        } ${isAnimation ? "animation" : ""
                        }`}
                >
                    <Image
                        className="cursor-pointer"
                        src="/images/common/fix-btn.png"
                        width={180}
                        height={70}
                        quality={100}
                        alt="AIドクター うえの君"
                        onClick={toggleClass}
                    />
                </div>
            </div>
        );
    }

    if (deviceType === "sp") {
        return (
            <div>
                <div
                    className={`fixed bottom-[0px] max-w-[100%] max-h-[90vh] overflow-y-auto bg-[#2E63A5] text-[#fff] px-[10px] py-[20px] rounded-[10px] chatdlg ${isActive ? "active" : ""
                        }`}
                >
                    <div className="w-100 relative">
                        <Image
                            className="absolute top-[0] right-[0] cursor-pointer"
                            src="/images/icons/close.png"
                            width={20}
                            height={20}
                            quality={100}
                            alt="AIドクター うえの君"
                            onClick={toggleClass}
                        />
                        <div className="w-100 flex justify-start items-start">
                            <div className="w-[70px] h-[70px] me-[10px]">
                                <Image
                                    className=""
                                    src="/images/logo/logo-img.png"
                                    width={70}
                                    height={70}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                            </div>
                            <div className="">
                                <Image
                                    className=""
                                    src="/images/logo/logo-text.png"
                                    width={180}
                                    height={20}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                                <p className="text-[14px]">
                                    治療のことなど何でもお聞きください。
                                </p>
                                <p className="text-[14px] mb-[5px]">個人情報不要です。</p>
                                <p className="text-[12px]">
                                    ※専門スタッフへの相談・カウンセリングもご利用ください。
                                </p>
                            </div>
                        </div>
                        <div
                            className="w-100 bg-white p-[15px] mt-[10px] rounded-[10px] min-h-[300px] h-[40vh] overflow-y-auto border border-2"
                            ref={chatHistoryRef_SP}
                        >
                            <div className="max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px]">
                                AIドクター
                                うえの君です、上野クリニック治療に関することなど、お気軽にお聞きください。
                            </div>
                            {messages.length > 0
                                ? messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={
                                            m.role === "user"
                                                ? "max-w-[300px] bg-[#BABBC5] px-[15px] py-[10px] rounded-b-[10px] rounded-l-[10px] text-[13px] text-black ms-auto mb-[15px] text-left w-fit"
                                                : "max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px] w-fit"
                                        }
                                    >
                                        {m.content}
                                    </div>
                                ))
                                : null}
                        </div>
                        <div className="w-100 mt-[10px] text-black">
                            <div className="relative">
                                <div className="relative">
                                    <textarea
                                        className="bottom-0 w-full max-w-md p-2 pe-[40px] border border-gray-300 rounded shadow-xl outline-none resize-none"
                                        value={input}
                                        placeholder="質問"
                                        onChange={handleInputChange}
                                    />
                                    <Image
                                        className="cursor-pointer absolute right-[20px] bottom-[25px]"
                                        src="/images/icons/submit.png"
                                        width={28}
                                        height={28}
                                        alt=""
                                        quality={100}
                                        onClick={(e) => handleSubmit(e as any)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-[10px]">
                            <p className="text-[12px] tracking-tight">
                                専門スタッフへの無料相談・無料カウンセリングはこちらから
                            </p>
                            <div className="mt-[5px] flex justify-between items-center">
                                <Link href={"https://www.ueno.co.jp/soudan/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer min-h-[60px] h-[9.5vh] w-auto"
                                        src="/images/banner/01.png"
                                        width={135}
                                        height={80}
                                        quality={100}
                                        alt="専門スタッフへ　メール相談　無料・２4時間以内返信"
                                    />
                                </Link>
                                <a href="tel:0120965982">
                                    <Image
                                        className="cursor-pointer min-h-[60px] h-[9.5vh] w-auto"
                                        src="/images/banner/02_SP.png"
                                        width={160}
                                        height={80}
                                        quality={100}
                                        alt="24時間無料電話相談　予約ダイヤル　0120-518-550"
                                    />
                                </a>
                                <Link href={"https://www.ueno.co.jp/yoyaku/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer min-h-[60px] h-[9.5vh] w-auto"
                                        src="/images/banner/03.png"
                                        width={125}
                                        height={80}
                                        quality={100}
                                        alt="各医院での無料カウンセリング　メール予約"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className={`fixed w-[180px] bottom-[0px] chatbtn ${isActive ? "" : "active"
                        } ${isAnimation ? "animation" : ""
                        }`}
                >
                    <Image
                        className="cursor-pointer"
                        src="/images/common/fix-btn.png"
                        width={180}
                        height={70}
                        quality={100}
                        alt="AIドクター うえの君"
                        onClick={toggleClass}
                    />
                </div>

                {isModalVisible && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full">
                                    <div className="bg-gray-50 px-4 py-3 flex flex-col sm:px-6">
                                        <div className="flex justify-center">
                                            <div onClick={callTo} className="flex justify-center text-sky-500 cursor-pointer">
                                                <Image
                                                    className="me-[5px] w-[15px] h-[15px] mt-[5px]"
                                                    src="/images/icons/phone-solid.png"
                                                    width={20}
                                                    height={20}
                                                    quality={100}
                                                    alt="AIドクター うえの君"
                                                />
                                                発信 0120-965-982
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setModalVisible(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">キャンセル</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if(deviceType == "tablet") {
        return (
            <div>
                <div
                    className={`fixed bottom-[0px] max-w-[100%] sm:max-w-[450px] bg-[#2E63A5] text-[#fff] px-[10px] py-[20px] rounded-[10px] chatdlg ${isActive ? "active" : ""
                        }`}
                >
                    <div className="w-100 relative">
                        <Image
                            className="absolute top-[0] right-[0] cursor-pointer"
                            src="/images/icons/close.png"
                            width={20}
                            height={20}
                            quality={100}
                            alt="AIドクター うえの君"
                            onClick={toggleClass}
                        />
                        <div className="w-100 flex justify-start items-start">
                            <div className="w-[70px] h-[70px] me-[10px]">
                                <Image
                                    className=""
                                    src="/images/logo/logo-img.png"
                                    width={70}
                                    height={70}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                            </div>
                            <div className="">
                                <Image
                                    className=""
                                    src="/images/logo/logo-text.png"
                                    width={180}
                                    height={20}
                                    quality={100}
                                    alt="AIドクター うえの君"
                                />
                                <p className="text-[14px]">
                                    治療のことなど何でもお聞きください。
                                </p>
                                <p className="text-[14px] mb-[5px]">個人情報不要です。</p>
                                <p className="text-[12px]">
                                    ※専門スタッフへの相談・カウンセリングもご利用ください。
                                </p>
                            </div>
                        </div>
                        <div
                            className="w-100 bg-white p-[15px] mt-[10px] rounded-[10px] h-[40vh] overflow-y-auto border border-2"
                            ref={chatHistoryRef_TB}
                        >
                            <div className="max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px]">
                                AIドクター
                                うえの君です、上野クリニック治療に関することなど、お気軽にお聞きください。
                            </div>
                            {messages.length > 0
                                ? messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={
                                            m.role === "user"
                                                ? "max-w-[300px] bg-[#BABBC5] px-[15px] py-[10px] rounded-b-[10px] rounded-l-[10px] text-[13px] text-black ms-auto mb-[15px] text-left w-fit"
                                                : "max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px] w-fit"
                                        }
                                    >
                                        {m.content}
                                    </div>
                                ))
                                : null}
                        </div>
                        <div className="w-100 mt-[10px] text-black">
                            <div className="relative">
                                <div className="relative">
                                    <textarea
                                        className="bottom-0 w-full max-w-md p-2 pe-[40px] border border-gray-300 rounded shadow-xl outline-none resize-none"
                                        value={input}
                                        placeholder="質問"
                                        onChange={handleInputChange}
                                    />
                                    <Image
                                        className="cursor-pointer absolute right-[20px] bottom-[25px]"
                                        src="/images/icons/submit.png"
                                        width={28}
                                        height={28}
                                        alt=""
                                        quality={100}
                                        onClick={(e) => handleSubmit(e as any)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-[10px]">
                            <p className="text-[15px]">
                                専門スタッフへの無料相談・無料カウンセリングはこちらから
                            </p>
                            <div className="mt-[5px] flex justify-between items-center">
                                <Link href={"https://www.ueno.co.jp/soudan/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer h-[9.5vh] w-auto"
                                        src="/images/banner/01.png"
                                        width={135}
                                        height={80}
                                        quality={100}
                                        alt="専門スタッフへ　メール相談　無料・２4時間以内返信"
                                    />
                                </Link>
                                <div onClick={handleBannerClick}>
                                    <Image
                                        className="cursor-pointer h-[9.5vh] w-auto"
                                        src="/images/banner/02_SP.png"
                                        width={160}
                                        height={80}
                                        quality={100}
                                        alt="24時間無料電話相談　予約ダイヤル　0120-518-550"
                                    />
                                </div>
                                <Link href={"https://www.ueno.co.jp/yoyaku/ueno/"} target="_blank">
                                    <Image
                                        className="cursor-pointer h-[9.5vh] w-auto"
                                        src="/images/banner/03.png"
                                        width={125}
                                        height={80}
                                        quality={100}
                                        alt="各医院での無料カウンセリング　メール予約"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className={`fixed w-[180px] bottom-[0px] chatbtn ${isActive ? "" : "active"
                        } ${isAnimation ? "animation" : ""
                        }`}
                >
                    <Image
                        className="cursor-pointer"
                        src="/images/common/fix-btn.png"
                        width={180}
                        height={70}
                        quality={100}
                        alt="AIドクター うえの君"
                        onClick={toggleClass}
                    />
                </div>

                {isModalVisible && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full">
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <div className="flex justify-center">
                                            <a href="tel:0120-965-982" className="flex justify-center text-sky-500">
                                                <Image
                                                    className="me-[5px] w-[15px] h-[15px] mt-[5px]"
                                                    src="/images/icons/phone-solid.png"
                                                    width={20}
                                                    height={20}
                                                    quality={100}
                                                    alt="AIドクター うえの君"
                                                />
                                                発信 0120-965-982
                                            </a>
                                        </div>
                                        <button type="button" onClick={() => setModalVisible(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">キャンセル</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (deviceType === null) {
        return (
            <h1 className="text-[24px]">Not Defined Device Type</h1>
        )
    }
}