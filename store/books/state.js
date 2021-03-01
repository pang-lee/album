const state = () => ({
    book_info: {
        title: 'BOOK TITLE',
        page: 1,
        header: 'Page Header',
        text: 'Type Down Your Story.',
        img: '',
        photo:{
            grayscale: 0,
            sepia: 0,
            saturate: 1,
            hueRotate: 0,
            invert: 0,
            brightness: 1,
            contrast: 1,
            blur: 0,
            suffix: {
              hueRotate: 'deg',
              blur: 'px'
            }
        },
        options: [
            { title: 'Update Image' },
            { title: 'Add Post Link', href: '' },
            { title: 'Add Live Stream Link', href: '' },
            { title: 'Add Video Link', href: ''}
        ]
    },
})

export default state