import ModalCustom from "@/components/main/ModalCustom";
import AcessibilidadeBg from "@/assets/shapes/AcessibilidadeBg.png";
import Normal from "@/assets/icons/acessibilidade_normal.png";
import Deuteranopia from "@/assets/icons/acessibilidade_deuteranopia.png";
import Protanopia from "@/assets/icons/acessibilidade_protanopia.png";
import Tritanopia from "@/assets/icons/acessibilidade_tritanopia.png";

export default function ModalAcessibilidade({ modalGettr, modalSettr }) {
    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={true}
            blurBackgroundStyle={{
                zIndex: "600",
            }}
            modalBackgroundStyle={{
                zIndex: "601",
            }}
        >
            <div className="w-[600px] flex flex-col bg-center">
                <div
                    className="w-full h-[125px] bg-no-repeat flex justify-center"
                    style={{
                        backgroundImage: `url(${AcessibilidadeBg})`,
                        backgroundSize: "100% 100%",
                    }}
                >
                    <span className="text-white text-2xl font-bold mt-[35px]">
                        Opções de Acessibilidade
                    </span>
                </div>
                <div className="w-full h-[375px] flex flex-col pb-4">
                    <div className="h-[50%] flex justify-center items-center gap-8">
                        <div className="w-[160px] h-[160px] bg-[#f5f5f5] drop-shadow-md flex flex-col justify-center items-center gap-3">
                            <span className="text-xl">Visão Normal</span>
                            <img
                                src={Normal}
                                alt="Símbolo de roda de cores de visão normal"
                                className="h-[50%]"
                            />
                        </div>
                        <div className="w-[160px] h-[160px] bg-[#f5f5f5] drop-shadow-md flex flex-col justify-center items-center gap-3">
                            <span className="text-xl">Deuteranopia</span>
                            <img
                                src={Deuteranopia}
                                alt="Símbolo de roda de cores de visão normal"
                                className="h-[50%]"
                            />
                        </div>
                    </div>
                    <div className="h-[50%] flex justify-center items-center gap-8">
                        <div className="w-[160px] h-[160px] bg-[#f5f5f5] drop-shadow-md flex flex-col justify-center items-center gap-3">
                            <span className="text-xl">Protanopia</span>
                            <img
                                src={Protanopia}
                                alt="Símbolo de roda de cores de visão normal"
                                className="h-[50%]"
                            />
                        </div>
                        <div className="w-[160px] h-[160px] bg-[#f5f5f5] drop-shadow-md flex flex-col justify-center items-center gap-3">
                            <span className="text-xl">Tritanopia</span>
                            <img
                                src={Tritanopia}
                                alt="Símbolo de roda de cores de visão normal"
                                className="h-[50%]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ModalCustom>
    );
}