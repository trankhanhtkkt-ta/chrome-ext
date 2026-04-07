const shouldExpandVideoPlayer = () => {
    const checklist = [
        'ldoceonline.com/media/english/',
        'cambridge.org/media/english/',
        'oxfordlearnersdictionaries.com/media/english/',
        'media.merriam-webster.com/audio/',
        'wordreference.com/audio/en/',
        'sd-pronunciation-processed-videos.sdcdns.com/desktop/',
        'audio.vocabulary.com/1.0/',
    ];
    return checklist.some(url => location.href.includes(url));
};

shouldExpandVideoPlayer() && $('body > video').css({
    'width': '800px',
});
