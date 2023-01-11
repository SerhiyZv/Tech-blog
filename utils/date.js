module.exports = { 
    formatDate: (date) => `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`,

    formatDateAndTime: (date) => `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} &ndash; ${new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
}