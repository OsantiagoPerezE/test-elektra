import React, { Fragment, useEffect, useMemo } from "react";
import { useLazyQuery, useMutation } from "react-apollo";
import { useOrderForm } from "vtex.order-manager/OrderForm";
import GET_DOCUMENT from "./gql/getDocuments.gql";
import CREATE_DOCUMENT from "./gql/createDocument.gql";
import UPDATE_DOCUMENT from "./gql/updateDocument.gql";

interface OrderFormItem {
  productId: string;
  sellingPrice: number;
  name: string;
  quantity: number;
}

const TestCustom = () => {
  const { orderForm } = useOrderForm();
  const [getDocuments, { data: dataGetDocument }] = useLazyQuery(GET_DOCUMENT);
  const [createDocument] = useMutation(CREATE_DOCUMENT);
  const [updateDocument] = useMutation(UPDATE_DOCUMENT);

  const id = useMemo(() => {
    return orderForm?.id || "";
  }, [orderForm]);

  const items = useMemo(() => {
    return orderForm?.items || [];
  }, [orderForm]);

  useEffect(() => {
    if (id != "" && id != "default-order-form" && items.length > 0) {
      getDocuments({
        variables: {
          acronym: "TE",
          fields: ["orderFormId", "Items"],
          where: `orderFormId=${id}`,
        },
      });
    }
  }, [items, id]);

  useEffect(() => {
    if (
      dataGetDocument != undefined &&
      id != "" &&
      id != "default-order-form"
    ) {
      const responseGet = dataGetDocument?.documents || [];

      if (responseGet.length === 0) {
        createDocument({
          variables: {
            acronym: "TE",
            document: {
              fields: [
                { key: "orderFormId", value: id },
                {
                  key: "Items",
                  value: JSON.stringify(
                    items.map((item: OrderFormItem) => ({
                      productId: item.productId,
                      sellingPrice: item.sellingPrice,
                      name: item.name,
                      quantity: item.quantity,
                    }))
                  ),
                },
              ],
            },
          },
        });
      } else {
        updateDocument({
          variables: {
            acronym: "TE",
            fields: [
              { key: "id", value: responseGet[0]?.id },
              { key: "orderFormId", value: id },
              {
                key: "Items",
                value: JSON.stringify(
                  items.map((item: OrderFormItem) => ({
                    productId: item.productId,
                    sellingPrice: item.sellingPrice,
                    name: item.name,
                    quantity: item.quantity,
                  }))
                ),
              },
            ],
          },
        });
      }
    }
  }, [dataGetDocument]);

  return <Fragment />;
};

export default TestCustom;
