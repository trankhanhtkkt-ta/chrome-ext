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
    $('body').css({
        'color': 'revert',
        'background': 'revert',
        'background-color': 'revert',
        'border-color': 'revert',
    });

    $('body *').css({
        'background-color': '#000',
        'color': '#fff',
    });
});
