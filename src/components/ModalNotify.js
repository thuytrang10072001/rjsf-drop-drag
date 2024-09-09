import { useState, useEffect, useCallback } from 'react';

export default function ModalNotify(props){
    return (
        <div className="modal fade" id="modalNotify" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content pt-2 pb-2" >
                    <div className="swal2-header">
                        <ul className="swal2-progress-steps" style={{display: 'none'}}></ul>
                        <div className="swal2-icon swal2-warning swal2-icon-show" style={{display: 'flex'}}>
                            <div className="swal2-icon-content">!</div>
                        </div>
                        <img className="swal2-image" style={{ display: 'none' }}/>
                        <h2 className="swal2-title"
                            id="swal2-title"
                            style={{ display: 'flex'}}>Bạn có chắc chắn ?</h2>
                        <button data-bs-dismiss="modal" className="swal2-close" aria-label="Close this dialog"
                                style={{ display: 'none'}}>×
                        </button>
                    </div>
                    <div className="swal2-content">
                        <div id="swal2-content" className="swal2-html-container" style={{ display: 'block'}}>Bạn sẽ không
                            thể phục hồi hành động này.
                        </div>
                    </div>
                    <div className="swal2-actions">
                        <div className="swal2-loader"></div>
                        <button type="button" className="swal2-confirm swal2-styled"
                                onClick = {() => props.removeAction(props.keySection)}
                                data-bs-dismiss="modal"
                              >Có
                        </button>
                        <button type="button" className="swal2-cancel swal2-styled" data-bs-dismiss="modal"
                                style={{display: 'inline-block', backgroundColor: 'rgb(221, 51, 51)'}}>Không
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}