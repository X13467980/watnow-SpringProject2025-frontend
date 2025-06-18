export type Menu = {
    name: string;
    part: string;
    machine_id: number;
    count?: number | null;
    set_count?: number | null;
    time?: number | null;
    weight?: number | null;
};