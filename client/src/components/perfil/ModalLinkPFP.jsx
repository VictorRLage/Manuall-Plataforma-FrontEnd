import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import axios from "axios";

export default function ModalLink(props) {

    const [urlImagem, setUrlImagem] = useState('');

    const alterarFtPerfil = () => {
       axios.patch(`/perfil/alterar/fotoPerfil`, {profile: urlImagem})
        .then((res) => {
            console.log(res)
        });
    }

    return (
        <div className='z-50 fixed h-screen w-screen top-0 bg-blur flex justify-center items-center'>
            <div className='relative h-42 w-120 bg-white rounded-lg flex flex-col items-center p-6'>
                <div onClick={() => { props.modal() }} className='cursor-pointer absolute top-0 right-0'>
                    <XCircleIcon className='w-9 h-9 text-verde-padrao' />
                </div>
                <span className='text-3xl font-semibold text-center'>Insira o URL da imagem.</span>
                <div className=' flex  items-center gap-4'>
                    <div class="mb-6">
                        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default input</label>
                        <input type="text" id="inputUrlImg" onChange={(e) => setUrlImagem(e.target.value)} className="bg-gray-50  border-cinza-claro-3 border-2 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " />
                    </div>
                    <button onClick={alterarFtPerfil()} className='w-24 h-10 text-xl bg-verde-padrao rounded-full text-white'>Enviar</button>
                </div>
            </div>
        </div>
    );
}