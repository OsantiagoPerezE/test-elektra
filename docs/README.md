# TestCustom Component

## Descripción
TestCustom es un componente React para VTEX IO que gestiona y sincroniza la información del carrito de compras (OrderForm) con Master Data. El componente rastrea automáticamente los cambios en el carrito y mantiene un registro persistente de los items en la entidad "TE" de Master Data.

## Características Principales
- Sincronización automática del OrderForm con Master Data
- Seguimiento de items del carrito (productos, precios, cantidades)
- Manejo automático de creación y actualización de documentos
- Integración con VTEX Order Manager
- Utilización de GraphQL para operaciones en Master Data

## Requisitos Técnicos
- VTEX IO
- React
- Apollo Client
- VTEX Order Manager

## Instalación

1. Añade el componente a las dependencias de tu `manifest.json`:

{
  "dependencies": {
    "vtex.test-custom": "0.x",
    "vtex.order-manager": "0.x"
  }
}

## Estructura de Datos
El componente almacena la siguiente información en Master Data:

### Entidad: TE
| Campo | Tipo | Descripción |
|-------|------|-------------|
| orderFormId | string | ID único del carrito de compras |
| Items | string (JSON) | Array de productos en el carrito |

### Estructura de Items
```typescript
interface OrderFormItem {
  productId: string;     // ID del producto
  sellingPrice: number;  // Precio de venta
  name: string;         // Nombre del producto
  quantity: number;     // Cantidad
}
```

## Funcionamiento
1. El componente monitorea cambios en el OrderForm
2. Cuando detecta cambios:
   - Busca un documento existente con el orderFormId actual
   - Si no existe, crea un nuevo documento
   - Si existe, actualiza el documento existente
3. Mantiene sincronizados los datos del carrito con Master Data

## Uso
Añade el componente en tu archivo de bloques:
```
{
  "store.custom": {
    "blocks": ["test-custom"]
  }
}
```
## GraphQL
El componente utiliza tres operaciones principales:

- `GET_DOCUMENT`: Consulta documentos existentes
- `CREATE_DOCUMENT`: Crea nuevos documentos
- `UPDATE_DOCUMENT`: Actualiza documentos existentes

### Ejemplo de consulta GET_DOCUMENT:
```graphql
query GET_DOCUMENT($acronym: String!, $fields: [String!]!, $where: String) {
  documents(acronym: $acronym, fields: $fields, where: $where) {
    id
    fields {
      key
      value
    }
  }
}


mutation CREATE_DOCUMENT($acronym: String!, $document: DocumentInput!) {
  createDocument(acronym: $acronym, document: $document) {
    id
    fields {
      key
      value
    }
  }
}

mutation UPDATE_DOCUMENT($acronym: String!, $fields: [DocumentFieldInput!]!) {
  updateDocument(acronym: $acronym, fields: $fields) {
    id
    fields {
      key
      value
    }
  }
}
```
## Contribución
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## Soporte
Para reportar problemas o solicitar nuevas características, por favor abre un issue en el repositorio.

## Licencia
Este proyecto está bajo la Licencia MIT.

## Versiones Disponibles
El componente está disponible en dos versiones:

### 1. Versión Master Data (Actual)
- Utiliza Master Data para persistencia de datos
- Operaciones mediante GraphQL
- Ideal para datos que necesitan ser accesibles desde el backend

### 2. Versión LocalStorage (Rama LocalStorage)
- Utiliza el almacenamiento local del navegador
- Operaciones síncronas directas
- Ideal para pruebas y desarrollo local

## Implementación con LocalStorage

### Estructura de Datos
Los datos se almacenan en LocalStorage con la siguiente estructura:

```typescript
interface StorageData {
  orderFormId: string;
  items: OrderFormItem[];
}

interface OrderFormItem {
  productId: string;     // ID del producto
  sellingPrice: number;  // Precio de venta
  name: string;         // Nombre del producto
  quantity: number;     // Cantidad
}
```

### Ejemplo de Uso con LocalStorage

```typescript
const TestCustomLocalStorage = () => {
  const { orderForm } = useOrderForm();
  const STORAGE_KEY = 'vtex-cart-items';

  const saveToLocalStorage = (data: StorageData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const getFromLocalStorage = (): StorageData | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  useEffect(() => {
    if (orderForm?.id && orderForm.id !== 'default-order-form') {
      const cartData = {
        orderFormId: orderForm.id,
        items: orderForm.items.map(item => ({
          productId: item.productId,
          sellingPrice: item.sellingPrice,
          name: item.name,
          quantity: item.quantity,
        }))
      };
      saveToLocalStorage(cartData);
    }
  }, [orderForm]);

  return <Fragment />;
};
```

### Ventajas de la Versión LocalStorage
* Implementación más simple y directa
* Sin dependencia de servicios externos
* Operaciones más rápidas
* Ideal para desarrollo y pruebas

### Limitaciones de LocalStorage
* Almacenamiento limitado (generalmente 5-10 MB)
* Los datos solo persisten en el navegador local
* No hay sincronización entre dispositivos
* Los datos se pierden al limpiar el caché del navegador

## Comparativa de Versiones

| Característica | Versión Master Data | Versión LocalStorage |
|----------------|---------------------|---------------------|
| Persistencia | Servidor (permanente) | Navegador (local) |
| Sincronización | Entre dispositivos | Solo local |
| Velocidad | Depende de la red | Inmediata |
| Casos de uso | Producción | Desarrollo/Pruebas |

