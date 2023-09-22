import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCustom from "@/components/main/ModalCustom";

export default function ModalNaoLogado({ modalGettr, modalSettr }) {
    const navigate = useNavigate();

    const [switchPhase, setSwitchPhase] = useState(true);

    useEffect(() => {
        if (modalGettr) {
            setSwitchPhase(true);
        }
    }, [modalGettr]);

    return (
        <ModalCustom
            modalGettr={modalGettr}
            modalSettr={modalSettr}
            canClose={true}
        >
            {switchPhase ? (
                <div className="w-full h-full flex flex-col items-center py-8 gap-10 px-10">
                    <span className="text-3xl font-semibold text-center max-w-[300px] flex items-center justify-center flex-wrap">
                        Como deseja continuar?
                    </span>
                    <div className=" flex flex-col items-center gap-4">
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setSwitchPhase(false);
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Cadastro
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center py-8 gap-10 px-16">
                    <span className="text-3xl font-semibold text-center max-w-[300px] flex items-center justify-center flex-wrap">
                        Como deseja realizar o cadastro?
                    </span>
                    <div className=" flex items-center gap-4">
                        <button
                            onClick={() => {
                                navigate("/cadastro/contratante");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Contratante
                        </button>
                        <button
                            onClick={() => {
                                navigate("/cadastro/prestador");
                            }}
                            className="w-42 h-12 text-2xl bg-verde-padrao rounded-full text-white"
                        >
                            Prestador
                        </button>
                    </div>
                </div>
            )}
        </ModalCustom>
    );
}