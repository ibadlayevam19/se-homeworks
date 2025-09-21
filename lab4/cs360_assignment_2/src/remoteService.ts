import axios, {AxiosResponse} from "axios";

function resolveUrl(resource:string): string{
    const baseUrl="http://localhost:4001";
    return `${baseUrl}${resource}`;
}
export async function remoteGet<T>(resource:string): Promise<T>{
    const res: AxiosResponse= await axios.get(resolveUrl(resource));
    return res.data;
}
export async function remotePost<T>(
    resource:string,
    body: any
):Promise<T>{
    const res: AxiosResponse=await axios.post(resolveUrl(resource), body);
    return res.data;
}
export async function remoteDelete<T>(resource:string):Promise<T>{
    const res: AxiosResponse=await axios.delete(resolveUrl(resource));
    return res.data;
}