const uiUser =  {
    name: {
        "ui:field": "textField",
    },
    pass:{
        "ui:field": "textField"
    }
}

const uiInfo = {
    age: {
        "ui:field": "textField",
    },
    show:{
        "ui:field": "selectSingleField",
    },
    street_address: {
        "ui:field": "textField",
    },
}

const uiCommon = {
    title: {
        "ui:field": "textField",
    },
    url:{
        "ui:field": "textField"
    },
    creation_date: {
        "ui:field": "textField",
    },
    show:{
        "ui:field": "switchField"
    },
    home_page: {
        "ui:field": "switchField"
    },
    image: {
        "ui:field": "imageField"
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
    }
}
const secUser = {
    section_key: 'user',
    title: 'User',
    description: 'Information Login',
    type: 'object',
    properties: {
        name: { type: 'string', label: 'Tên:', controlType: 'text' },
        pass: { type: 'string', label: 'Mật khẩu:', controlType: 'password' },
    },
    ui_section: uiUser,
}

const secInfo = {
    section_key: 'info',
    title: 'Info',
    description: 'Information User',
    type: 'object',
    properties: {
        age: {
            type: 'string',
            controlType: 'number',
            label: "Tuổi:"
        },
        show: {
            type: 'string',
            controlType: 'select-single',
            label: "Hiển thị:",
        },
    },
    ui_section: uiInfo,
}

const secCommon = {
    section_key: 'common',
    title: 'Thông tin chung',
    description: 'Information Common',
    type: 'object',
    properties: {
        title: {
            type: 'string',
            controlType: 'text',
            label: "Tiêu đề trang:"
        },
        url: {
            type: 'string',
            label: "Đường dẫn:",
            controlType: 'text'
        },
        creation_date: {
            type: 'string',
            label: "Ngày đăng:",
            controlType: 'date'
        },
        show: {
            type: 'boolean',
            label: "Hiển thị:",
            controlType: 'switch',
            default: false
        },
        home_page: {
            type: 'boolean',
            label: "Đặt làm trang chủ:",
            controlType: 'switch',
            default: false
        },
        image: {
            type: 'string',
            label: "Meta Image:",
            controlType: 'upload'
        }
    },
    ui_section: uiCommon,
}

const schemaForm = {
    type: 'object',
    title: 'React Json Schema Form',
    definitions: {
        // user: secUser,
        // info: secInfo,
        common: secCommon,
        hero_banner: secHeroBanner,
        // item: secItemBanner
    },
    properties: {
        common: {
            $ref: '#/definitions/common',
        },
        hero_banner: {
            $ref: '#/definitions/hero_banner'
        }
        // user: {
        //     $ref: '#/definitions/user',
        // },
        // info: {
        //     $ref: '#/definitions/info',
        // },
    },
};

export {secInfo, secUser, uiUser, uiInfo, uiHeroBanner, uiCommon, uiItemBanner, schemaForm}