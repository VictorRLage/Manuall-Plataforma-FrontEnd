import { StarIcon as StarIconCheio } from "@heroicons/react/24/solid";
import { StarIcon as StarIconVazio } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import defaultPfp from "@/assets/demo/default_pfp.jpg";
import ImageAddIcon from "@/assets/icons/image_add.png";

export default function PerfilCard({ isOwnProfile, prestador }) {
    const mediaAvaliacoes =
        prestador?.avaliacoes.reduce((acc, { nota }) => acc + nota, 0) /
        prestador?.avaliacoes.length;

    const estrelas = Array.from({ length: 5 }, (_, i) => {
        const estrela = i + 1;
        return mediaAvaliacoes >= estrela ? (
            <StarIconCheio key={estrela} className="w-6 h-6 text-yellow-500" />
        ) : (
            <StarIconVazio key={estrela} className="w-6 h-6 text-yellow-500" />
        );
    });

    return (
        <div>
            <div className="flex flex-col items-center p-5 bg-white w-84 drop-shadow-all rounded-lg">
                {prestador?.pfp ? (
                    <div
                        className="bg-cover bg-center bg-no-repeat h-30 w-30 rounded-3xl relative"
                        style={{
                            backgroundImage: `url(${prestador?.pfp}), url(${defaultPfp})`,
                        }}
                    >
                        {isOwnProfile && (
                            <button
                                onClick={() => setModalLinkPFP(true)}
                                className="absolute bg-verde-padrao text-center w-8 h-8 rounded-full -right-1 -top-1"
                            >
                                <PencilSquareIcon className="text-white h-[1.25rem] w-[1.25rem] m-auto" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={() => setModalLinkPFP(true)}
                        className="cursor-pointer bg-center bg-no-repeat h-30 w-30 rounded-3xl border-verde-padrao border-4"
                        style={{
                            backgroundImage: `url(${ImageAddIcon})`,
                            backgroundSize: "80%",
                        }}
                    />
                )}
                <span className="mt-2 font-bold m-auto text-3xl">
                    {prestador?.nome}
                </span>
                <div className="flex m-auto mt-2">
                    {estrelas}
                    <span className="text-lg ml-2">
                        {mediaAvaliacoes.toFixed(1)}
                    </span>
                </div>
                <span className="m-auto text-cinza-claro-3">
                    {prestador?.avaliacoes.length} avaliações
                </span>
                <div className="grid grid-cols-2 text-lg mt-1 m-auto space-y-1">
                    <span>Preço</span>
                    <span>
                        R${prestador?.orcamentoMin} - R$
                        {prestador?.orcamentoMax}
                    </span>
                    <span>Cidade</span>
                    <span>{prestador?.estado}</span>
                    <span>Estado</span>
                    <span>{prestador?.cidade}</span>
                </div>
                {!isOwnProfile &&
                    (prestador?.prestaAula ? (
                        <>
                            <button className="bg-verde-padrao text-white px-6 py-2 text-xl mt-6 m-auto rounded-full">
                                Contratar com aula
                            </button>
                            <button className="text-verde-padrao px-6 py-2 text-lg mt-2 m-auto">
                                Contratar apenas serviço
                            </button>
                        </>
                    ) : (
                        <button className="bg-verde-padrao text-white px-6 py-2 text-2xl mt-6 m-auto rounded-full">
                            Contratar
                        </button>
                    ))}
            </div>
        </div>
    );
}
