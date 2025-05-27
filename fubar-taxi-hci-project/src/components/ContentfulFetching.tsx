import {client} from "@/lib/contentful/client"

export const getProducts = (async () => {
    const data = await client.withoutUnresolvableLinks.getEntries({
        content_type: 'ourServices',
    });

    console.log(data);
    
    return data;
});
