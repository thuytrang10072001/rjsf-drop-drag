import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import { ClassicEditor, SourceEditing, Heading, Bold, Link, Paragraph , BlockQuote,
    Essentials, Alignment, Image, ImageStyle, ImageUpload, ImageTextAlternative, MediaEmbed,
    TableToolbar, Italic, Mention, Undo } from 'ckeditor5';

export default function CkEditor(props){
    const { idSchema, schema, required, formData, onChange } = props;

    return (
        <div className='form-group primaryForm has-feedback fv-plugins-icon-container'>
            <label htmlFor={idSchema.$id} className="form-label">
                {schema.label}
                {required ? <span style={{ color: 'red' }}> *</span> : null}
            </label>
            <CKEditor
                editor={ ClassicEditor }
                config={ {
                    toolbar:  [
                        "sourceEditing",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                        "ckfinder",
                        "|",
                        "alignment",
                        "|",
                        "imageTextAlternative",
                        "imageUpload",
                        "imageStyle:full",
                        "imageStyle:side",
                        "|",
                        "mediaEmbed",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "|",
                        "undo",
                        "redo"
                    ],
                    plugins: [
                        SourceEditing, Heading, Bold, Link, BlockQuote,
                        Essentials, Alignment, Image, ImageStyle, ImageUpload, ImageTextAlternative, MediaEmbed,
                        TableToolbar, Italic, Mention, Paragraph, Undo
                    ],
                    licenseKey: '<YOUR_LICENSE_KEY>',
                    mention: {
                        // Mention configuration
                    },
                    // initialData: '<p>Hello from CKEditor 5 in React!</p>',
                } }
            />
        </div>
    )
}