export default function TabLanguages (props) {

    // const handleClick = (languageCode) => {
    //     const langCode = props.langCurrent;
    //     props.setLangDatas((prev) => {
    //         return({
    //             ...prev,
    //             [langCode]: props.formData.current})
    //     });
    //     if(props.langDatas.hasOwnProperty(languageCode)){
    //         props.formData.current = props.langDatas[languageCode];
    //         props.setFormData(props.langDatas[languageCode]);
    //     }else{
    //         props.formData.current = {};
    //         props.setFormData({});
    //     }
    //     props.setLangCurrent(languageCode);
    // }

    return(
        <div className="col-12 page-nav mb-3">
            <ul className="nav nav-pills mb-4" id="pills-page-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link h2 active" href="#vi-page-content" id="vi-page-tab" data-bs-toggle="pill"
                       role="tab" aria-selected="true" aria-controls="vi-page-content">Tiếng Việt</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link h2" href="#en-page-content" id="en-page-tab" data-bs-toggle="pill" role="tab"
                       aria-selected="false" aria-controls="en-page-content" tabIndex="-1">English</a>
                </li>
            </ul>
        </div>
    )
}