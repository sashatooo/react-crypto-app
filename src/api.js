import { cryptoAssets, cryptoData } from "./data"

export function fakeFetchCripto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 100)
    })
}

export function fetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 100)
    })
}