export default function TemplateDefault (props){
    return (<div className='row'>
        {props.props?.properties?.map((element, index) =>(
            element.content.props.schema.controlType == 'switch'? (
                <div className='col-3'>
                    <div className='property-wrapper field-item'>{element.content}</div>
                </div>)
                : (<div className='col-6'>
                    <div className='property-wrapper field-item'>{element.content}</div>
                </div>)
        ))}
    </div>);
}