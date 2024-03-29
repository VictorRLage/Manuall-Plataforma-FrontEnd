import arrowLeftOnRectangleIcon from "@/assets/icons/arrow_left_on_rectangle_icon.svg";
import logo from "@/assets/manuall/logo_green_white.png";
import CircleSidebar from "@/assets/shapes/circle_sidebar.png";
import { useData } from "@/data/CreateContext";
import AbasAdmParametrizacao from "@/enum/AbasAdmParametrizacao";
import { logoff } from "@/utils/functions";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { windowWidth } = useData();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isOpen, setIsOpen] = useState(true);
    const [responsiveModeOn, setResponsiveModeOn] = useState(false);

    useEffect(() => {
        const newResponsiveModeOn = windowWidth < 900;

        setIsOpen(!newResponsiveModeOn);
        setResponsiveModeOn(newResponsiveModeOn);
    }, [windowWidth]);

    return (
        <div
            className={`transition-all h-full ${
                isOpen ? "min-w-[250px] max-w-[250px]" : "min-w-0 max-w-0"
            } ${responsiveModeOn && "absolute"}`}
        >
            <div className="w-full h-full relative">
                <div className="h-full w-full overflow-x-hidden flex flex-col bg-verde-escuro-1">
                    <div className="w-[250px] h-[18%] flex justify-center items-center">
                        <div
                            className="w-full h-full bg-center bg-no-repeat flex items-center justify-center"
                            style={{
                                backgroundImage: `url(${CircleSidebar})`,
                                backgroundSize: "100% 100%",
                            }}
                        >
                            <img className="w-[65%] mb-4" src={logo} alt="" />
                        </div>
                    </div>
                    <div className="h-[82%] flex flex-col justify-between items-center w-full">
                        <div className="flex flex-col gap-4 py-8 px-6 w-full">
                            {AbasAdmParametrizacao?.map(
                                ({ title, url, icon }, i) => (
                                    <div
                                        className="w-[100%] h-[60px] bg-[#008042] hover:bg-[#0F623A] transition-colors cursor-pointer px-4 rounded-xl flex"
                                        key={i}
                                        onClick={() => navigate(url)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={icon}
                                                className="w-[22px]"
                                                alt={title}
                                            />
                                            <div
                                                className={`text-white text-xl break-keep whitespace-nowrap ${
                                                    pathname === url &&
                                                    "font-bold"
                                                }`}
                                            >
                                                {title}
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="flex flex-col gap-4 py-8 px-6 w-full">
                            <div
                                className="w-[100%] h-[60px] bg-[#008042] hover:bg-[#0F623A] transition-colors cursor-pointer px-4 rounded-xl flex"
                                onClick={logoff}
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={arrowLeftOnRectangleIcon}
                                        className="w-[22px]"
                                        alt="Logoff"
                                    />
                                    <div className="text-white text-xl">
                                        Logoff
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute w-[40px] h-[40px] bg-[#0f623a] top-0 -right-[40px] rounded-br-xl p-[4px] cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <ArrowLeftIcon fill="white" />
                    ) : (
                        <ArrowRightIcon fill="white" />
                    )}
                </div>
            </div>
        </div>
    );
}
