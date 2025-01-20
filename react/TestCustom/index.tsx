import React, { Fragment, useEffect, useMemo } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";

interface OrderFormItem {
  productId: string;
  sellingPrice: number;
  name: string;
  quantity: number;
}

const TestCustom = () => {
  const { orderForm } = useOrderForm();

  const id = useMemo(() => {
    return orderForm?.id || "";
  }, [orderForm]);

  const items = useMemo(() => {
    return orderForm?.items || [];
  }, [orderForm]);

  useEffect(() => {
    if (id !== "" && id !== "default-order-form" && items.length > 0) {
      const storedData = localStorage.getItem("test-elektra");
      const allOrderForms = storedData ? JSON.parse(storedData) : {};

      const orderFormKey = `orderForm_${id}`;
      const newOrderForm = {
        orderFormId: id,
        items: items.map((item: OrderFormItem) => ({
          productId: item.productId,
          sellingPrice: item.sellingPrice,
          name: item.name,
          quantity: item.quantity,
        })),
      };

      if (!allOrderForms[orderFormKey]) {
        console.log("CREATE en localStorage");
        allOrderForms[orderFormKey] = newOrderForm;
      } else {
        console.log("UPDATE en localStorage");
        allOrderForms[orderFormKey] = newOrderForm;
      }

      localStorage.setItem("list-orderforms", JSON.stringify(allOrderForms));
    }
  }, [items, id]);

  return <Fragment />;
};

export default TestCustom;
