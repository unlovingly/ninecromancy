export default [
  {
    actions: {
      'actions.create': 'product.create',
      'actions.index': 'product.index'
    },
    header: 'product.product'
  },
  {
    actions: {
      'actions.create': 'publisher.create',
      'actions.index': 'publisher.index'
    },
    header: 'publisher.publisher'
  },
  {
    header: 'slip.slip',
    node: [
      {
        actions: {
          'actions.create': 'slip.sales.sell',
          'actions.index': 'slip.sales.index'
        },
        header: 'slip.sales'
      },
      {
        actions: {
          'actions.create': 'slip.purchase.storing',
          'actions.index': 'slip.purchase.index'
        },
        header: 'slip.storing'
      }
    ]
  },
  {
    header: 'customer.customer',
    actions: {
      'actions.create': 'customer.create',
      'actions.index': 'customer.index'
    }
  }
]
