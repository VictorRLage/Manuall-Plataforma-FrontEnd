import { UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react"
import { MapIcon, MapPinIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon, BuildingLibraryIcon, HashtagIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import axiosInstance from '../../api/AxiosConfig'



function CadastroPrestadorStep3(props) {

    const [areas, setAreas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [mapArea, setMapArea] = useState(false);
    const [mapServico, setMapServico] = useState(false);
    const [selectedArea, setSelectedArea] = useState(0);
    const [dropDown, setdropDown] = useState(false);

    const mudarDropDown = () => {
        setdropDown(!dropDown);
    };

    const mudarSelectedArea = (e) => {
        setSelectedArea(e.target.value);
    };

    const getAreas = () => {
        console.log("Buscando areas")
        axiosInstance.get("/usuarios/cadastrar/3/prestador/areas", {
        }).then((res) => {
            setAreas(res.data)
            setMapArea(true)
        })

    }

    const getServicos = (props) => {
        console.log("Buscando servicos")
        axiosInstance.get('/usuarios/cadastrar/3/prestador/buscarServicos/' + selectedArea, {
        }).then((res) => {
            setServicos(res.data)
            setMapServico(true)
        })
    }

    return (
        <div className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all">
            <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center 2xl:mt-8 xl:mt-6">
                <div id="step_1" className="bg-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
                <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                <div id="step_2" className="bg-verde-padrao border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
                <div id="linha" className="bg-verde-padrao h-1 2xl:w-14 xl:w-10"></div>
                <div id="step_3" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
            </div>
            <div className='grid grid-cols-24x24 gap-x-10 gap-y-6 justify-center mt-6'>
                <div className='relative'>
                    <div className="relative inline-block w-full">
                        <select id='select_inp' onChange={mudarSelectedArea} onFocus={getAreas} className="cursor-pointer block appearance-none w-full text-xl font-bold h-14 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option id='null_opt' key='0' value='0' >Selecione sua area de atuação.</option>
                            {mapArea ? areas.map(function (data) {
                                return (
                                    <option key={data.id} id={data.nome} value={data.id}>{data.nome}</option>
                                )
                            }
                            ) : null}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w8-" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <div className='relative'>
                    <div className="relative inline-block">
                        <button id='drop_down_servico' onFocus={getServicos} onClick={mudarDropDown} className="cursor-pointer flex items-center appearance-none w-full text-xl font-bold h-14 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <span className=''>Selecione os serviços que você presta.</span>
                        </button>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {dropDown ? <button onClick={() => { setdropDown(false) }} className='z-40 fixed h-full w-full top-0 left-0 right-0 bottom-0 cursor-default'></button> : null}
                    {dropDown ? <div id='drop_drown_servico' className='z-50 absolute w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                        {mapServico ? servicos.map(function (data) {
                            return (
                                <div className="block min-h-6">
                                    <label className='flex items-center'>
                                        <input id={data.id} className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                        <label htmlFor={data.id} className="cursor-pointer select-none text-slate-700 ml-2 text-xl">{data.nome}</label>
                                    </label>
                                </div>
                            )
                        }
                        ) : null}
                    </div> : null}
                </div>

                <div className='relative col-span-2 flex flex-col'>
                    <p className='text-4xl font-semibold'>Deseja ensinar? <span className='text-xl font-normal text-slate-500 '>*você irá encinar enquanto executa seu serviço.</span></p>
                    <div className='flex flex-row mt-6 justify-between'>
                        <div className="block min-h-6">
                            <label className='flex items-center'>
                                <input id='1' className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                <label htmlFor='1' className="cursor-pointer select-none text-slate-700 ml-2 text-2xl">Sim, quero ensinar também.</label>
                            </label>
                        </div>
                        <div className="block min-h-6">
                            <label className='flex items-center'>
                                <input id='2' className="w-5 h-5 ease-soft text-base rounded-md  checked:bg-verde-padrao after:text-base relative cursor-pointer appearance-none border-2 border-solid checked:outline outline-offset-2 outline-2 outline-verde-padrao border-slate-400 bg-white  after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-[''] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
                                <label htmlFor='2' className="cursor-pointer select-none text-slate-700 ml-2 text-2xl">Não, quero apenas executar.</label>
                            </label>
                        </div>
                    </div>
                </div>

                <div className='relative col-span-2 flex flex-col'>
                    <p className='text-2xl font-semibold'>Qual a faixa de preço dos seus serviços? <span className='text-xl font-normal text-slate-500 '>*caso ensinar, considere o valor de aula também.</span></p>
                    <div className='flex flex-row mt-6 justify-between'>
                        <div className="relative w-96">
                            <input type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="complemento_inp" className="absolute xl:text-lg 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                        </div>
                        <div className="relative w-96">
                            <input type="text" id="complemento_inp" className="block px-2.5 pb-2.5 pt-4 w-full 2xl:text-sm xl:text-xs text-gray-900 bg-transparent rounded-lg border-2 border-cinza-claro-1 appearance-none  focus:outline-none focus:ring-0 focus:border-verde-padrao peer" placeholder=" " />
                            <label htmlFor="complemento_inp" className="absolute xl:text-xl 2xl:text-xl text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"><HashtagIcon className='2xl:h-6 2xl:w-6 xl:h-5 xl:w-5 mr-1' />Complemento</label>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default CadastroPrestadorStep3;