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
    const darkModeClass = 'hello-dark-mode-ext-by-KTR-2026';
    let darkModeActive = false;
    // ---- Color parsing ----
    function parseColor(color) {
        if (!color) return null;

        const match = color.match(/[\d.]+/g);
        if (!match) return null;

        const [r, g, b, a = 1] = match.map(Number);
        return { r, g, b, a };
    }

    // ---- Alpha blending ----
    function blend(fg, bg) {
        const a = fg.a + bg.a * (1 - fg.a);

        return {
            r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
            g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
            b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
            a
        };
    }

    // ---- Brightness (perceived) ----
    function getBrightness({ r, g, b }) {
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    
    // ---- Resolve actual background ----
    const colorManager = {
        __bgCache: null,
        init: function() {
            // ---- Cache for performance ----
            if (!this.__bgCache) {
                this.__bgCache = new WeakMap();
            }
            const __bgCache = this.__bgCache;
            const getEffectiveBackground = (el) => {
                if (__bgCache.has(el)) return __bgCache.get(el);

                let current = el;
                let result = { r: 255, g: 255, b: 255, a: 1 }; // default white

                while (current) {
                    const style = getComputedStyle(current);
                    const color = parseColor(style.backgroundColor);

                    if (color) {
                    result = blend(color, result);
                    if (result.a >= 0.99) break;
                    }

                    current = current.parentElement;
                }

                __bgCache.set(el, result);
                return result;
            };

            return {
                getEffectiveBackground,
                isDarkElement: (el, threshold = 128) => {
                    const bg = getEffectiveBackground(el);
                    return getBrightness(bg) < threshold;
                },
            };
        },
    };

    const shouldSkipDarkMode = () => {
        ignoreHostnames = [
            'google.com',
            'youtube.com',
            'dev.azure.com',
            'tecalliance.visualstudio.com',
            'console.aws.amazon.com',
            'tecalliance.atlassian.net',
            // 'graphacademy.neo4j.com',
        ];
        if (ignoreHostnames.some(hostname => window.location.hostname.endsWith(hostname))) {
            return false;
        }
        // return window.matchMedia('(prefers-color-scheme: dark)').matches;

        return colorManager.init().isDarkElement(document.body);
    };

    const activeDarkMode = (toggle) => {
        $('.' + darkModeClass).removeClass(darkModeClass);
        if (!toggle && shouldSkipDarkMode()) {
            return;
        }

        if (toggle && darkModeActive) {
            darkModeActive = false;
            return;
        }

        $('body').css({
            'color': 'revert',
            'background': 'revert',
            'background-color': 'revert',
            'border-color': 'revert',
        });

        $('body *').addClass(darkModeClass);
        darkModeActive = true;
    };

    addEventListener("keyup", e => {
        // console.log(e.key);
        if (e.shiftKey && e.key === "Escape") {
            activeDarkMode(true);
        }
    });

    activeDarkMode();
});
