const Helper = {
    generateRandomId: (length) => {
        return Math.random().toString(36).substr(2, length);
    },
    bindOptionsSelect: (array, sytax = null) => {
        const data = array.map((option) => ({
            value: option.id,
            label: sytax + option.url_key
        }));
        return data;
    }
}

export default Helper;