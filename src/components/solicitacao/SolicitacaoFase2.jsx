import SelectArrowIcon from "@/assets/icons/select_arrow.svg";
import SentMessage from "@/assets/storyset/SentMessage.svg";
import MedidasTamanhoENUM from "@/enum/MedidasTamanhoENUM";
import Regex from "@/enum/RegexENUM";
import { Dropdown } from "primereact/dropdown";
import { useData } from "@/data/CreateContext";

export default function SolicitacaoFase2({
    tamanho: { tamanho, setTamanho },
    medida: { medida, setMedida },
    setIsEveryThingValidated,
}) {
    const { windowWidth } = useData();

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 w-[275px]">
                <input
                    placeholder="Tamanho"
                    className="w-full text-lg text-[rgb(55,65,81)] border-cinza-claro-1 border-2 rounded-lg focus:outline-none focus:ring-0 focus:border-[#90cd93] p-2 transition-colors"
                    value={tamanho}
                    onChange={({ target }) => {
                        const newValue = target.value.replace(
                            Regex.NUMBER_REPLACEABLE,
                            "",
                        );
                        setTamanho(newValue);
                        setIsEveryThingValidated(newValue && true);
                    }}
                    maxLength={10}
                />
                <Dropdown
                    value={medida}
                    onChange={({ value }) => {
                        setMedida(value);
                    }}
                    options={MedidasTamanhoENUM}
                    dropdownIcon="disabled"
                    className="p-1 w-full bg-white rounded-lg border-2 border-cinza-claro-1 appearance-none
                            bg-no-repeat focus:outline-none focus:ring-0 focus:border-verde-padrao peer"
                    style={{
                        backgroundImage: `url(${SelectArrowIcon})`,
                        backgroundPosition: "right 0.7rem top 50%",
                        backgroundSize: "20px",
                    }}
                />
            </div>
            {windowWidth > 1100 && (
                <img
                    src={SentMessage}
                    alt="Ícone de rapaz enviando arquivo"
                    className="w-[200px] absolute -bottom-[20px] left-0"
                />
            )}
        </>
    );
}
