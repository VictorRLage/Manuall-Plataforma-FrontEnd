import defaultImg from "@/assets/demo/default_img.jpg";
import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function SolicitacaoImg({
    openCreateImageModal,
    deleteImagem,
    isNextToBeUploaded,
    currentImg,
}) {
    const [isMouseOver, setIsMouseOver] = useState(null);

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseOver={() =>
                currentImg && setIsMouseOver(true)
            }
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <img
                onError={({ target }) => {
                    target.src = defaultImg;
                }}
                src={currentImg}
                alt=" "
                className="w-[100px] h-[90px] bg-gray-200 object-cover border-0"
            />
            {isNextToBeUploaded && (
                <button
                    className="absolute bg-[#29a854] text-center w-12 h-12 rounded-full"
                    onClick={openCreateImageModal}
                >
                    <PlusIcon className="text-white h-[90%] w-[90%] m-auto" />
                </button>
            )}
            {isMouseOver && (
                <button
                    className="absolute bg-[#962c2c] text-center w-8 h-8 rounded-full right-1 top-1"
                    onClick={() => {
                        deleteImagem(currentImg);
                    }}
                >
                    <TrashIcon className="text-white h-[1.25rem] w-[1.25rem] m-auto" />
                </button>
            )}
        </div>
    );
}
