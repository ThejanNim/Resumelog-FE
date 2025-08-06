import { supabase } from "../utils/supabase"
import useSWR from "swr";

export interface Jobs {
    id: number;
    user_id: number;
    data: object;
    created_at: string;
}

const getJobsByUserId = async (userId: number): Promise<Jobs[]> => {
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export const useGetJobsByUserId = (userId: number) => {
    const { data, error, isLoading } = useSWR(
        ["jobs", userId],
        () => getJobsByUserId(userId)
    );

    return { data, error, isLoading };
}