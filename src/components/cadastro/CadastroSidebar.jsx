import logo_extensa from "@/assets/manuall/logo_black_white.png";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function CadastroSidebar({
    mainText,
    isLogin = false,
    setModalEscolherCadastro,
}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-verde-padrao h-full min-w-[30%] max-w-[30%] flex flex-col items-center">
                <div className="h-[10%] w-full flex items-center justify-center">
                    <img
                        src={logo_extensa}
                        alt="Logo da Manuall por extensa"
                        className="w-52 mt-10"
                    />
                </div>
                <div className="h-[40%] w-full flex flex-col items-center justify-center">
                    {isLogin ? (
                        <>
                            <p className="text-4xl leading-[40px] font-bold text-white text-center mt-12 flex items-center justify-center flex-wrap">
                                Ainda não possui uma conta?
                            </p>
                            <p className="text-xl leading-[40px] text-white text-center pt-2">
                                Cadastre-se por aqui.
                            </p>
                        </>
                    ) : (
                        <p className="text-4xl leading-[50px] font-bold text-white text-center mt-8 flex items-center justify-center flex-wrap">
                            {mainText}
                        </p>
                    )}
                </div>
                <div className="h-[50%] w-full flex items-center justify-evenly flex-col pt-[20%]">
                    {isLogin ? (
                        <button
                            onClick={() => {
                                setModalEscolherCadastro(true);
                            }}
                            className="text-2xl text-verde-escuro-1 bg-white hover:bg-gray-200 transition-colors shadow-md py-2 px-12 rounded-full font-semibold"
                        >
                            Cadastre-se
                        </button>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <p className="text-xl font-semibold text-white text-center">
                                Já possui uma conta?
                            </p>
                            <a
                                className="text-xl font-bold text-white text-center underline cursor-pointer"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Entre aqui
                            </a>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        className="text-xl font-bold text-white leading-relaxed flex items-center"
                    >
                        <ChevronDoubleLeftIcon className="h-8 w-8" />
                        Voltar à Tela inicial
                    </button>
                </div>
            </div>
        </>
    );
}
