const removeAdFn = (maxJitter) => {
    const minJitter = 150;
    const adElements = [
        '[id="google_image_div"]'
        , '[id^="google_ads_iframe"]'
        , '[id^="gpt_unit_"]'
        , '[id^="AdThrive_"]'
        , '[class^="adthrive-"]'
    ];
    adElements.forEach(selector => {
        console.info("Removing ad element with selector: " + selector);
        $(selector).remove();
    });
    setTimeout((maxJitter) => {
        removeAdFn(maxJitter);
    }, Math.max(minJitter, Math.random() * maxJitter));
};

$(() => {
    removeAdFn(2e3);
});
