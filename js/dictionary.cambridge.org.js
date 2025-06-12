$(() => {
    $('div.i-volume-up').each((_, playerIcon) => {
        const elHtml = playerIcon.outerHTML;
        const newHtml = elHtml.replace('<div', '<button').replace('</div>', '</button>').replace('role="button"', '');
        $(playerIcon).replaceWith(newHtml);
    });;
});
