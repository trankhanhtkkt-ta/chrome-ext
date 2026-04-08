$(() => {
    // NOTE: The function call below is deprecated and now replaced by the following call.
    //     $('body, .body, .examples, .box_title, .responsive_entry_center_wrap, #ox-footer, .responsive_row, .ring-links-box, #entryContent .entry').css({
    //         'background-color': '#000',
    //         'color': '#fff',
    //     });

    /***************************************************************                   _         _
     .-""-.          ( )-"```"-( )          .-""-.
    / O O  \          /         \          /  O O \
    |O .-.  \        /   0 _ 0   \        /  .-. O|
    \ (   )  '.    _|     (_)     |     .'  (   ) /
    '.`-'     '-./ |             |`\.-'     '-'.'
    \         |  \   \     /   /  |         /
        \        \   '.  '._.'  .'   /        /
        \        '.   `'-----'`   .'        /
        \   .'    '-._        .-'\   '.   /
        |/`          `'''''')    )    `\|
        /                  (    (      ,\
        ;                    \    '-..-'/ ;
        |                     '.       /  |
        |                       `'---'`   |
        ;                                 ;
        \                               /
            `.                           .'
            '-._                   _.-'
            __/`"  '  - - -  ' "`` \__
            /`            /^\           `\
            \(          .'   '.         )/
            '.(__(__.-'       '.__)__).'
    ***************************************************************/
    let shouldDisableDarkMode = false;
    const darkModeClass = 'hello-dark-mode-ext-by-KTR-2026';
    const enableDarkMode = (maxJitter) => {
        const minJitter = 150;
        setTimeout((maxJitter) => {
            enableDarkMode(maxJitter);
        }, Math.max(minJitter, Math.random() * maxJitter));

        if (shouldDisableDarkMode) {
            $('.' + darkModeClass).removeClass(darkModeClass);
            return;
        }
        $('body').css({
            'color': 'revert',
            'background': 'revert',
            'background-color': 'revert',
            'border-color': 'revert',
        });

        $('body *').addClass(darkModeClass);
    };

    addEventListener("keyup", e => {
        // console.log(e.key);
        if (e.shiftKey && e.key === "Escape") {
            shouldDisableDarkMode = !shouldDisableDarkMode;
        }
    });

    ignoreList = [
        'tecalliance.visualstudio.com',
        'console.aws.amazon.com',
        'tecalliance.atlassian.net',
    ];

    if (ignoreList.some(hostname => window.location.hostname.endsWith(hostname))) {
        return;
    }

    enableDarkMode(2e3);
});
