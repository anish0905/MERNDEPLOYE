import React from 'react'
import { ItemStockModal } from './Modal/ItemStock/ItemStockModal';
import { ListItem } from '@material-tailwind/react';
import { ItemModal } from './Modal/Items/ItemModal';
import { ProductStockModal } from './Modal/ProductStock/ProductStockModal';
import { SellerModal } from './Modal/Seller/SellerModal';
import { SuppliesModal } from './Modal/Supplies/SuppliesModal';
import { OrderModal } from './Modal/Order/OrderModal';
import { CategoryModal } from './Modal/Category/CategoryModal';
import { PurchaseModal } from './Modal/Purchase/PurchaseModal';
import { ProductModal } from './Modal/Products/ProductModal';
import { SupplierModal } from './Modal/Supplier/SupplierModal';
import SalesModal from './Modal/Sales/SalesModal';

export const Add = ({ name, searchQuery, onSearchChange }) => {

    function AddItem() {
        const add = name;
        if (add == "Orders") {
            return <OrderModal />;
        } else if(add == "Items") {
            return <ItemModal />;
        }else if(add == "Category"){
            return <CategoryModal/>
        }else if(add == "ItemStock"){
            return <ItemStockModal/>
        }else if(add == "ProductStock"){
            return <ProductStockModal/>
        }else if(add == "ItemStock"){
            return <ItemStockModal/>
        }else if(add == "Purchase"){
            return <PurchaseModal/>
        }else if(add == "Seller"){
            return <SellerModal/>
        }else if(add == "Supplies"){
            return <SuppliesModal/>
        }else if(add == "Supplier"){
            return <SupplierModal/>
        }else if(add == "Products"){
            return <ProductModal/>
        }else if(add == "Sales"){
            return <SalesModal/>
        }
    }
    return (
        <div className='mx-4  bg-white px-4 py-2 rounded-lg shadow-xl '>
            <div>
                <h1 className=' text-4xl item-center font-bold' >{name}</h1>
            </div>

            <div className="max-w-16xl mx-auto ">

                <div className="bg-white my-4 px-0">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center mr">

                            <div className="flex gap-4">
                                <label for="table-search" className="sr-only">Search</label>
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" id="table-search" className="bg-gray-50 w-min-1/2 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`search for ${name} name` } value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
                                </div>

                            </div>
                        </div>
                        <div>
                            <AddItem add=""/>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}