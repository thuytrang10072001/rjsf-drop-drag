const uiCommon = {
    public_date: {
        "ui:field": "datePicker",
    },
    status:{
        "ui:field": "selectSingleField"
    },
    is_home_page: {
        "ui:field": "switchField"
    }
}

const uiItemBanner = {
    image_desktop: {
        "ui:field": 'imageField'
    },
    image_mobile: {
        "ui:field": 'imageField'
    },
    link: {
        "ui:field": 'textField'
    }
}

const secItemBanner = {
    section_key: 'item_banner',
    title: 'Item',
    type:'object',
    properties: {
        image_desktop: {
            type: 'string',
            label: "Banner desktop",
            controlType: 'upload'
        },
        image_mobile: {
            type: 'string',
            label: "Banner mobile",
            controlType: 'upload'
        },
        link:{
            type: 'string',
            label: "Thêm đường dẫn vào bannner"
            // properties:{
            //     title:{
            //         label: "Tiêu đề đường dẫn",
            //         type: 'string',
            //         controlType: 'text'
            //     },
            //     category_link: {
            //         label: 'Chọn loại đường dẫn',
            //         type: 'string',
            //         controlType: 'select-single',                }
            // }
        }
    },
    ui_section: uiItemBanner
}

const uiHeroBanner = {
    item:{
        "ui:field": "itemBanner"
    }
}

const uiBanner = {
    "image": {
        "ui:field": 'imageField'
    },
    "link": {
        "ui:field": 'linkForm'
    }
}

const uiLink = {
    "ui:order": ["title", "type_link", "module", "url_module", "url", "new_tab"],
    title: {
        "ui:field": 'textField'
    },
    type_link: {
        "ui:field": "selectSingleField",
    },
    module: {
        "ui:field": "selectSingleField"
    },
    url_module: {
        "ui:field": "selectSingleField"
    },
    url: {
        "ui:field" : "textField"
    },
    new_tab: {
        "ui:field": 'checkboxField'
    }
}

const secBanner = {
    "section_key": 'banner',
    "title": 'Banner',
    "type": 'object',
        "properties": {
        "image": {
            "type": 'array',
            'label': "Banner desktop",
            "controlType": 'upload'
        },
        "link":{
            "type": 'object',
            "controlType": "linkForm",
            "label": "Thêm đường dẫn vào bannner",
            "required": ["title", "type_link", "url", "url_module", "module"],
            "properties": {
                "title": {
                    "type": 'string',
                    "controlType": 'text',
                    "label": 'Tiêu đề đường dẫn'
                },
                "type_link": {
                    "type": 'string',
                    "controlType": 'select-single',
                    "label": "Chọn loại đường dẫn",
                    "placeholder": "Chọn loại đường dẫn",
                    "enum": ["0", "1"],
                    "data": [
                        {
                            "value": "0",
                            "label": "Đường dẫn nội bộ"
                        },
                        {
                            "value": "1",
                            "label": "Đường dẫn ngoài"
                        }
                    ]
                },
                "new_tab":{
                    "type": "boolean",
                    "controlType": "checkbox",
                    "label": "Mở đường dẫn ở tab mới"
                }
            },
            "dependencies_link": {
                "type_link": {
                    "oneOf": [
                        {
                            "properties": {
                                "type_link": { "enum": ["1"] },
                                "url": { "type": "string", "label": "Nhập đường dẫn", "controlType": 'text' },
                            },
                            "required": ['url']
                        },
                        {
                            "properties": {
                                "type_link": { "enum": ["0"] },
                                "module": {
                                    "type": "string",
                                    "label": "Chọn module",
                                    "controlType": "select-single",
                                    "placeholder": "Chọn module",
                                    "data": [
                                        {
                                            "value": "page",
                                            "label": "Trang"
                                        },
                                        {
                                            "value": "article",
                                            "label": "Bài viết"
                                        },
                                        {
                                            "value": "catalogue",
                                            "label": "Danh mục"
                                        },
                                        {
                                            "value": "contact",
                                            "label": "Liên hệ"
                                        },
                                        {
                                            "value": "product_service",
                                            "label": "Sản phẩm dịch vụ"
                                        }
                                    ]
                                },
                                "url_module": {
                                    "type": "string",
                                    "label": "Chọn đường dẫn",
                                    "controlType": "select-single",
                                    "placeholder": "Chọn đường dẫn",
                                    "data": [
                                        {
                                            "value": "/page/123456",
                                            "label": "/page/123456"
                                        },
                                        {
                                            "value": "/page/456789",
                                            "label": "/page/456789"
                                        }
                                    ]
                                },
                            }
                        }
                    ]
                }
            },
            "ui_section": uiLink,
            "validate_section": {
                "title": {
                    "type": 'string',
                    "required": 'Vui lòng nhập tiêu đề đường dẫn',
                },
                "url": {
                    "type": 'string',
                    "required": 'Vui lòng nhập đường dẫn',
                },
                "type_link": {
                    "type": 'string',
                    "required": "Vui lòng chọn đường dẫn"
                },
                "module": {
                    "type": "string",
                    "required": "Vui lòng chọn module"
                },
                "url_module": {
                    "type": "string",
                    "required": "Vui lòng chọn đường dẫn"
                }
            }
        }
    },
    "ui_section": uiBanner,
    "validate_section": {
        "type": "object",
        "properties":{
            "link": {
                "type": "object",
                "test": "Vui lòng chọn đường dẫn",
                "required": "Vui lòng chọn đường dẫn"
            }
        }
    }
}

