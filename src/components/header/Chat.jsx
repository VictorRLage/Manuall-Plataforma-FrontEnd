import axios from "@/api/axios";
import Arrow from "@/assets/icons/arrow.svg";
import ArrowHead from "@/assets/icons/arrowhead.svg";
import BlueCheckmark from "@/assets/icons/blue_checkmark.svg";
import BotCertification from "@/assets/icons/checkmark_bot.svg";
import GrayCheckmark from "@/assets/icons/gray_checkmark.svg";
import NoChatsIcon from "@/assets/icons/no_chats_icon.png";
import Manuel from "@/assets/manuall/manuel_pfp.png";
import ChatManuel from "@/components/header/ChatManuel";
import ChatUsuario from "@/components/header/ChatUsuario";
import ModalChatUrlMensagem from "@/components/header/ModalChatUrlMensagem";
import { useData } from "@/data/CreateContext";
import { defer } from "@/utils/functions";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

export default function Chat({
    forceChatOpen,
    redefineForceChatOpen,
    forceChatRefetch,
}) {
    const { userType, windowWidth } = useData();

    const btnFecharConversa = useRef(null);
    const imgBtnFecharConversa = useRef(null);
    const scrollingDiv = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [manuelMsgs, setManuelMsgs] = useState();
    const [dadosUsuarioCrm, setDadosUsuarioCrm] = useState();
    const [conversas, setConversas] = useState();
    const [chatAtual, setChatAtual] = useState();
    const chatAtualRef = useRef(chatAtual);
    chatAtualRef.current = chatAtual;

    const [userId, setUserId] = useState();
    const [stompClient, setStompClient] = useState(null);

    const [mensagem, setMensagem] = useState("");
    const [anexo, setAnexo] = useState("");
    const [tempId, setTempId] = useState(0);

    const [chatUrlMensagem, setChatUrlMensagem] = useState(false);

    const alternarChat = (e) => {
        if (
            e.target !== (btnFecharConversa && btnFecharConversa.current) &&
            e.target !== (imgBtnFecharConversa && imgBtnFecharConversa.current)
        ) {
            setIsOpen(!isOpen);
        }
    };

    const selecionarChat = (conversa, isManuel = false) => {
        if (isManuel) {
            setChatAtual({
                name: "Manuel",
                isManuel: true,
                mensagens: [],
                msgsFlow: manuelMsgs,
                dadosUsuarioCrm,
            });

            scrollDown();
        } else {
            if (conversa.mensagens) {
                for (let i = 0; i < conversa.mensagens.length; i++) {
                    const mensagemAtual = conversa.mensagens[i];

                    if (
                        mensagemAtual.selfSender === false &&
                        mensagemAtual.visto === false
                    ) {
                        stompClient.send(
                            "/app/visualizar",
                            {},
                            JSON.stringify({
                                token: localStorage.getItem("TOKEN"),
                                mensagemId: mensagemAtual.id,
                            }),
                        );
                    }
                }
            }
            setChatAtual({
                isManuel: false,
                name: conversa.usuarioNome,
                mensagens: conversa.mensagens,
                pfp: conversa.usuarioPfp,
                solicitacaoId: conversa.solicitacaoId,
            });

            scrollDown();
        }
    };

    const orderConversas = (conversas) => {
        const newConversas = [...conversas];

        newConversas.sort((a, b) => {
            const requiredDateA =
                a.mensagens?.length > 0
                    ? a.mensagens?.[a.mensagens.length - 1]?.horario
                    : a.dataInicio;

            const requiredDateB =
                b.mensagens?.length > 0
                    ? b.mensagens?.[b.mensagens.length - 1]?.horario
                    : b.dataInicio;

            return (
                new Date(requiredDateB).getTime() -
                new Date(requiredDateA).getTime()
            );
        });

        setConversas(newConversas);
    };

    const fetch = (openSocketConnection = false) => {
        axios
            .get("/chat")
            .then((res) => {
                if (res.status === 200 || res.status === 204) {
                    orderConversas(res.data);

                    if (!openSocketConnection) return;
                    axios
                        .get("/usuario/id")
                        .then(({ data }) => {
                            const sock = new SockJS(
                                `${import.meta.env.VITE_APP_MAIN_API_URL}/ws`,
                            );
                            const stomp = over(sock);
                            stomp.debug = () => {};

                            setUserId(data);
                            setStompClient(stomp);
                        })
                        .catch(console.log);
                }
            })
            .catch((err) => console.error(err));
    };

    const scrollDown = async () => {
        await defer();
        if (scrollingDiv.current) {
            scrollingDiv.current.scrollTop = scrollingDiv.current.scrollHeight;
        }
    };

    const getDadosCrm = () => {
        axios
            .get("/crm")
            .then(({ data }) => setManuelMsgs(data))
            .catch(() => setManuelMsgs(true));
    };

    useEffect(() => {
        getDadosCrm();
        userType &&
            axios
                .get(`/crm/dados/${userType}`)
                .then(({ data }) => setDadosUsuarioCrm(data))
                .catch((err) => {
                    console.log(err);
                    setDadosUsuarioCrm(true);
                });

        fetch(true);
    }, []);

    useEffect(() => {
        stompClient?.connect({}, () => {
            stompClient.subscribe(`/mensagem/${userId}`, ({ body }) => {
                setMensagem("");
                const msg = JSON.parse(body);
                if (!conversas) return;
                const newConversas = [...conversas];
                for (let i = 0; i < newConversas?.length; i++) {
                    if (newConversas[i].solicitacaoId === msg.solicitacaoId) {
                        if (msg.selfSender) {
                            for (
                                let j = 0;
                                j < newConversas[i].mensagens?.length;
                                j++
                            ) {
                                if (
                                    newConversas[i].mensagens[j].tempId ===
                                    msg.tempId
                                ) {
                                    newConversas[i].mensagens[
                                        j
                                    ].loading = false;
                                    newConversas[i].mensagens[j].id = msg.id;
                                    break;
                                }
                            }
                        } else {
                            if (
                                newConversas[i].solicitacaoId ===
                                chatAtualRef.current?.solicitacaoId
                            ) {
                                stompClient.send(
                                    "/app/visualizar",
                                    {},
                                    JSON.stringify({
                                        token: localStorage.getItem("TOKEN"),
                                        mensagemId: msg.id,
                                    }),
                                );
                            }
                            newConversas[i].mensagens.push(msg);
                        }
                        break;
                    }
                }
                orderConversas(newConversas);
                scrollDown();
            });
            stompClient.subscribe(`/visualizacao/${userId}`, ({ body }) => {
                const msg = JSON.parse(body);
                if (!conversas) return;
                const newConversas = [...conversas];
                for (let i = 0; i < newConversas?.length; i++) {
                    if (newConversas[i].solicitacaoId === msg.solicitacaoId) {
                        for (
                            let j = 0;
                            j < newConversas[i].mensagens?.length;
                            j++
                        ) {
                            if (newConversas[i].mensagens[j].id === msg.id) {
                                newConversas[i].mensagens[j].visto = true;
                                break;
                            }
                        }
                        break;
                    }
                }
                orderConversas(newConversas);
            });
        });

        return () => {
            if (stompClient?.connected) stompClient.disconnect();
        };
    }, [stompClient]);

    const sendMessage = () => {
        if (!mensagem) return;

        const curTempId = tempId;

        setTempId(tempId + 1);

        const mensagemAtual = {
            mensagem,
            anexo,
            solicitacaoId: chatAtual.solicitacaoId,
            token: localStorage.getItem("TOKEN"),
            tempId: curTempId,
        };
        stompClient.send("/app/chat", {}, JSON.stringify(mensagemAtual));
        const newConversas = [...conversas];
        for (let i = 0; i < newConversas?.length; i++) {
            if (newConversas[i].solicitacaoId === mensagemAtual.solicitacaoId) {
                newConversas[i].mensagens.push({
                    ...mensagemAtual,
                    visto: false,
                    selfSender: true,
                    horario: new Date().toString(),
                    loading: true,
                });
                break;
            }
        }
        orderConversas(newConversas);
        scrollDown();
    };

    useEffect(() => {
        if (forceChatOpen !== undefined) {
            for (let i = 0; i < conversas?.length; i++) {
                if (forceChatOpen === null) {
                    setIsOpen(true);
                    setChatAtual(undefined);
                    break;
                } else if (conversas[i].solicitacaoId === forceChatOpen) {
                    selecionarChat(conversas[i]);
                    setIsOpen(true);
                    break;
                }
            }
        }
    }, [forceChatOpen]);

    useEffect(fetch, [forceChatRefetch]);

    useEffect(() => {
        redefineForceChatOpen();
    }, [isOpen]);

    if (windowWidth <= 600 && !isOpen) return <></>;

    return (
        <>
            <ModalChatUrlMensagem
                modalGettr={chatUrlMensagem}
                modalSettr={setChatUrlMensagem}
                mensagem={{ mensagem, setMensagem }}
                anexo={{ anexo, setAnexo }}
                enviar={sendMessage}
            />
            <div
                className="fixed z-40 min600:right-8 max600:flex max600:flex-col max600:h-full w-full min600:w-[350px] transition-all"
                style={{ bottom: isOpen ? "0" : "-400px" }}
            >
                <div
                    onClick={alternarChat}
                    className="bg-verde-escuro-1 h-[50px] min600:rounded-t-lg flex items-center justify-between px-4 cursor-pointer hover:bg-verde-escuro-2 transition-all"
                >
                    <div className="flex justify-center items-center">
                        {chatAtual && (
                            <button
                                ref={btnFecharConversa}
                                onClick={() => {
                                    setChatAtual(undefined);
                                    getDadosCrm();
                                }}
                                className="w-8 h-8 p-1 flex justify-center items-center rotate-180 hover:bg-verde-escuro-1 transition-all rounded-full"
                            >
                                <img
                                    ref={imgBtnFecharConversa}
                                    className="transition-all"
                                    src={Arrow}
                                    alt=""
                                />
                            </button>
                        )}
                        <span
                            className="text-white font-bold text-xl"
                            style={{ paddingLeft: chatAtual ? "4px" : "0" }}
                        >
                            {chatAtual?.name || "Conversas"}
                        </span>
                    </div>
                    <div className="w-8 h-8 p-1 flex justify-center items-center">
                        <img
                            className="transition-all h-4"
                            style={{ rotate: isOpen ? "180deg" : "360deg" }}
                            src={ArrowHead}
                            alt=""
                        />
                    </div>
                </div>
                {chatAtual ? (
                    <>
                        <div
                            ref={scrollingDiv}
                            className={`bg-gray-100 flex flex-col overflow-y-auto py-2 scroll-smooth ${
                                chatAtual.isManuel
                                    ? "max600:grow min600:h-[400px]"
                                    : "max600:grow min600:h-[360px]"
                            }`}
                        >
                            {chatAtual.isManuel ? (
                                <ChatManuel
                                    chat={chatAtual}
                                    scrollDown={scrollDown}
                                />
                            ) : (
                                <ChatUsuario chat={chatAtual} />
                            )}
                        </div>
                        {!chatAtual.isManuel && (
                            <div className="bg-gray-100 h-[40px] flex items-center justify-between px-1 gap-2 border-2 border-t-gray-200 relative">
                                <button
                                    className="h-[30px] min-w-[30px] flex items-center justify-center p-[6px] bg-[#008042] hover:bg-green-800 transition-colors rounded-full cursor-pointer"
                                    onClick={() => setChatUrlMensagem(true)}
                                >
                                    <PhotoIcon className="text-white" />
                                </button>
                                <input
                                    className="bg-gray-200 h-[30px] w-full rounded-xl px-1 focus:border-[2px] border-verde-escuro-1 outline-none"
                                    placeholder="Digite sua mensagem aqui"
                                    value={mensagem}
                                    onChange={({ target }) =>
                                        setMensagem(target.value)
                                    }
                                    onKeyDown={({ key }) => {
                                        if (key === "Enter") sendMessage();
                                    }}
                                    maxLength={150}
                                />
                                <button
                                    className="h-[30px] min-w-[30px] flex items-center justify-center p-[6px] bg-[#008042] hover:bg-green-800 transition-colors rounded-full cursor-pointer"
                                    onClick={sendMessage}
                                >
                                    <PaperAirplaneIcon className="text-white" />
                                </button>
                            </div>
                        )}
                    </>
                ) : conversas !== undefined && manuelMsgs && dadosUsuarioCrm ? (
                    <div className="bg-gray-100 max600:grow min600:h-[400px] flex flex-col overflow-y-auto">
                        {typeof manuelMsgs !== "boolean" &&
                        typeof dadosUsuarioCrm !== "boolean" ? (
                            <div
                                onClick={() => {
                                    selecionarChat(undefined, true);
                                }}
                                className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                            >
                                <div className="w-full h-full flex items-center border-b-2 border-gray-200">
                                    <img
                                        src={Manuel}
                                        className="w-10 rounded-full"
                                        alt=""
                                    />
                                    <span className="p-2">Manuel</span>
                                    <img
                                        src={BotCertification}
                                        className="w-5"
                                        alt=""
                                    />
                                </div>
                            </div>
                        ) : (
                            conversas === "" &&
                            conversas?.length === 0 && (
                                <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-8">
                                    <img
                                        src={NoChatsIcon}
                                        className="w-[40%]"
                                        alt=""
                                    />
                                    <span className="text-lg text-center max-w-[80%] font-bold">
                                        Você não possui solicitações ativas no
                                        momento
                                    </span>
                                </div>
                            )
                        )}
                        {conversas !== "" &&
                            (conversas?.length === 0 ? (
                                <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-8">
                                    <img
                                        src={NoChatsIcon}
                                        className="w-[40%]"
                                        alt=""
                                    />
                                    <span className="text-lg text-center max-w-[80%] font-bold">
                                        Você não possui solicitações ativas no
                                        momento
                                    </span>
                                </div>
                            ) : (
                                conversas?.map((conversa) => (
                                    <div
                                        onClick={() => {
                                            selecionarChat(conversa);
                                        }}
                                        className="w-full min-h-[60px] px-4 cursor-pointer hover:bg-gray-100 transition-all"
                                        key={conversa.solicitacaoId}
                                    >
                                        <div className="w-full h-full flex items-center border-b-2 border-gray-200 relative">
                                            {userType === 1 && (
                                                <img
                                                    src={conversa.usuarioPfp}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    alt=""
                                                />
                                            )}
                                            <div className="px-2 flex flex-col">
                                                <span className="font-medium">
                                                    {conversa.usuarioNome}
                                                </span>
                                                <span className="text-gray-600 flex items-center gap-1">
                                                    {(() => {
                                                        const ultimaMensagem =
                                                            conversa
                                                                .mensagens?.[
                                                                conversa
                                                                    .mensagens
                                                                    .length - 1
                                                            ];
                                                        return ultimaMensagem?.mensagem ? (
                                                            <>
                                                                {ultimaMensagem.selfSender &&
                                                                    (ultimaMensagem.visto ? (
                                                                        <img
                                                                            src={
                                                                                BlueCheckmark
                                                                            }
                                                                            className="h-[8px] opacity-70"
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={
                                                                                GrayCheckmark
                                                                            }
                                                                            className="h-[8px] opacity-70"
                                                                            alt=""
                                                                        />
                                                                    ))}
                                                                {
                                                                    ultimaMensagem.mensagem
                                                                }
                                                            </>
                                                        ) : (
                                                            "Inicie a conversa já!"
                                                        );
                                                    })()}
                                                </span>
                                            </div>
                                            {conversa.mensagens.length > 0 &&
                                                conversa.mensagens[
                                                    conversa.mensagens.length -
                                                        1
                                                ].selfSender === false &&
                                                conversa.mensagens[
                                                    conversa.mensagens.length -
                                                        1
                                                ].visto === false && (
                                                    <div className="h-6 w-6 rounded-full bg-red-600 text-white absolute right-2 flex items-center justify-center text-center">
                                                        {
                                                            conversa.mensagens.filter(
                                                                (m) =>
                                                                    m.selfSender ===
                                                                        false &&
                                                                    m.visto ===
                                                                        false,
                                                            ).length
                                                        }
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))
                            ))}
                    </div>
                ) : (
                    <div className="bg-white max600:grow min600:h-[400px] flex justify-center items-center">
                        <Oval
                            height={50}
                            color="#00cc69"
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#00cc69"
                            strokeWidth={1}
                            strokeWidthSecondary={4}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
