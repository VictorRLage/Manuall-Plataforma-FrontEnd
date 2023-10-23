import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import lupaIcon from "@/assets/icons/lupa.png";
import axios from "@/api/axios";
import FooterWave from "@/assets/shapes/FooterWave.svg?react";
import Cards from "@/components/home/Cards";
import FiltragemENUM from "@/enum/FiltragemENUM";
import Breadcrumb from "@/components/main/Breadcrumb";
import SelectArrowIcon from "@/assets/icons/select_arrow_gray_600.svg";
import { useData } from "@/data/CreateContext";
import RegexENUM from "@/enum/RegexENUM";
import { useLocation } from "react-router-dom";

export default function Prestadores() {
    const { windowWidth } = useData();
    const { search } = useLocation();

    const [areas, setAreas] = useState();
    const [prestadores, setPrestadores] = useState();
    const [filteredPrestadores, setFilteredPrestadores] = useState();

    const [areaSelecionada, setAreaSelecionada] = useState(0);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Nota");
    const [ordemSelecionada, setOrdemSelecionada] = useState(false);

    const [searchbarText, setSearchbarText] = useState("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState();

    const getPrestadores = () => {
        setPrestadores();
        axios
            .get(
                `/usuario/prestadores/${areaSelecionada}/${filtroSelecionado}/${ordemSelecionada}`,
            )
            .then(({ data }) => {
                setPrestadores(data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get("/usuario/areas")
            .then(({ data }) => setAreas(data))
            .catch((err) => console.log(err));
        getPrestadores();

        setCidadeSelecionada(search.substring(8));
    }, []);

    useEffect(getPrestadores, [
        areaSelecionada,
        filtroSelecionado,
        ordemSelecionada,
    ]);

    useEffect(() => {
        setFilteredPrestadores(
            (cidadeSelecionada
                ? prestadores?.filter(
                      ({ cidade }) =>
                          cidade
                              .toLowerCase()
                              .replace(RegexENUM.LOCALELESS_TEXT_REPLACEABLE, "") ===
                          cidadeSelecionada,
                  )
                : prestadores
            )?.filter(({ nome }) =>
                nome
                    .toLowerCase()
                    .replace(RegexENUM.LOCALELESS_TEXT_REPLACEABLE, "")
                    .includes(
                        searchbarText
                            .toLowerCase()
                            .replace(RegexENUM.LOCALELESS_TEXT_REPLACEABLE, ""),
                    ),
            ),
        );
    }, [searchbarText, prestadores, cidadeSelecionada]);

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-[#fafafa]">
                <div
                    className={`px-32 pt-8 flex ${
                        windowWidth < 700 && "justify-center text-center"
                    }`}
                >
                    <Breadcrumb
                        items={[
                            { to: "/", desc: "Página Inicial" },
                            { to: null, desc: "Prestadores" },
                        ]}
                    />
                </div>
                <div className="w-full pt-8 px-32 gap-4 flex items-center justify-center flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="grow bg-no-repeat h-[50px] px-4 rounded-lg border-[1px] border-gray-600"
                        style={{
                            backgroundImage: `url(${lupaIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={searchbarText}
                        onChange={({ target }) =>
                            setSearchbarText(target.value)
                        }
                    />
                    <select
                        name="area"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={areaSelecionada}
                        onChange={({ target }) => {
                            setAreaSelecionada(target.value);
                        }}
                    >
                        <option value={0}>Todas as categorias</option>
                        {areas?.map(({ id, nome }) => (
                            <option key={id} value={id}>
                                {nome}
                            </option>
                        ))}
                    </select>
                    <select
                        name="filtro"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={filtroSelecionado}
                        onChange={({ target }) => {
                            setFiltroSelecionado(target.value);
                        }}
                    >
                        {FiltragemENUM.map(({ id, desc }) => (
                            <option key={id} value={id}>
                                Filtrar por {desc}
                            </option>
                        ))}
                    </select>
                    <select
                        name="ordem"
                        className="h-[50px] bg-transparent bg-no-repeat rounded-lg border-[1px] border-gray-600 pl-4 pr-12 appearance-none bg-white"
                        style={{
                            backgroundImage: `url(${SelectArrowIcon})`,
                            backgroundPosition: "right 16px top 50%",
                            backgroundSize: "20px",
                        }}
                        value={ordemSelecionada}
                        onChange={({ target }) => {
                            setOrdemSelecionada(target.value);
                        }}
                    >
                        <option value={true}>Crescente</option>
                        <option value={false}>Decrescente</option>
                    </select>
                </div>
                <div className="flex justify-center flex-col w-full">
                    <Cards areas={areas} prestadores={filteredPrestadores} />
                </div>
            </div>
            <footer className="overflow-hidden bg-[#fafafa]">
                <FooterWave />
            </footer>
        </div>
    );
}
