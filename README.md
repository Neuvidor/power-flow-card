# System Energy Flow Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Neuvidor/system-energy-flow-card?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/neuvidor/system-energy-flow-card/total?style=flat-square)

# Goal/Scope

Display current energy, gas, and water usage in a display that matches the official Energy Distribution card included with [Home Assistant](https://home-assistant.io/) as much as possible. It will allow you to display a different Energy Distribution card compared to the energy dashboard. As such, additional features that fall outside of that scope will not be added.


![image](https://user-images.githubusercontent.com/64861851/221838915-393e4372-cd6a-46ec-a66f-2d900e5c5e5a.png)


# Install

### HACS (recommended)

You can install this custom component using HACS by adding a custom repository.
HACS > Integrations > Explore & Add Repositories > System Energy Flow Card > Install this repository


# Using the card

I recommend looking at the [Example usage section](#example-usage) to understand the basics to configure this card.
(also) pay attention to the **required** options mentioned below.

### Options

#### Card options

| Name              | Type     |   Default    | Description                                                                                                                                                                  |
| ----------------- | -------- | :----------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type              | `string` | **required** | `custom:system-energy-flow-card`.                                                                                                                                                    |
| entities          | `object` | **required** | One or more sensor entities, see [entities object](#entities-object) for additional entity options.                                                                          |
| title             | `string` |              | Shows a title at the top of the card.                                                                                                                                        |
| dashboard_link    | `string` |              | Shows a link to an Energy Dashboard. Should be a url path to location of your choice. If you wanted to link to the built-in dashboard you would enter `/energy` for example. |
| inverted_entities | `string` |              | Comma seperated list of entities that should be inverted (negative for consumption and positive for production). See [example usage](#inverted-entities-example).            |
| kwh_decimals      | `number` |      1       | Number of decimals rounded to when kilowatts per hour are displayed.                                                                                                                  |
| wh_decimals       | `number` |      1       | Number of decimals rounded to when watts per hour are displayed.                                                                                                                      |
| min_flow_rate     | `number` |     .75      | Represents the fastest amount of time in seconds for a flow dot to travel from one end to the other, see [flow formula](#flow-formula).                                      |
| max_flow_rate     | `number` |      6       | Represents the slowest amount of time in seconds for a flow dot to travel from one end to the other, see [flow formula](#flow-formula).                                      |
| watt_threshold    | `number` |      0       | The number of watts to display before converting to and displaying kilowatts. Setting of 0 will always display in kilowatts.                                                 |

#### Entities object

At least one of _grid_, _battery_, or _solar_ is required. All entites (except _battery_charge_) should have a `unit_of_measurement` attribute of Wh(watts per hour) or kWh(kilowatts per hour).

| Name           | Type                | Description                                                                                                                                                                                                     |
| -------------- | :------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| grid           | `string` / `object` | Entity ID of a sensor supporting a single state with negative values for production and positive values for consumption or an object for [split entites](#split-entities). Examples of both can be found below. |
| battery        | `string` / `object` | Entity ID of a sensor supporting a single state with negative values for production and positive values for consumption or an object for [split entites](#split-entities). Examples of both can be found below. |
| battery_charge | `string`            | Entity ID providing a state with the current percentage of charge on the battery.                                                                                                                               |
| solar          | `string`            | Entity ID providing a state with the value of generation.                                                                                                                                                       |
| gas            | `string`            | Entity ID providing a state value of consumption                                                                                                                                                                |
| water          | `string`            | Entity ID providing a state value of consumption                                                                                                                                                                |

#### Split entities

Can be use with either Grid or Battery configuration. The same `unit_of_measurement` rule as above applies.

| Name        | Type     | Description                                                                                       |
| ----------- | -------- | ------------------------------------------------------------------------------------------------- |
| consumption | `string` | Entity ID providing a state value for consumption, this is required if using a split grid object. |
| production  | `string` | Entity ID providing a state value for production                                                  |

### Example usage

#### Combined Entites Example

Using combined entities for grid, battery and solor that support positive state values for consumption and negative state values for production.

```yaml
type: custom:system-energy-flow-card
entities:
  battery: sensor.battery_in_out
  battery_charge: sensor.battery_percent
  grid: sensor.grid_in_out
  solar: sensor.solar_out
```

#### Inverted Entities Example

Using combined entites as above but where the battery and grid entities are inverted (negative = consumption and positive = production).

```yaml
type: custom:system-energy-flow-card
entities:
  battery: sensor.battery_in_out
  battery_charge: sensor.battery_percent
  grid: sensor.grid_in_out
  solar: sensor.solar_out
inverted_entities: battery, grid
```

#### Split Entites Example

Using split entities for grid and battery where each consumption and production entity state has a positive value.

```yaml
type: custom:system-energy-flow-card
entities:
  battery:
    consumption: sensor.battery_out
    production: sensor.battery_in
  battery_charge: sensor.battery_percent
  grid:
    consumption: sensor.grid_out
    production: sensor.grid_in
  solar: sensor.solar_out
```

### Flow Formula

This formula is based on the offical formula used by the Energy Distribution card.

```js
max - (value / totalLines) * (max - min);
// max = max_flow_rate
// min = min_flow_rate
// value = line value, solar to grid for example
// totalLines = gridConsumption + solarConsumption + solarToBattery +
//   solarToGrid + batteryConsumption + batteryFromGrid + batteryToGrid
```

## Credits

- [@ulic75](https://github.com/ulic75/power-flow-card)


