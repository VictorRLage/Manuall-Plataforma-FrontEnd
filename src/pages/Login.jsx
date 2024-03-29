import axios from "@/api/axios";
import CadastroBg from "@/assets/shapes/CadastroBg.svg";
import CadastroBottomBar from "@/components/cadastro/CadastroBottomBar";
import CadastroFlag from "@/components/cadastro/CadastroFlag";
import CadastroSidebar from "@/components/cadastro/CadastroSidebar";
import ModalEscolherTipoUsuario from "@/components/login/ModalEscolherTipoUsuario";
import ModalEsqueciSenha from "@/components/login/ModalEsqueciSenha";
import ModalAviso from "@/components/main/ModalAviso";
import ModalEscolherCadastro from "@/components/main/ModalEscolherCadastro";
import { useData } from "@/data/CreateContext";
import Regex from "@/enum/RegexENUM";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { windowWidth, setUserType } = useData();

    const [modalEscolherCadastro, setModalEscolherCadastro] = useState(false);
    const [modalEscolherTipoUsuario, setModalEscolherTipoUsuario] =
        useState(false);
    const [modalEsqueciSenha, setModalEsqueciSenha] = useState(false);
    const [modalAviso, setModalAviso] = useState(false);
    const [avisoTitulo, setAvisoTitulo] = useState("");
    const [avisoDescricao, setAvisoDescricao] = useState("");

    const [modalEscolherTipoUsuarioList, setModalEscolherTipoUsuarioList] =
        useState();

    const [tipoUsuario, setTipoUsuario] = useState(null);

    const email_input = useRef(null);
    const senha_input = useRef(null);

    const [loading, setLoading] = useState(false);

    const checarDuplicidadeEmail = () => {
        axios
            .post("/usuario/login/checar", {
                email: email_input.current.value,
            })
            .then(({ data, status }) => {
                if (status === 200) {
                    setTipoUsuario(null);
                } else if (status === 207) {
                    setModalEscolherTipoUsuario(true);
                    setModalEscolherTipoUsuarioList(data);
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro inesperado");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch(() => {
                setModalAviso(true);
                setAvisoTitulo("Erro inesperado");
                setAvisoDescricao("Por favor tente novamente mais tarde");
            });
    };

    const login = () => {
        setLoading(true);
        axios
            .post("/usuario/login/efetuar", {
                email: email_input.current.value,
                senha: senha_input.current.value,
                tipoUsuario,
            })
            .then(({ data, status }) => {
                if (status === 200) {
                    localStorage.TOKEN = data.token;
                    localStorage.TIPO_USUARIO = data.tipoUsuario;
                    setUserType(data.tipoUsuario);
                    localStorage.PLANO = data.plano;
                    if (data.tipoUsuario === 1) {
                        navigate("/prestadores?pagina=1");
                    } else if (data.tipoUsuario === 2) {
                        navigate("/perfil");
                    } else if (data.tipoUsuario === 3) {
                        navigate("/adm/aprovacao");
                    }
                } else if (status === 206) {
                    if (data.fase === 2) {
                        navigate(
                            data.tipoUsuario === 1
                                ? "/cadastro/contratante"
                                : "/cadastro/prestador",
                            { state: { id: data.idUsuario, fase: 2 } },
                        );
                    } else if (data.fase === 3) {
                        navigate("/cadastro/prestador", {
                            state: { id: data.idUsuario, fase: 3 },
                        });
                    } else if (data.fase === 4) {
                        localStorage.TOKEN = data.token;
                        localStorage.TIPO_USUARIO = data.tipoUsuario;
                        setUserType(data.tipoUsuario);
                        localStorage.PLANO = data.plano;
                        navigate("/cadastro/prestador/planos");
                    }
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro inesperado");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .catch(({ response: { data, status } }) => {
                if (status === 401) {
                    setModalAviso(true);
                    setAvisoTitulo("Credenciais inválidas");
                    setAvisoDescricao("Por favor tente novamente");
                } else if (status === 403) {
                    if (data.msg === "Aprovação negada") {
                        setModalAviso(true);
                        setAvisoTitulo(data.msg);
                        setAvisoDescricao(
                            "Infelizmente sua aprovação foi negada",
                        );
                    } else if (data.msg === "Aprovação pendente") {
                        setModalAviso(true);
                        setAvisoTitulo(data.msg);
                        setAvisoDescricao(
                            "Por favor aguarde até que a sua conta seja aprovada",
                        );
                    }
                } else {
                    setModalAviso(true);
                    setAvisoTitulo("Erro inesperado");
                    setAvisoDescricao("Por favor tente novamente mais tarde");
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${CadastroBg})`,
                backgroundSize: "100%",
            }}
        >
            <ModalEscolherTipoUsuario
                modalGettr={modalEscolherTipoUsuario}
                modalSettr={setModalEscolherTipoUsuario}
                contas={modalEscolherTipoUsuarioList}
                setarUsuario={setTipoUsuario}
            />
            <ModalEsqueciSenha
                modalGettr={modalEsqueciSenha}
                modalSettr={setModalEsqueciSenha}
            />
            <ModalAviso
                modalGettr={modalAviso}
                modalSettr={setModalAviso}
                tempo={5000}
                titulo={avisoTitulo}
                descricao={avisoDescricao}
            />
            <ModalEscolherCadastro
                modalGettr={modalEscolherCadastro}
                modalSettr={setModalEscolherCadastro}
            />
            <div className="flex max1000:flex-col bg-white h-full min550:h-[576px] w-full min550:w-[500px] min800:w-[700px] min950:w-[900px] min1000:w-[1000px] min1200:w-[1152px] min550:rounded-lg min550:drop-shadow-all overflow-y-scroll">
                {windowWidth > 1000 && (
                    <CadastroSidebar
                        isLogin
                        setModalEscolherCadastro={setModalEscolherCadastro}
                    />
                )}
                <div className="w-full min-h-[90%] min1000:min-h-full flex flex-col items-center justify-evenly">
                    {windowWidth > 800 && <CadastroFlag isFlagAtLeft={false} />}
                    <div className="w-full flex flex-col text-center gap-2">
                        <p className="text-verde-padrao font-extrabold text-4xl min550:text-5xl">
                            Bem-vindo de volta!
                        </p>
                        <p className="text-verde-padrao font-normal text-xl min550:text-2xl">
                            Acesse a sua conta agora mesmo.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full gap-10">
                        <div className="flex flex-col justify-center items-center w-full gap-8">
                            <div className="w-[70%] min550:w-[50%] relative">
                                <input
                                    onBlur={checarDuplicidadeEmail}
                                    onChange={({ target }) => {
                                        target.value = target.value.replace(
                                            Regex.EMAIL_REPLACEABLE,
                                            "",
                                        );
                                    }}
                                    ref={email_input}
                                    maxLength={256}
                                    type="email"
                                    id="email"
                                    placeholder=" "
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer transition-colors border-cinza-claro-1 hover:border-green-300"
                                />
                                <label
                                    htmlFor="email"
                                    className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"
                                >
                                    <EnvelopeIcon className="h-5 w-5 mr-1" />
                                    Endereço de email
                                </label>
                            </div>
                            <div className="w-[70%] min550:w-[50%] relative">
                                <input
                                    ref={senha_input}
                                    onKeyDown={({ key }) => {
                                        if (key !== "Enter") return;
                                        login();
                                    }}
                                    maxLength={24}
                                    type="password"
                                    id="senha"
                                    placeholder=" "
                                    className="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 appearance-none focus:outline-none focus:ring-0 focus:border-verde-padrao peer transition-colors border-cinza-claro-1 hover:border-green-300"
                                />
                                <label
                                    htmlFor="senha"
                                    className="cursor-text absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-verde-padrao peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 flex items-center"
                                >
                                    <LockClosedIcon className="h-5 w-5 mr-1" />
                                    Senha
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="flex justify-center mt-3">
                                <button
                                    onClick={login}
                                    className="w-[200px] h-[50px] flex items-center justify-center rounded-full text-2xl font-semibold text-white bg-verde-padrao hover:bg-green-400 transition-colors"
                                >
                                    {loading ? (
                                        <ThreeDots height="20" color="#fff" />
                                    ) : (
                                        "Entrar"
                                    )}
                                </button>
                            </div>
                            <div className="w-full flex justify-center">
                                <span
                                    className="text-center text-verde-padrao font-medium underline text-base cursor-pointer"
                                    onClick={() => {
                                        setModalEsqueciSenha(true);
                                    }}
                                >
                                    Esqueci minha senha
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {windowWidth <= 1000 && <CadastroBottomBar isLogin />}
            </div>
        </div>
    );
}
