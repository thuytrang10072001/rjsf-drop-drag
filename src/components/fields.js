import Normal from './types/Normal';
import SwitchForm from './types/Switch'
import SelectSingle from './types/SelectSingle';
import UploadImage from './types/UploadImage';

const TextField = (props) => {
    return (
        <Normal props = {props}/>
    )
}

const SwitchField = (props) => {
    return (
        <SwitchForm props = {props}/>
    )
}

const SelectSingleField = (props) => {
    return (
        <SelectSingle props = {props} />
    )
}

const ImageField = (props) => {
    return (
        <UploadImage props = {props}/>
    )
}

export {TextField, SwitchField, SelectSingleField, ImageField};