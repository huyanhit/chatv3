export default { 
    datetime (value, arg1) {
        if (isNaN(value)) return value;
        let date = new Date(value * 1000);
        if (arg1 === 'dd/mm/yyyy')
            return (
                date.toLocaleDateString('vi-VN') +
                ' ' +
                date.toLocaleTimeString('vi-VN')
            );
        return (
            ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
            ('0' + date.getDate()).slice(-2) + '/' +
            date.getFullYear() + ' ' +
            ('0' + date.getHours()).slice(-2) + ':' +
            ('0' + date.getMinutes()).slice(-2)
        );
    },

    date(value) {
        if (isNaN(value)) return value;
        let date = new Date(value * 1000);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
            ('0' + date.getDate()).slice(-2) + '/' +
            date.getFullYear();
    },
}