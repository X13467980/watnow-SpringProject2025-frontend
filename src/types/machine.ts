export type TrainingMenu = {
  name: string;
  part: string;
};

export type MachineResponse = {
  machine_name: string;
  image_url: string;
  menus: TrainingMenu[];
};

