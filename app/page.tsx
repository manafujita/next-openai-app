'use client'

import React, { useState } from 'react';
import { useChat } from 'ai/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      	<div className={`fixed bottom-[20px] max-w-[96%] sm:max-w-[450px] bg-[#2E63A5] text-[#fff] px-[10px] py-[20px] rounded-[10px] chatdlg ${isActive ? 'active' : ''}`}>
            <div className="w-100 relative">
                <Image
                    className="absolute top-[0] right-[0] cursor-pointer"
                    src="/images/icons/close.png"
                    width={20}
                    height={20}
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
                            alt="AIドクター うえの君"
                        />
                    </div>
                    <div className="">
                        <Image
                            className=""
                            src="/images/logo/logo-text.png"
                            width={225}
                            height={30}
                            alt="AIドクター うえの君"
                        />
                        <p className="text-[14px]">治療のことなど何でもお聞きください。</p>
                        <p className="text-[14px] mb-[5px]">個人情報不要です。</p>
                        <p className="text-[12px]">※専門スタッフへの相談・カウンセリングもご利用ください。</p>
                    </div>
                </div>
                <div className="w-100 bg-white p-[15px] mt-[10px] rounded-[10px] h-[40vh] sm:h-[400px] overflow-y-auto">
					<div className="max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px]">
						AIドクター うえの君です、上野クリニック治療に関することなど、お気軽にお聞きください。
					</div>
					{messages.length > 0
                      ? messages.map(m => (
                          <div key={m.id} className={m.role === 'user' ? 'max-w-[300px] bg-[#BABBC5] px-[15px] py-[10px] rounded-b-[10px] rounded-l-[10px] text-[13px] text-black ms-auto mb-[15px] text-left w-fit' : 'max-w-[300px] bg-[#2E63A5] px-[15px] py-[10px] rounded-r-[10px] rounded-b-[10px] text-[13px] mb-[15px] w-fit'}>
                            {m.content}
                          </div>
                        ))
                      : null}
                </div>
                <div className="w-100 mt-[10px] text-black">
                    <div className="relative">
                        {/* <input type="text" className="block w-full p-4 text-sm text-black rounded-lg bg-white border-0 outline-none" placeholder="質問"/> */}
                        <div className='relative'>
                          <textarea
                            className="bottom-0 w-full max-w-md p-2 pe-[40px] border border-gray-300 rounded shadow-xl outline-none resize-none"
                            value={input}
                            placeholder="質問"
                            onChange={handleInputChange}
                          />
						  <Image
                            className="cursor-pointer absolute right-[20px] bottom-[15px]"
                            src="/images/icons/submit.png"
                            width={28}
                            height={28}
                            alt=""
							onClick={handleSubmit}
                        />
                        </div>
                    </div>
                </div>
                <div className="w-100 mt-[10px]">
                    <p className="text-[15px]">専門スタッフへの無料相談・無料カウンセリングはこちらから</p>
                    <div className="mt-[5px] flex justify-between items-center">
                        <Link href={""}>
                            <Image
                                className="cursor-pointer"
                                src="/images/banner/01.png"
                                width={135}
                                height={80}
                                alt="専門スタッフへ　メール相談　無料・２4時間以内返信"
                            />
                        </Link>
                        <Link href={""}>
                            <Image
                                className="cursor-pointer"
                                src="/images/banner/02.png"
                                width={160}
                                height={80}
                                alt="24時間無料電話相談　予約ダイヤル　0120-518-550"
                            />
                        </Link>
                        <Link href={""}>
                            <Image
                                className="cursor-pointer"
                                src="/images/banner/03.png"
                                width={125}
                                height={80}
                                alt="各医院での無料カウンセリング　メール予約"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>

      	<div className={`fixed max-w-[180px] bottom-[20px] chatbtn ${isActive ? '' : 'active'}`}>
            <Image
                className="cursor-pointer"
                src="/images/common/fix-btn.png"
                width={180}
                height={70}
                alt="AIドクター うえの君"
				onClick={toggleClass}
            />
        </div>
    </>
  )
}
