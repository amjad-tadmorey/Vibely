// context/ShopContext.jsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
    const { search } = useLocation();            // simpler than useSearchParams
    const [shopId, setShopId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const idFromURL = params.get('shop_id');

        setShopId(idFromURL ?? null);              // reset to null if param missing
    }, [search]);                                // fires whenever URL changes

    return (
        <ShopContext.Provider value={{ shop_id: shopId }}>
            {children}
        </ShopContext.Provider>
    );
}
