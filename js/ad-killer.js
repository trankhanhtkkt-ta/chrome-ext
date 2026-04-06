const removeAdFn = () => {
    const adElements = [
        '[id="google_image_div"]',
        '[id^="google_ads_iframe"]'
    ];
    adElements.forEach(selector => {
        console.info("Removing ad element with selector: " + selector);
        $(selector).remove();
    });
};

$(() => {
    setInterval(removeAdFn, 2000);
});