const secHeroBanner = {
    section_key: 'hero_banner',
    title: 'Hero Banner',
    type: 'object',
    properties: {
        item: {
            section_key: 'item_banner',
            title: 'Item',
            type:'object',
            properties: {
                image_desktop: {
                    type: 'string',
                    label: "Banner desktop",
                    controlType: 'upload'
                },
                image_mobile: {
                    type: 'string',
                    label: "Banner mobile",
                    controlType: 'upload'
                },
                link:{
                    type: 'string',
                    label: "Thêm đường dẫn vào bannner"
                }
            },
            ui_section: uiItemBanner
        }
    }
}

const uiContent = {
    title: {
        "ui:field": "textField",
    },
    url_key:{
        "ui:field": "textField"
    },
    meta_image: {
        "ui:field": "imageField"
    },
    status:{
        "ui:field": "switchField"
    }
}

const secContent = {
    section_key: 'content',
    title: "Nội dung chính",
    type: 'object',
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            controlType: 'text',
            label: "Tiêu đề trang",
            placeholder: "Tiêu đề trang"
        },
        url_key: {
            type: 'string',
            label: "Đường dẫn",
            controlType: 'text',
            placeholder: "Đường dẫn"
        },
        meta_image: {
            type: 'array',
            label: "Feature Image",
            controlType: 'upload'
        },
        status: {
            type: 'boolean',
            label: "Hiển thị",
            controlType: 'switch',
            default: false
        }
    },
    ui_section: uiContent,
    validate_section: {
        title: {
            type: 'string',
            required: 'Vui lòng nhập tiêu đề trang',
        }
    }
}

const secCommon = {
    section_key: 'common',
    title: 'Thông tin chung',
    description: 'Information Common',
    type: 'object',
    properties: {
        status: {
            type: 'boolean',
            label: "Trạng thái",
            controlType: 'select-single',
            data: [
                {
                    "value": 0,
                    "label": "Chưa xử lý"
                },
                {
                    "value": 1,
                    "label": "Kích hoạt"
                }
            ],
            default: 1
        },
        public_date: {
            type: 'string',
            label: "Ngày đăng",
            controlType: 'date',
            placeholder: "Ngày đăng"
        },
        is_home_page: {
            type: 'boolean',
            label: "Đặt làm trang chủ:",
            controlType: 'switch',
            default: false
        },
    },
    ui_section: uiCommon,
}

const schemaForm = {
    type: 'object',
    title: 'React Json Schema Form',
    definitions: {
        content: secContent,
        // banner: secBanner
        // hero_banner: secHeroBanner,
        // item: secItemBanner
    },
    properties: {
        content: {
            $ref: '#/definitions/content'
        },
        // banner: {
        //     $ref: '#/definitions/banner'
        // }
        // hero_banner: {
        //     $ref: '#/definitions/hero_banner'
        // }
    },
};

export {uiHeroBanner, uiCommon, uiItemBanner, schemaForm, uiBanner, uiLink, uiContent}