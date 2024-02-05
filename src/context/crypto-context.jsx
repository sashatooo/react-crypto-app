import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCripto, fetchAssets } from "../api";
import { precentDifference } from "../utils";


const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id);
            return {
              grow: asset.price < coin.price,
              growPrecent: precentDifference(asset.price, coin.price),
              totalAmount: asset.amount * coin.price,
              totalProfit: asset.amount * coin.price - asset.amount * asset.price,
              name: coin.name,
              ...asset,
            };
        })
    }
  
    useEffect(() => {
      async function preload() {
        setLoading(true);
        const { result } = await fakeFetchCripto();
        const assets = await fetchAssets();
        setCrypto(result);
        setAssets(mapAssets(assets, result));
        setLoading(false);
      }
      preload();
    }, []);

    function addAsset(newAsset) {
        setAssets(prev => mapAssets([newAsset, ...prev], crypto))
    }


    return (
        <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
            {children}
        </CryptoContext.Provider>
    )

}

export function useCrypto() {
    return useContext(CryptoContext)
}

export default CryptoContext