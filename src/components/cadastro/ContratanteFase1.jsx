import { useRef, useState } from "react";
import { UserIcon, EnvelopeIcon, IdentificationIcon, LockClosedIcon, ChevronDoubleRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import axios from "@/api/axios";
import CadastroProgress from "@/components/cadastro/CadastroProgress"
import Regex from "@/enum/RegexENUM";
import InputMask from "react-input-mask";
import { Oval } from "react-loader-spinner";

export default function CadastroStep1({ mudarStep, passarFase, isNextLoading }) {

	const [isNomeValidado, setIsNomeValidado] = useState();
	const [isEmailValidado, setIsEmailValidado] = useState();
	const [isCpfValidado, setIsCpfValidado] = useState();
	const [isTelefoneValidado, setIsTelefoneValidado] = useState();
	const [isSenhaValidado, setIsSenhaValidado] = useState();

	const nome_input = useRef(null);
	const email_input = useRef(null);
	const cpf_input = useRef(null);
	const telefone_input = useRef(null);
	const senha_input = useRef(null);

	const validar = {
		nome() {
			const nome = nome_input.current.value
			setIsNomeValidado(Regex.TEXT_SPACE.test(nome))
		},
		email() {
			const email = email_input.current.value
			setIsEmailValidado(Regex.EMAIL.test(email))
		},
		cpf() {
			const cpf = cpf_input.current.value.replace(Regex.NUMBER_REPLACEABLE, "")
			setIsCpfValidado(Regex.CPF.test(cpf))
		},
		telefone() {
			const telefone = String(telefone_input.current.value.replace(Regex.NUMBER_REPLACEABLE, "")).substring(2)
			setIsTelefoneValidado(Regex.PHONE.test(telefone))
		},
		senha() {
			const senha = senha_input.current.value
			setIsSenhaValidado(Regex.BETWEEN_8_AND_24.test(senha))
		}
	}

	const isEveryThingValidated = () => {
		return (
			isNomeValidado &&
			isEmailValidado &&
			isCpfValidado &&
			isTelefoneValidado &&
			isSenhaValidado
		)
	}

	const avancar = () => {

		if (isNextLoading) return;

		validar.nome()
		validar.email()
		validar.cpf()
		validar.telefone()
		validar.senha()

		passarFase(
			isEveryThingValidated(),
			{
				nome: nome_input.current.value,
				email: email_input.current.value,
				cpf: cpf_input.current.value.replace(Regex.NUMBER_REPLACEABLE, ''),
				telefone: String(telefone_input.current.value.replace(Regex.NUMBER_REPLACEABLE, '')).substring(2),
				senha: senha_input.current.value,
			}
		)
	}

	const pegarDadosPipefy = () => {
		axios.post("/cadastrar/prospect", {
			email: email_input.current.value,
			tipoUsuario: 1
		})
			.then((res) => {
				if (res.status === 200) {
					if (nome_input.current.value === "") {
						nome_input.current.value = res.data.nome
						validar.nome()
					}
					if (telefone_input.current.value === "") {
						if (res.data.telefone.length > 11) {
							telefone_input.current.value = res.data.telefone.substring(2)
						} else {
							telefone_input.current.value = res.data.telefone
						}
					}
					if (res.data.optCidade != null) {
						sessionStorage.setItem("optCidade", res.data.optCidade)
					}
				}
			})
	}

	return (
		<div className="bg-white h-full min-w-[70%] flex flex-col items-center">
			<CadastroProgress fase={1} fases={2} mudarStep={mudarStep} flagIsAtLeft={true} />
			<div className="w-full h-[70%] flex flex-col items-center justify-evenly">
				<div className="w-[60%] relative">
					<input
						onBlur={validar.nome}
						ref={nome_input}
						onChange={({ target }) => {
							target.value = target.value.replace(Regex.TEXT_SPACE_REPLACEABLE, "")
						}}
						maxLength={60}
						type="text"
						id="nome"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${isNomeValidado === false ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="nome"
						className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<UserIcon className="h-5 w-5 mr-1" />
						Nome completo
					</label>
					{isNomeValidado === false &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
				<div className="w-[60%] relative">
					<input
						onBlur={() => { validar.email(); pegarDadosPipefy() }}
						onChange={({ target }) => {
							target.value = target.value.replace(Regex.EMAIL_REPLACEABLE, "")
						}}
						ref={email_input}
						maxLength={256}
						type="email"
						id="email"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${isEmailValidado === false ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="email"
						className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<EnvelopeIcon className="h-5 w-5 mr-1" />
						Endereço de email
					</label>
					{isEmailValidado === false &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
				<div className="w-full flex items-center justify-center gap-[2%]">
					<div className="w-[29%] relative">
						<InputMask
							mask="999.999.999-99"
							onBlur={validar.cpf}
							ref={cpf_input}
							onChange={({ target: { value } }) => {
								cpf_input.current.value = value
							}}
							type="text"
							id="cpf"
							placeholder=" "
							className={`
								block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
								appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
								${isCpfValidado === false ? "border-red-500" : "border-cinza-claro-1"}
							`}
						/>
						<label
							htmlFor="cpf"
							className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
							<IdentificationIcon className="h-5 w-5 mr-1" />
							CPF
						</label>
						{isCpfValidado === false &&
							<label className="absolute ml-1 text-red-500 font-medium">
								Campo inválido
							</label>}
					</div>
					<div className="w-[29%] relative">
						<InputMask
							mask="+55 (99) 99999-9999"
							onBlur={validar.telefone}
							ref={telefone_input}
							onChange={({ target: { value } }) => {
								telefone_input.current.value = value
							}}
							type="text"
							id="telefone"
							placeholder=" "
							className={`
								block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
								appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
								${isTelefoneValidado === false ? "border-red-500" : "border-cinza-claro-1"}
							`}
						/>
						<label
							htmlFor="telefone"
							className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
							<PhoneIcon className="h-5 w-5 mr-1" />
							Telefone
						</label>
						{isTelefoneValidado === false &&
							<label className="absolute ml-1 text-red-500 font-medium">
								Campo inválido
							</label>}
					</div>
				</div>
				<div className="w-[60%] relative">
					<input
						onBlur={validar.senha}
						ref={senha_input}
						onKeyDown={({ key }) => {
							if (key !== "Enter") return;
							validar.senha()
							isEveryThingValidated() && avancar()
						}}
						maxLength={24}
						type="password"
						id="senha"
						placeholder=" "
						className={`
							block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2
							appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer
							${isSenhaValidado === false ? "border-red-500" : "border-cinza-claro-1"}
						`}
					/>
					<label
						htmlFor="senha"
						className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center">
						<LockClosedIcon className="h-5 w-5 mr-1" />
						Senha
					</label>
					{isSenhaValidado === false &&
						<label className="absolute ml-1 text-red-500 font-medium">
							Campo inválido
						</label>}
				</div>
			</div>
			<div className="w-full h-[15%] flex justify-end items-center">
				<button
					onClick={() => { isEveryThingValidated() && avancar() }}
					className={`${isEveryThingValidated() ? "text-verde-padrao cursor-pointer" : "text-gray-400 cursor-default"} text-xl mb-8 mr-11 font-bold flex justify-center items-center h-[40px]`}
				>
					{isNextLoading
						? <Oval
							height={40}
							color="#4fa94d"
							secondaryColor="#4fa94d"
							strokeWidth={4}
							strokeWidthSecondary={4}
						/>
						: <>
							Próximo <ChevronDoubleRightIcon className="h-8 w-8" />
						</>}
				</button>
			</div>
		</div>
	);
}
