import { ModalMetaData } from "../types"

type DeleteModalProps = {
    active: boolean
    setModalActive: (v: boolean) => void
    metaData: ModalMetaData
    deleteItem: () => void
}

const DeleteModal = (props: DeleteModalProps) => {
    const { active, setModalActive, metaData, deleteItem } = props

    return (
        <div className={`modal ${active ? "is-active" : ""}`} >
        <div className="modal-background"></div>
        <div className="modal-card" >
            <header className="modal-card-head">
            <p className="modal-card-title">DELETE {metaData.type.toUpperCase()}</p>
            </header>
            <section className="modal-card-body">
                This action will delete the {metaData.name} (id: {metaData.id}) {metaData.type.toLowerCase()}.
            </section>
            <footer className="modal-card-foot">
            <div className="buttons">
                <button className="button is-danger"
                onClick={() => deleteItem()}>DELETE</button>
                <button className="button"
                onClick={() => setModalActive(false)}>Cancel</button>
            </div>
            </footer>
        </div>
        </div>
    )
}

export default DeleteModal