import { LovelaceCardConfig } from "custom-card-helpers";
import { ComboEntity } from "./type.js";

export interface SystemEnergyFlowCardConfig extends LovelaceCardConfig {
  entities: {
    battery?: string | ComboEntity;
    battery_charge?: string;
    grid: string | ComboEntity;
    solar?: string;
    gas?: string;
    water?: string;
  };
  dashboard_link?: string;
  inverted_entities: string | string[];
  kwh_decimals: number;
  min_flow_rate: number;
  max_flow_rate: number;
  wh_decimals: number;
  watt_threshold: number;
}
