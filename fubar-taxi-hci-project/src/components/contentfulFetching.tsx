import {client} from "@/lib/contentful/client"
import { unstable_cache } from "next/cache"; 


export const getProducts = (async () => {
    const data = await client.withoutUnresolvableLinks.getEntries({
        content_type: 'ourServices',
    });

    console.log(data);
    
    return data;
});