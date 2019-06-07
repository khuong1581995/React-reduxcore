// config common
// export const BASE_URL = 'http://localhost:4040/api';
// export const BASE_URL = 'http://123.24.205.109:200/api';
export const BASE_URL = 'http://g.lifetek.vn:201';
export const APP_URL = 'http://g.lifetek.vn:220';
export const PROPERTIES_APP_URL = 'http://g.lifetek.vn:207/api';
export const UPLOAD_APP_URL = 'http://g.lifetek.vn:203/api';
// api auth
export const API_LOGIN = `${BASE_URL}/oauth/token`;
export const API_GET_TOKEN = `${BASE_URL}/oauth/authorize`;
export const REGISTER = `${BASE_URL}/users/register`;
export const CREATE = `${BASE_URL}/users/create`;

// api system config
export const SYS_CONF = `${APP_URL}/api/system-config`;

// api users
export const WHO_AM_I = `${APP_URL}/api/users/whoami`; // GET users //POST user // DELETE user
export const API_USERS = `${APP_URL}/api/employees`; // GET users //POST user // DELETE user
export const API_PROVIDERS = `${APP_URL}/api/inventory/agency`; // GET users //POST user // DELETE user
export const API_ORIGANIZATION = `${APP_URL}/api/organization-units`; // GET users //POST user // DELETE user
export const API_DELETE_ORIGANIZATION = `${APP_URL}/api/organization-units/remove-more`; // GET users //POST user // DELETE user
export const API_VIEWCONFIG = `${APP_URL}/api/view-configs/myconfig`; // +id user  //PUT view config
export const API_UNIT_STOCK = `${APP_URL}/api/inventory/unit`; // +id user  //PUT view config
export const API_CATEGORY_STOCK = `${APP_URL}/api/inventory/catalog`; // +id user  //PUT view config
export const API_SERVICES_STOCK = `${APP_URL}/api/inventory/service`; // +id user  //PUT view config
export const API_TAG_STOCK = `${APP_URL}/api/inventory/tag`; // +id user  //PUT view config
export const API_UPDATE_VIEWCONFIG = `${APP_URL}/api/view-configs`; // +id user  //PUT view config
export const DYNAMIC_COLLECTION = `${APP_URL}/api/dynamic-collections`; // +id user  //PUT view config
// api properties
export const GET_PROP_SET = `${PROPERTIES_APP_URL}/attribute-temps`;
export const GET_PROP_GROUP = `${PROPERTIES_APP_URL}/attributesGroup`;
export const GET_PROP_LIST = `${PROPERTIES_APP_URL}/attributes`;

// api cusomers
export const API_CUSTOMERS = `${APP_URL}/api/customers`; // GET customer //POST customer // DELETE customer

export const API_KEY = 'AIzaSyAXhItM5DtDeNF7uesxuyhEGd3Wb_5skTg';
// api upload
export const UPLOAD_IMG_SINGLE = `${UPLOAD_APP_URL}/files/single`;

// view config
export const API_VIEW_CONFIG = `${APP_URL}/api/view-configs`; // +id user  //PUT view config

// api supplier
export const API_SUPPLIERS = `${APP_URL}/api/suppliers`;
export const API_STATUS_CRMCONFIG = `${APP_URL}/api/crm-status`; // +id user  //PUT view config

// api supplier
export const SUPPLIER = `${APP_URL}/api/suppliers`; // +id user  //PUT view config
