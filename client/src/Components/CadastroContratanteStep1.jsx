import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { IdentificationIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import  logo_extensa from '../assets/img/logo_manuall_extensa.png'

function CadastroStep1(props) {
    return (
      <div id="container" className="bg-white 2xl:h-144 2xl:w-288 xl:h-120 xl:w-240 self-center rounded-lg drop-shadow-all flex flex-row">
        <div id="container_esquerda" className="bg-white h-full w-70per rounded-l-lg flex flex-col gap-2 justify-center">
          <div id="container_steps" className="flex 2xl:h-16 xl:h-14 w-full justify-center items-center">
            <div id="step_1" className="bg-white border-4 border-verde-padrao rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10"></div>
            <div id="linha" className="bg-black h-1 2xl:w-14 xl:w-10"></div>
            <div id="step_2" className="bg-white border-2 border-black rounded-full 2xl:h-12 2xl:w-12 xl:h-10 xl:w-10 "></div>
          </div>
          <div id="container-inputs" className="2xl:h-96 2xl:w-144 xl:h-72 rounded-lg  self-center grid grid-cols-10x20 grid-rows-4 justify-center items-center gap-0 p-10">

            <label htmlFor="nome_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><UserIcon className='h-8 w-8 mr-3'/> Nome:</label>
            <input id="nome_inp" type="name" className="2xl:h-10 xl:h-9 2xl:w-80 xl:w-64 border-4 border-verde-padrao rounded-lg" />
            <label htmlFor="email_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><EnvelopeIcon className='h-8 w-8 mr-3'/> E-mail:</label>
            <input id="email_inp" type="email" className="2xl:h-10 xl:h-9 2xl:w-80 xl:w-64 border-4 border-verde-padrao rounded-lg" />
            <label htmlFor="cpf_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><IdentificationIcon className='h-8 w-8 mr-3'/> CPF:</label>
            <input id="cpf_inp" type="cpf" className="2xl:h-10 xl:h-9 2xl:w-80 xl:w-64 border-4 border-verde-padrao rounded-lg" />
            <label htmlFor="senha_inp" className="2xl:text-2xl xl:text-xl text-verde-padrao font-extrabold flex items-center"><LockClosedIcon className='h-8 w-8 mr-3'/> Senha:</label>
            <input id="senha_inp" type="password" className="2xl:h-10 xl:h-9 2xl:w-80 xl:w-64 border-4 border-verde-padrao rounded-lg" />

          </div>
          <div id="container_proximo" className="w-full h-10 flex justify-end">
            <button className="2xl:text-4xl xl:text-2xl mr-16 mt-8 font-semibold text-verde-padrao flex items-center">Próximo <ChevronDoubleRightIcon className='h-10 w-10'/></button>
          </div>

        </div>
        <div id="container_direita" className="bg-verde-padrao h-full w-30per rounded-r-lg flex flex-col">
            <img src={logo_extensa} alt="Logo da Manuall por extensa" className='2xl:w-60 xl:w-52 2xl:mt-12 xl:mt-10 self-center'/>
            <p className='2xl:text-4xl xl:text-2xl  font-bold text-white 2xl:w-48 xl:w-32 self-center 2xl:leading-relaxed 2xl:mt-10 xl:mt-8'>Cadastro de Contratante</p>
            <p className='2xl:text-2xl xl:text-xl  font-semibold text-white 2xl:w-55.5 xl:w-48 self-center 2xl:leading-relaxed 2xl:mt-32 xl:mt-32'>Já possui uma conta?</p>
            <button className='2xl:text-2xl xl:text-xl font-bold text-white underline'>Entre aqui</button>
            <button className='2xl:text-2xl xl:text-xl font-bold text-white self-center leading-relaxed 2xl:mt-12 xl:mt-10 flex items-center'> <ChevronDoubleLeftIcon className='h-10 w-10'/> Voltar à Tela inicial</button>
        </div>

    </div>
    );
}

export default CadastroStep1;