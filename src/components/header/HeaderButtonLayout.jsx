import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderButtonLayout({
    name,
    url,
    redirectionUrl,
    buttonMode,
}) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                pathname !== url && navigate(redirectionUrl || url);
            }}
            className={`text-xl ${
                buttonMode
                    ? "w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500"
                    : "decoration-green-400"
            } ${
                pathname === url
                    ? "text-[#00CC69] cursor-default"
                    : `text-black ${buttonMode && "hover:underline"}`
            }`}
        >
            {name}
        </button>
    );
}
