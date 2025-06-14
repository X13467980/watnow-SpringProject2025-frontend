export type TrainingMenu = {
  name: string;
  part: string;
  count: number;
  set_count: number;
  weight: number;
};

export type MachineResponse = {
  machine_name: string;
  image_url: string;
  menus: TrainingMenu[];
};