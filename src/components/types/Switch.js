
export default function SwitchForm ({props}){
    return (
        <div className="set-homepage">
            <div className="form-group primaryForm has-feedback fv-plugins-icon-container pt-0">
                <span>{props.schema.label}</span>
                <div className="custom-switch custom-switch-primary">
                    <input name={props.id}
                           className="custom-switch-input"
                           id={props.idSchema.$id}
                           type="checkbox"
                           data-fv-field={props.id}
                           checked={props.formData}
                           onChange={() => {
                               props.onChange(!props.formData);
                           }}/>
                    <label className="custom-switch-btn" htmlFor={props.idSchema.$id}></label>
                </div>
                <div className="fv-plugins-message-container"></div>
            </div>
        </div>
    );
}