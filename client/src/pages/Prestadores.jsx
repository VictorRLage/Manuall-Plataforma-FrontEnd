import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import Header from "../components/main/Header";
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosConfig";
import Card from "../components/main/Card";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const slides = [
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
        {
            url: 'https://i.imgur.com/BQlaUcO.jpeg',
        },
    ];

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [areas, setAreas] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [botaoAtivo, setBotaoAtivo] = useState(0);
    const [reclick, setReclick] = useState(false);

    const mudarReclick = () => {
        setReclick(!reclick)
    }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const getAreas = () => {
        console.log("Buscando areas")
        axiosInstance.get("/usuario/areas", {
        }).then((res) => {
            setAreas(res.data)
        })
    }



    const getPrestadores = () => {
        console.log("Buscando todos prestadores")
        axiosInstance.get("/usuario/prestadores", {
        }).then((res) => {
            setPrestadores(res.data)
        })
    }

    const getPrestadoresByArea = (idArea) => {
        //console.log("Buscando todos prestadores")
        if (reclick) {
            getPrestadores()
            setBotaoAtivo(0)
        } else {
            axiosInstance.get(`/usuario/prestadores/${idArea}`, {
            }).then((res) => {
                setPrestadores(res.data)
                setBotaoAtivo(idArea)
            })
        }
    }

    useEffect(() => {
        getAreas()
        getPrestadores()
    }, [])

    useEffect(() => {
        const inputElement = document.getElementById("i_pesquisa");
        if (inputElement) {
            inputElement.addEventListener("keypress", handleKeyPress);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("keypress", handleKeyPress);
            }
        };
    }, []); // Make sure to add any dependencies if needed

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            teste();
        }
    };

    function teste() {
        alert("Testando");
    }

    return (
        <div>
            <Header pag={'prestadores'} />
            <div className='w-full h-full'>
                <div className="menuSuperior"><input id="i_pesquisa" type="text" placeholder="Buscar" /> <img className="imgLupa" src="https://img.freepik.com/icones-gratis/lupa_318-654446.jpg" />

                    <select name="dropdownCategoria" id="dropdownCategoria">
                        <option value="todas">Todas as categorias</option>
                    </select>

                    <select name="dropdownFiltro" id="dropdownFiltro">
                        <option value="todas">Filtrando por Relevância</option>
                    </select>
                </div>
                <span className="breadCrumbs"><a href="./inicio" className="breadcrumbAnterior">Página Inicial</a> / <a className="breadcrumbAtual">Prestadores</a></span>
                <div id="container_filtro_cards" className="flex justify-center flex-col w-full">
                    <div id="cards" className="px-16 mt-12 grid grid-cols-3 gap-20 self-center">
                        {
                            prestadores.map(function (data, i) {
                                return (
                                    <Card key={i} nome={data.nome} cidade={data.cidade} foto={data.anexoPfp} area={data.idArea} min={data.orcamentoMin} max={data.orcamentoMax} aula={data.prestaAula} mediaNota={data.mediaAvaliacoes} />
                                )
                            })
                        }

                    </div>

                </div>

            </div>
            <footer className="w-full relative">
                <svg width="1920" height="288" viewBox="0 0 1920 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_701_17813)">
                        <path d="M0 352C0 365.807 10.8338 377 24.6409 377C168.22 377 907.084 377 1387 377C1733.96 377 1858.45 377 1903.09 377C1916.89 377 1928 365.807 1928 352V0.5V0.5C1928 12.575 1918.74 22.5535 1906.69 23.2898C1769.2 31.6889 1001.18 79.8099 618.065 129.441C249.565 177.178 53.1672 59.4728 9.44733 28.9888C3.32833 24.7222 0 17.6802 0 10.2206V4.49988V352Z" fill="#008042" />
                    </g>
                    <defs>
                        <filter id="filter0_d_701_17813" x="-4" y="0.5" width="1936" height="384.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_17813" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_17813" result="shape" />
                        </filter>
                    </defs>
                </svg>

            </footer>
        </div>
    );
}

export default Home