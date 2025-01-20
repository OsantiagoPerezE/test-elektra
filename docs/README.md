# Store Locator Component

The **Store Locator** component from Mattelsa allows users to explore the list of available brand stores as well as view detailed information about each store. This component is designed to integrate with the **Master Data** system, making its configuration and management straightforward.

## Features

1. **Store List**
   - Renders a list of all available stores.
   - Displays basic information such as name, location, and status (open or closed).
   - Filters stores by city to simplify searches.

2. **Store Detail**
   - Upon selecting a store from the list, a detailed view is displayed with:
     - Operating hours.
     - Full address.
     - An interactive map showing the store location.
   - Button to open the location directly in Google Maps.

3. **Configuration via Master Data**
   - Manage stores directly from Master Data.

## Component Structure

### Store List View

- **Header**: Includes the title "Stores" and a dropdown filter to select the city.
- **Store Cards**: Each card includes:
  - Store image.
  - Store name.
  - Location (city and address).
  - Status indicator.

### Store Detail View

- **Header**: Displays the store name and its current status.
- **Detailed Information**:
  - Operating hours organized by day.
  - Full address.
  - Interactive map with a marker at the exact location.
- **Action**: Button to open the location in Google Maps.

## Configuration in Master Data

1. Access the platform's Master Data.
2. Add the **Store Locator** component to the desired page.
3. Configure the stores by adding:
   - Name.
   - Address.
   - Operating hours.
   - Status.
   - Images.

## Interfaces

- ### **`locator-store-custom`**

## Usage

```json
{
  "store.custom#store-locator": {
    "children": ["flex-layout.row#store-locator", "contact-chat"]
  },
  "flex-layout.row#store-locator": {
    "title": "Main container - Store Locator",
    "props": {
      "blockClass": "store-locator__row",
      "fullWidth": true,
      "colSizing": "auto"
    },
    "children": ["locator-store-custom"]
  },
  "locator-store-custom": {
    "props": {
      "mapsApiKey": "AIzaSyBR148-Kgxm_0KR-kZJRHMfSo5_qnuLwA0",
      "textTitleStores": "stores",
      "textLinkGoogleMaps": "open in google maps"
    }
  }
}
```
