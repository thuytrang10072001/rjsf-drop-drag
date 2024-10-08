
export default function SwitchForm (props){
    const { schema, idSchema, formData, onChange } = props;

    return (
        <div className="set-homepage">
            <div className="form-group primaryForm has-feedback fv-plugins-icon-container pt-0">
                <span>{schema.label}</span>
                <div className="custom-switch custom-switch-primary">
                    <input name={idSchema.$id}
                           className="custom-switch-input"
                           id={idSchema.$id}
                           type="checkbox"
                           data-fv-field={idSchema.$id}
                           checked={formData}
                           value = {formData}
                           onChange={() => {
                               onChange(!props.formData);
                           }}/>
                    <label className="custom-switch-btn" htmlFor={idSchema.$id}></label>
                </div>
                <div className="fv-plugins-message-container"></div>
            </div>
        </div>
    );
}