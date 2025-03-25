'use client'

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { createContext, ReactNode } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies()

// console.log('cookies', cookies.get("refreshToken"))
const refreshToken = cookies.get("refreshToken") || {}

export const myWixClient = createClient({
    modules: {
        products,
        collections,
        currentCart
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
            refreshToken,
            accessToken: {
                value: "",
                expiresAt: 0,
            }
        },
    }),
});

export type myWixClientType = typeof myWixClient

export const WixClientContext = createContext<myWixClientType>(myWixClient)

export const WixClientContextProvider = ({children}: {children: ReactNode}) => {
    return <WixClientContext.Provider value={myWixClient}>{children}</WixClientContext.Provider>
}