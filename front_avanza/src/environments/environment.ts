export const environment = {
  production: false,
  apiUrlBase: 'http://localhost:8089/api/',
  apiUrlAuth: {
    authenticate: 'auth/login',
    logout: 'auth/logout',
  },
  apiUrlUser: {
    urlUserSave: 'users/save',
    urlUserFindAllUsers: 'users/findAllUsers',
    urlUserUpdate: 'users/update',
    urlUserDelete: 'users/delete/',
  },
  apiUrlProducts: {
    save: 'products/save',
    findAllProducts: 'products/findAllProducts',
    findByCode: 'products/productByCode/',
    update: 'products/update',
    delete: 'products/delete/',
  },
  apiUrlClient: {
    findByDocument: 'clients/findByDocument/',
    save: 'clients/save',
  },
  apiUrlSales: {
    generateInvoice: 'sales/generateInvoice',
    registerSale: 'sales/registerSale',
  }
};

