import * as types from './mutation-types'
import gql from 'graphql-tag'

export default{
    async fetchBookList({ commit }){
        try {
            // let response = await this.app.apolloProvider.defaultClient.query({
            //     query:gql`
            //         query {
            //             books {
            //                 title
            //                 author
            //             }
            //         }
            //     `
            // })
            // console.log('this is fetch book list', response)
            // commit(types.FETCH_BOOK_LIST, response.data)

            let fake = [
                {
                    id:'1',
                    total_pages: 4,
                    pages1: { title: 'Test BOOK1 TITLE' },
                    pages2: {
                        header: 'Apple on the tree',
                        text: 'This is first book first page',
                        img: '',
                        photo:{
                            grayscale: 0.5,
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages3: {
                        header: 'Apple under the tree',
                        text: 'This is second page in first book',
                        img: '',
                        photo:{
                            grayscale: 0.1,
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages4: {
                        header: 'Apple in the tree',
                        text: 'This is third page in first book',
                        img: '',
                        photo:{
                            grayscale: 0.6,
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    }
                },
                {
                    id: '2',
                    total_pages: 4,
                    pages1: { title: 'The Second Apple' },
                    pages2: {
                        header: 'The apple on the tree 2',
                        text: 'This is first page in second book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages3: {
                        header: 'The apple under the tree 2',
                        text: 'This is second page in second book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages4: {
                        header: 'Apple into the tree 2',
                        text: 'This is third page in second book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    }
                },
                {
                    id: '3',
                    total_pages: 4,
                    pages1: { title: 'This is third Apple 3' },
                    pages2: {
                        header: 'The apple on the tree 3',
                        text: 'this is first page in third book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages3: {
                        header: 'The apple under the tree 3',
                        text: 'this is second page in third book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    },
                    pages4: {
                        header: 'The apple into the tree',
                        text: 'this is third page in third book',
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
                            { title: 'Add Post Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Live Stream Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/' },
                            { title: 'Add Video Link', href: 'https://www.jstips.co/zh_tw/javascript/insert-item-inside-an-array/'}
                        ]
                    }
                }
            ]
            commit(types.FETCH_BOOK_LIST, fake)
        } catch (error) {
            console.log('This is fetchBook error', error)
        }
    }
}