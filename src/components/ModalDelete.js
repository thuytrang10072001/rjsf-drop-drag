import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function ModalDelete(props) {
    const {isOpen, setIsOpen, secDel, removeAction} = props;

    let subtitle;
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button data-bs-dismiss="modal"
                        className="swal2-close"
                        aria-label="Close this dialog"
                        onClick={closeModal}>×
                </button>
                <div className="swal2-header">
                    <ul className="swal2-progress-steps" style={{display: 'none'}}></ul>
                    <div className="swal2-icon swal2-warning swal2-icon-show" style={{display: 'flex'}}>
                        <div className="swal2-icon-content">!</div>
                    </div>
                    <img className="swal2-image" style={{display: 'none'}}/>
                    <h2 className="swal2-title"
                        id="swal2-title"
                        style={{display: 'flex'}}>Bạn có chắc chắn ?</h2>
                    <button data-bs-dismiss="modal" className="swal2-close" aria-label="Close this dialog"
                            style={{display: 'none'}}>×
                    </button>
                </div>
                <div className="swal2-content">
                    <div id="swal2-content" className="swal2-html-container" style={{display: 'block'}}>Bạn sẽ không
                        thể phục hồi hành động này.
                    </div>
                </div>
                <div className="swal2-actions">
                    <div className="swal2-loader"></div>
                    <button type="button" className="swal2-confirm swal2-styled"
                            onClick={() => {removeAction(secDel); closeModal()}}

                    >Có
                    </button>
                    <button type="button" className="swal2-cancel swal2-styled" data-bs-dismiss="modal"
                            style={{display: 'inline-block', backgroundColor: 'rgb(221, 51, 51)'}}
                            onClick={closeModal}>Không
                    </button>
                </div>
            </Modal>
        </div>
    );
}

