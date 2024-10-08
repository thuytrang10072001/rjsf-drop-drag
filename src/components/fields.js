import Normal from './types/Normal';
import SwitchForm from './types/Switch'
import SelectSingle from './types/SelectSingle';
import Image from './types/Image';
import Link from './types/Link';
import Checkbox from './types/Checkbox';
import DateTime from './types/DateTime'
import CkEditor from './types/CkEditor';

const TextField = (props) => {
    return (
        <Normal {...props}/>
    )
}

const SwitchField = (props) => {
    return (
        <SwitchForm {...props}/>
    )
}

const SelectSingleField = (props) => {
    return (
        <SelectSingle {...props} />
    )
}

const ImageField = (props) => {
    return (
        <Image {...props}/>
    )
}

const LinkForm = (props) => {
    return (
        <Link {...props}/>
    )
}

const CheckBoxField = (props) => {
    return (
        <Checkbox {...props}/>
    )
}

const DatePicker = (props) => {
    return (
        <DateTime {...props} />
    )
}

const CkEditorField = (props) => {
    return (
        <CkEditor {...props} />
    )
}
export {TextField, SwitchField, SelectSingleField, ImageField, LinkForm, CheckBoxField, DatePicker, CkEditorField};