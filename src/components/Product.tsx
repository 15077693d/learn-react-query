import React, { Fragment, useState } from "react";
import { useProduct, useProducts } from "../services/query";

export default function Products() {
  const productsQuery = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<null | number>(
    null
  );
  const productQuery = useProduct(selectedProductId);

  return (
    <div style={{ border: "1px white solid" }}>
      {productsQuery.data?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((product) => (
            <button onClick={() => setSelectedProductId(product.id)}>
              {product.name}
            </button>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "loading more..."
            : productsQuery.hasNextPage
            ? "load more"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected product:</div>
      {JSON.stringify(productQuery.data)}
    </div>
  );
}
