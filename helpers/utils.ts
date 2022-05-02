/**
 *
 * @param date
 * @returns {{hasMonth: boolean, hasDay: boolean, onlyYear: boolean, splitDate: *}}
 */
export function checkDate(date) {
    const splitDate = date.split('-');

    const hasDay = splitDate.length === 3;
    const hasMonth = splitDate.length >= 2;
    const onlyYear = splitDate.length === 1;

    return { hasDay, hasMonth, onlyYear, splitDate };
}

/**
 *
 * @param dirtyDate
 * @returns {string}
 */
export function niceFullDate(dirtyDate) {
    let niceDate = '';

    if (dirtyDate) {
        const date = new Date(dirtyDate);
        const { hasDay, hasMonth } = checkDate(dirtyDate);

        const options: Intl.DateTimeFormatOptions = {
            day: hasDay ? 'numeric' : undefined,
            month: hasMonth ? 'long' : undefined,
            year: 'numeric',
        };

        niceDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    }

    return niceDate;
}
