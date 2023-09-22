import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Card from "@/components/main/Card";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import FooterWave from "@/assets/shapes/FooterWave";
import homeBg from "@/assets/demo/home_bg.jpeg";
import comoContratar1 from "@/assets/storyset/como_contratar_1.png";
import comoContratar2 from "@/assets/storyset/como_contratar_2.png";
import comoContratar3 from "@/assets/storyset/como_contratar_3.png";
import comoEnsinar1 from "@/assets/storyset/como_ensinar_1.png";
import comoEnsinar2 from "@/assets/storyset/como_ensinar_2.png";
import comoEnsinar3 from "@/assets/storyset/como_ensinar_3.png";

import NenhumPrestadorEncontrado from "@/components/prestadores/NaoEncontrado";

export default function Home() {
    const slides = Array.from({ length: 3 }).fill({ url: homeBg })

    const navigate = useNavigate();

    const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [areaAtiva, setAreaAtiva] = useState(0);

    const getAreas = () => {
        axios.get("/usuario/areas")
            .then(({ data }) => setAreas(data))
    }

    const changeAreaAtiva = (idArea) => {
        setPrestadores()
        if (areaAtiva === idArea) {
            axios.get("/usuario/prestadores")
                .then(({ data }) => {
                    setPrestadores(data)
                    setAreaAtiva(0)
                })
        } else {
            axios.get(`/usuario/prestadores/${idArea}`)
                .then(({ data }) => {
                    setPrestadores(data)
                    setAreaAtiva(idArea)
                })
        }
    }

    useEffect(() => {
        getAreas()
        changeAreaAtiva(0)
    }, [])

    return (
        <>
            <Header/>
            <div className="w-full h-full">
                <div className="group">
                    <div style={{ backgroundImage: `url(${slides[modalCurrentIndex].url})` }} className="w-full h-120 bg-center bg-cover duration-500">
                        {modalCurrentIndex === 0 ?
                            <div className="absolute">
                                <div className="absolute ml-20 mt-20 text-white text-6xl">
                                    Encontre <br /> prestadores de <br /> serviço <span className="font-bold">excelentes</span> <br /> prontos para te <br /> <span className="font-bold">ensinar!</span>
                                </div>
                                <button onClick={() => { navigate("/login") }} className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-112 ring-4 ring-verde-padrao focus:outline-none focus:ring">
                                    Encontrar
                                </button>
                                <svg width="100%" height="480" viewBox="0 0 883 631" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M883 292.237C883 678.017 842.268 628.986 355.217 628.986C-988.334 628.986 -45.5207 664.039 -45.5207 391.338C-45.5207 118.638 -207.46 0.595234 109.373 0.595234C426.205 0.595234 883 -26.9222 883 292.237Z" fill="#008042" />
                                </svg>
                            </div>
                            : modalCurrentIndex === 1 ?
                                <div className="absolute flex">
                                    <div className="absolute ml-[66rem] mt-20 text-white text-6xl text-right">
                                        Venha <span className=" font-bold">mudar</span> <br /> o mercado de <br /> <span className="font-bold">prestadores de <br /> serviço </span> com <br /> a gente
                                    </div>
                                    <button className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-88 ml-[62rem] ring-4 ring-verde-padrao focus:outline-none focus:ring " onClick={() => { navigate("/cadastro/prestador") }}>Cadastrar</button>
                                    <svg className="ml-[52rem]" width="698" height="480" viewBox="0 0 698 630" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1493.41 307.649C1493.41 693.19 1187.61 617.686 891.5 624.5C-303.5 652 78.5055 564.169 4.00007 141.5C-48.9945 -89.8309 589.006 6.66897 864.456 -25.1818C1140.6 -25.1818 1493.41 -11.3115 1493.41 307.649Z" fill="#008042" />
                                    </svg>
                                </div>
                                : modalCurrentIndex === 2 &&
                                <div className="absolute flex justify-center">
                                    <div className="absolute ml-52 mt-13 text-white text-6xl text-center">
                                        Com a <span className="font-bold">Manuall</span> <br /> você pode passar o seu <br /> <span className="font-bold">conhecimento</span> adiante e <br /> deixar o seu <span className="font-bold">legado</span>
                                    </div>
                                    <button className="absolute w-32 h-12 bg-white rounded-full text-2xl text-verde-escuro-2 font-semibold mt-84 ml-52 ring-4 ring-verde-padrao focus:outline-none focus:ring " onClick={() => { navigate("/cadastro/prestador") }}>Cadastrar</button>
                                    <svg className="ml-52 mt-3" width="1102" height="430" viewBox="0 0 1102 523" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1102 258.803C1102 575.057 874.193 513.122 653.593 518.712C-236.658 541.27 60.9612 483.439 5.4562 136.729C-34.0237 -53.0297 441.274 26.1281 646.478 0.00128042C852.199 0.00128042 1102 -2.8374 1102 258.803Z" fill="#008042" />
                                    </svg>
                                </div>
                        }
                        <div className="flex flex-row justify-between">
                            <div
                                onClick={() => { setModalCurrentIndex((modalCurrentIndex + slides.length - 1) % slides.length) }}
                                className="z-30 mt-48 cursor-pointer hidden group-hover:block"
                            >
                                <ChevronLeftIcon className="text-white w-16 h-16" />
                            </div>
                            <div
                                onClick={() => { setModalCurrentIndex((modalCurrentIndex + 1) % slides.length) }}
                                className="z-30 mt-48 right-0 cursor-pointer hidden group-hover:block"
                            >
                                <ChevronRightIcon className="text-white w-16 h-16" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="z-30 hidden group-hover:flex cursor-pointer w-24 mt-48 justify-between ">
                                {Array(3).fill().map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setModalCurrentIndex(i)}
                                        style={{ backgroundColor: modalCurrentIndex === i ? "#268054" : "white" }}
                                        className="w-6 h-6 bg-white border-2 border-verde-escuro-2 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center flex-col w-full">
                    <div className="p-12 text-5xl font-semibold text-center">
                        O que você <span className="text-verde-padrao">precisa?</span>
                    </div>
                    <div className="w-full px-16 flex justify-center flex-wrap">
                        {areas
                            ? areas.slice(0).map((data, i) => (
                                <button
                                    onClick={() => { changeAreaAtiva(data.id) }}
                                    key={i}
                                    className={
                                        `${areaAtiva === data.id ? "bg-verde-padrao text-white" : "bg-white hover:bg-[#eefff3] text-verde-padrao"}
                                    transition-all w-32 h-10 rounded-full text-xl font-semibold border-verde-padrao border-2 p-6 flex justify-center items-center m-3`}
                                >
                                    {data.nome}
                                </button>
                            ))
                            : <>
                                {Array(6).fill().map((_, i) => (
                                    <div key={i} className="w-32 h-[52px] m-3">
                                        <Skeleton height={"100%"} borderRadius={"9999px"} />
                                    </div>
                                ))}
                            </>}
                    </div>
                    <div className="px-16 mt-12 flex flex-wrap justify-center gap-20 self-center">
                        {prestadores
                            ? prestadores.length === 0
                                ? <NenhumPrestadorEncontrado home={true} />
                                : prestadores.slice(0, 6).map((data, i) => (
                                    <Card
                                        key={i}
                                        id={data.id}
                                        nome={data.nome}
                                        cidade={data.cidade}
                                        foto={data.anexoPfp}
                                        area={areas?.find(area => area.id === data.idArea)?.nome}
                                        min={data.orcamentoMin}
                                        max={data.orcamentoMax}
                                        aula={data.prestaAula}
                                        mediaNota={data.mediaAvaliacoes}
                                    />
                                )) : Array(6).fill().map((_, i) => (
                                    <div key={i}>
                                        <Skeleton width={"320px"} height={"480px"} borderRadius={"1.5rem"} />
                                    </div>
                                ))
                            }
                    </div>
                </div>
                <div className="w-full flex p-32  flex-col">
                    <div className="w-full text-6xl font-semibold text-center">
                        Como <span className="text-verde-padrao">contratar?</span>
                    </div>
                    <div className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoContratar1} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">
                                    Cadastre-se e <span className="text-verde-padrao font-semibold">pesquise</span> pelo prestador que <span className="text-verde-padrao font-semibold">você precisa!</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoContratar2} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">Faça <span className="text-verde-padrao font-semibold">a sua escolha</span> e solicite o serviço (+ aula, se você quiser) em apenas 3 etapas!</span>
                            </div>
                        </div>
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoContratar3} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">Termine de negociar pelo chat e pronto! Seu <span className="text-verde-padrao font-semibold">prestador (e professor)</span> irá até você!</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex px-32 flex-col">
                    <div className="w-full text-6xl font-semibold text-center">
                        Como <span className="text-verde-padrao">ensinar?</span>
                    </div>
                    <div className=" mt-12 grid grid-cols-3 grid-rows-1 gap-20 self-center">
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoEnsinar1} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">
                                    Cadastre-se e converse conosco para sua <span className="text-verde-padrao font-semibold">aprovação!</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoEnsinar2} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">Compre seu <span className="text-verde-padrao font-semibold">plano </span> e monte seu perfil!</span>
                            </div>
                        </div>
                        <div className="w-80 h-120 rounded-3xl drop-shadow-all">
                            <div className="h-[60%] w-full rounded-t-3xl bg-white py-12">
                                <img src={comoEnsinar3} alt="" />
                            </div>
                            <div className="h-[40%] w-full rounded-b-3xl bg-white py-14 px-6 text-center">
                                <span className="text-2xl font-medium">Receba solicitações de <span className="text-verde-padrao font-semibold">serviço (e ensino)</span>  e negocie pelo chat!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="overflow-hidden">
                <FooterWave />
            </footer>
        </>
    );
}