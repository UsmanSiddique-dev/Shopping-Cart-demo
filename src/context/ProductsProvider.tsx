import { createContext, useState, type ReactElement } from "react";

export type ProductType = {
  id: number;
  name: string;
  price: number;
};
// const initState:ProductType[]=[]
const initState: ProductType[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 19.99,
  },
  {
    id: 3,
    name: "Product 3",
    price: 5.99,
  },
];

export type UseProductsContextType = {
  products: ProductType[];
};

const initContextState: UseProductsContextType = {
  products: [],
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);
  //    useEffect(()=>{
  //     const fetchProducts=async():Promise<ProductType[]>=>{
  //         const data =await fetch('http://localhost:3500/products').then(res=>{
  //             return res.json()
  //         }).catch(err=>{
  //             if(err instanceof Error) console.log(err.message)
  //         })
  //         return data
  //     }
  //     fetchProducts().then(products => setProducts(products))
  //    },[]);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsContext;
