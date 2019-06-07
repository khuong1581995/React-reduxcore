// import React from 'react';
import ListOfDepartmentPage from 'containers/ListOfDepartmentPage';
// import PublicRoute from 'components/PublicRoute';
// import PrivateRoute from 'components/PrivateRoute';
// import MainLayout from 'components/MainLayout';
import AddUserPage from 'containers/AddUserPage/Loadable';
// import LoginPage from 'containers/LoginPage';
// import Login from 'views/Login';
// import EmptyLayout from '../../components/EmptyLayout';
import UsersPage from 'containers/UsersPage';
import RoleGroupPage from 'containers/RoleGroupPage';
import SystemConfigPage from 'containers/SystemConfigPage';
import StockPage from 'containers/StockPage';
// import BusinessOpportunities from 'containers/BusinessOpportunities';
import Calendar from 'components/Calendar';
import { Dashboard, Apps, Widgets, DateRange, Settings, AssignmentInd } from '@material-ui/icons';
// import DetailBusinessOpportunities from 'containers/DetailBusinessOpportunities';
// import Trading from 'containers/Trading';
// import TradingDetail from '../containers/TradingDetail';
import AddRolesGroupPage from '../containers/AddRolesGroupPage';
import AddCustomerPage from '../containers/AddCustomerPage';
import Demo from '../views/Demo';
// import CrmConfigPage from '../containers/CrmConfigPage';
// import CustomersPage from '../containers/CustomersPage';
// import Kanban from '../components/Kanban';
import PropertiesGroup from '../containers/AddPropertiesGroup';
import AddPropertie from '../containers/AddPropertie';
import DetailProductPage from '../containers/DetailProductPage';
import StockConfigPage from '../containers/StockConfigPage';
import StockExportPage from '../containers/StockExportPage';
import StockImportPage from '../containers/StockImportPage';
import PropertiesPage from '../containers/PropertiesPage';
import Template from '../containers/Template';
import TemplateDetail from '../components/TemplateDetail';
import TemplateTypeDetail from '../components/TemplateTypeDetail';
// import TradingReport from '../components/Report/TradingReport';

import BODetail from '../containers/BoDetail';
// import EmailForm from '../components/Email';
import CrmCollection from '../containers/CrmCollection';
import AddNewCrmCollection from '../containers/AddNewCrmCollection';
import AddNewProductPage from '../containers/AddNewProductPage';
import InventoryDetailPage from '../containers/InventoryDetailPage';
// import ContractPage from '../containers/ContractPage';
import TemplateType from '../containers/TemplateType';
import SalesPolicy from '../containers/SalesPolicy';
import SalesPolicyDetail from '../containers/SalesPolicyDetail';
import TradingDetail from '../containers/TradingDetail';
import WorkFlow from '../containers/WorkFlow';

import WorkFlowPage from '../containers/WorkFlowPage';
import ApprovedPage from '../containers/ApprovedPage';

import ApprovedDetailPage from '../containers/ApprovedDetailPage';
import OrganizationalStructurePage from '../containers/OrganizationalStructurePage';

import AddSupplierPage from '../containers/AddSupplierPage';
import AddPropertiesSet from '../containers/AddPropertiesSet';
import EditPropertiesSet from '../containers/EditPropertiesSet';

const dashRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: Demo,
  },
  {
    collapse: true,
    path: '/setting',
    name: 'Thiết lập',
    icon: Settings,
    component: SystemConfigPage,
    views: [
      {
        path: '/setting/general',
        name: 'Cấu hình chung',
        mini: 'TP',
        component: SystemConfigPage,
      },
      {
        name: 'Biểu mẫu động',
        path: '/setting/template',
        mini: 'BM',
        component: Template,
      },
      {
        name: 'Biểu mẫu động',
        path: '/setting/template/:id',
        mini: 'BM',
        component: TemplateDetail,
        hide: true,
      },
      {
        name: 'Phê duyệt động',
        path: '/setting/approved',
        mini: 'BM',
        component: ApprovedPage,
      },
      {
        name: 'Phê duyệt động',
        path: '/setting/approved/:id',
        mini: 'BM',
        component: ApprovedDetailPage,
        hide: true,
      },
      {
        name: 'Loại văn bản',
        path: '/setting/template_type',
        mini: 'BM',
        component: TemplateType,
        hide: true,
      },
      {
        name: 'Chi tiết văn bản',
        path: '/setting/template_type/:id',
        mini: 'BM',
        component: TemplateTypeDetail,
        hide: true,
      },
      {
        name: 'Chính sách bán hàng',
        path: '/setting/sales_policy',
        mini: 'BM',
        component: SalesPolicy,
      },
      {
        name: 'Chính sách bán hàng',
        path: '/setting/sales_policy/:id',
        mini: 'BM',
        component: SalesPolicyDetail,
        hide: true,
      },
      {
        name: 'Email - SMS',
        path: '/setting/email',
        mini: 'EM',
        component: Demo,
      },
      {
        name: 'Tự động',
        path: '/setting/automation',
        mini: 'TD',
        component: Demo,
      },
      {
        name: 'WorkFlow',
        path: '/setting/workflow',
        mini: 'WF',
        component: WorkFlowPage,
      },
      {
        name: 'WorkFlow',
        path: '/setting/workflow/:id',
        mini: 'WF',
        component: WorkFlow,
        hide: true,
      },
      {
        hide: true,
        name: 'Phân quyền',
        path: '/setting/roleGroup',
        mini: 'PQ',
        component: RoleGroupPage,
      },
      {
        name: 'Người dùng ',
        path: '/setting/user',
        mini: 'ND',
        component: UsersPage,
      },
      {
        name: 'Thuộc tính',
        path: '/setting/properties/',
        mini: 'TT',
        component: PropertiesPage,
      },
    ],
  },
  {
    path: '/crm/add',
    name: 'Thêm mới',
    mini: 'RP',
    component: AddNewCrmCollection,
    hide: true,
    empty: true,
  },

  {
    path: '/crm/detail/:id',
    name: 'Chi tiết ',
    mini: 'CF',
    component: TradingDetail,
    // hide: true,
    empty: true,
  },

  {
    collapse: true,
    path: '/crm',
    name: 'Crm',
    state: 'openPages',
    icon: AssignmentInd,
    component: CrmCollection,

    views: [
      {
        path: '/crm/sale-polices',
        name: 'Chính sách bán hàng',
        mini: 'CF',
        component: CrmCollection,
      },
      {
        path: '/crm/business-opportunities',
        name: 'Cơ hội kinh doanh',
        mini: 'TP',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/business-opportunities/:id',
        name: 'Chi tiết cơ hội kinh doanh',
        mini: 'TP',
        component: BODetail,
        hide: true,
      },
      {
        path: '/crm/trading/:id',
        name: 'Chi tiết trao đổi thỏa thuận',
        mini: 'TP',
        component: TradingDetail,
        hide: true,
      },
      {
        path: '/crm/trading',
        name: 'Trao đổi/Thỏa thuận',
        mini: 'TD',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/customers',
        name: 'Khách hàng',
        mini: 'RS',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/suppliers',
        name: 'Nhà cung cấp',
        mini: 'RS',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/suppliers/:id',
        name: 'Nhà cung cấp',
        mini: 'RS',
        component: AddSupplierPage,
        hide: true,
      },
      {
        path: '/crm/customers/:id',
        name: 'Thêm Khách hàng',
        mini: 'RS',
        component: AddCustomerPage,
        hide: true,
      },
      {
        path: '/crm/price',
        name: 'Báo giá',
        mini: 'PR',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/contracts',
        name: 'Hợp đồng',
        mini: 'CT',
        component: CrmCollection,
        hide: true,
      },
      {
        path: '/crm/bill',
        name: 'Hóa đơn',
        mini: 'BI',
        component: CrmCollection,
        hide: true,
      },

      {
        path: '/crm/reports',
        name: 'Báo cáo',
        mini: 'RP',
        component: CrmCollection,
        hide: true,
      },

      {
        path: '/crm/config',
        name: 'Cấu hình CRM',
        mini: 'CF',
        component: CrmCollection,
        hide: false,
      },
      {
        path: '/crm/selling-channel',
        name: 'Bán hàng đa kênh',
        mini: 'SC',
        component: CrmCollection,
        hide: false,
      },
      {
        path: '/crm/log',
        name: 'Log',
        mini: 'SC',
        component: CrmCollection,
        hide: false,
      },
    ],
  },

  { path: '/stock/list/inventory/:id', name: 'Chi tiết sản phẩm', icon: Widgets, component: InventoryDetailPage, empty: true },
  { path: '/stock/detail/:id', name: 'Chi tiết sản phẩm', icon: Widgets, component: DetailProductPage, empty: true },
  { path: '/stock/add', name: 'Chi tiết sản phẩm', icon: Widgets, component: AddNewProductPage, empty: true },

  {
    collapse: true,
    path: '/Stock',
    name: ' Kho',
    state: 'openComponents',
    component: StockPage,
    icon: Apps,
    exact: true,
    views: [
      {
        path: '/stock/list',
        name: 'Danh sách sản phẩm',
        mini: 'SP',
        component: StockPage,
      },
      {
        path: '/stock/export',
        name: 'Xuất kho',
        mini: 'XK',
        component: StockExportPage,
      },
      {
        path: '/stock/import',
        name: 'Nhập kho',
        mini: 'NK',
        component: StockImportPage,
      },
      {
        path: '/stock/config',
        name: 'Cấu hình kho',
        mini: 'P',
        component: StockConfigPage,
      },
    ],
  },
  { path: '/setting/roleGroup/add', name: 'Thêm mới quyền', icon: Widgets, component: AddRolesGroupPage, empty: true },
  { path: '/setting/properties/propertiesGroup/:id', name: 'Nhóm thuộc tính', icon: Widgets, component: PropertiesGroup, empty: true },
  { path: '/setting/properties/properties/:id', name: 'Thuộc tính', icon: Widgets, component: AddPropertie, empty: true },
  { path: '/setting/properties/propertiesSet/:id', name: 'Bộ thuộc tính', icon: Widgets, component: EditPropertiesSet, empty: true },
  // { path: '/setting/properties/:id', name: 'Bộ thuộc tính', icon: Widgets, component: PropertiesPage, empty: true },
  { path: '/setting/properties/propertiesSet/', name: 'Bộ thuộc tính', icon: Widgets, component: AddPropertiesSet, empty: true },
  { path: '/crm/customers/add', name: 'Thêm mới khách hàng', icon: Widgets, component: AddCustomerPage, empty: true },
  { path: '/setting/user/add', name: 'Thêm mới nhân sự', icon: Widgets, component: AddUserPage, empty: true },
  { path: '/setting/user/add/:id', name: 'Sửa nhân sự', icon: Widgets, component: AddUserPage, empty: true },
  { path: '/setting/user/department', name: 'Danh sách phòng ban', icon: Widgets, component: ListOfDepartmentPage, empty: true },
  { path: '/setting/user/structure', name: 'Cấu trúc doanh nghiệp', icon: Widgets, component: OrganizationalStructurePage, empty: true },
  { path: '/calendar', name: 'Calendar', icon: DateRange, component: Calendar },
];

export default dashRoutes;
