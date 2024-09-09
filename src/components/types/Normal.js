export default function Normal({props}){
    return (
        <div className='form-group primaryForm has-feedback fv-plugins-icon-container'>
            <label htmlFor={props.id} className="form-label">{props.schema.label}</label>
            <input
                id={props.idSchema.$id}
                type={props.schema.controlType}
                className="form-control"
                value={props.formData}
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
            />
        </div>
    // <div class="col-xs-12 col-md-5">
    //     <div class="form-group primaryForm has-feedback fv-plugins-icon-container">
    //         <label htmlFor={props.id}>{props.schema.label}</label>
    //         <input
    //             id={props.idSchema.$id}
    //             type={props.schema.controlType}
    //             className="form-control"
    //             value={props.formData}
    //             onChange={(e) => {
    //                 props.onChange(e.target.value)
    //             }}
    //             maxlength="101"
    //             data-fv-field={props.idSchema.$id}
    //             required="1"
    //             data-fv-string-length___max="100"
    //             // data-fv-string-length___message="Vui lòng nhập tên bộ Banner không quá 100 ký tự"\
    //             // data-fv-not-empty___message="Vui lòng nhập Tiêu đề"
    //             // placeholder="Tiêu đề"
    //         />
    //         <div class="fv-plugins-message-container"></div>
    //     </div>
    // </div>
    )
}