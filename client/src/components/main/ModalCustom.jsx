import { useState, useEffect } from "react"

const ModalCustom = (props) => {

    const [lastTimeout, setLastTimeout] = useState(0)

    useEffect(() => {

        if (props.canClose) {
            clearTimeout(lastTimeout)

            setLastTimeout(
                setTimeout(() => {
                    props.modalSettr(false)
                }, props.tempo)
            )
        }

    }, [props.modalGettr]) // eslint-disable-line

    const closeModal = () => {
        if (props.canClose) {
            clearTimeout(lastTimeout)
            props.modalSettr(false)
        }
    }

    return (
        <div onClick={closeModal} style={{display: props.modalGettr ? "flex" : "none"}} className="fixed justify-center items-center h-screen w-screen bg-blur">
            <div className="bg-white flex flex-col justify-around items-center rounded-xl" style={{width: props.w, height: props.h}}>
                {props.children}
            </div>
        </div>
    )
}

export default ModalCustom