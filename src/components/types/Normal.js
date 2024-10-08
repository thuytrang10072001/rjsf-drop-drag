export default function Normal(props){
    const { idSchema, schema, required, formData, onChange } = props;

    return (
        <div className='form-group primaryForm has-feedback fv-plugins-icon-container'>
            <label htmlFor={idSchema.$id} className="form-label">
                {schema.label}
                {required ? <span style={{ color: 'red' }}> *</span> : null}
            </label>
            <input
                id={idSchema.$id}
                type={schema.controlType}
                className="form-control"
                value={formData}
                placeholder={schema.placeholder}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
            />
        </div>
    )
}