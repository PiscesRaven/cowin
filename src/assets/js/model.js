//model
export function USER() {
  return {
    email: "",
    password: "",
    role: "",
    name: "",
    phoneNumber: "",
    address: "",
    bonus: 0,
    GuiNumber: "",
    WeChat: "",
    selectRegion: "",
    retailerId: "",
    authorizedCategoryIds: {}
  };
}
export function CATEGORY() {
  return {
    name: "",
    description: "",
    imageUrl: ""
  };
}
export function PRODUCT() {
  return {
    name: "",
    description: "",
    imageUrl: "",
    size: "",
    color: "",
    categoryId: ""
  };
}
export function SIDE_MENU(role) {
  let result = [
    {
      label: "使用者管理",
      icon: "el-icon-s-custom",
      path: "/user",
      only: [USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.retailer],
      not: []
    },
    {
      label: "商品管理",
      icon: "el-icon-s-custom",
      path: "/category/:role",
      only: [],
      not: []
    }
    // {
    //   label: "經銷商庫存",
    //   icon: "el-icon-s-custom",
    //   path: "/user",
    //   only: [],
    //   not: []
    // },
    // {
    //   label: "訂單管理",
    //   icon: "el-icon-s-custom",
    //   path: "/user",
    //   only: [],
    //   not: []
    // }
  ];
  result = result.filter(x => !x.only.length || x.only.has(role)).filter(x => !x.not.length || !x.not.has(role));
  result = result.map(x => {
    delete x.only;
    delete x.not;
    x.path = x.path.replace(/:role/g, role);
    return x;
  });
  return result;
}
export function R2R(role) {
  const R2R_rule = {
    admin: {
      only: [],
      not: [USER_ROLE.franchiser]
    },
    staff: {
      only: [],
      not: [USER_ROLE.admin, USER_ROLE.sales, USER_ROLE.franchiser]
    },
    sales: {
      only: [],
      not: []
    },
    supplier: {
      only: [],
      not: []
    },
    retailer: {
      only: [USER_ROLE.franchiser],
      not: []
    },
    franchiser: {
      only: [],
      not: []
    }
  }[role];
  let result = Object.keys(USER_ROLE);
  if (R2R_rule.only.length) result = R2R_rule.only;
  else if (R2R_rule.not.length) result = result.filter(x => !x.has(R2R_rule.not));

  return result;
}
//const
export const USER_ROLE = {
  admin: "admin",
  staff: "staff",
  sales: "sales",
  supplier: "supplier",
  retailer: "retailer",
  franchiser: "franchiser"
};
export const REGION = {
  TW: "TW",
  US: "US",
  CA: "CA",
  CN: "CN",
  KH: "KH"
};
export const E2C = {
  //翻譯
  //role
  admin: "管理者",
  supplier: "供應商",
  franchiser: "加盟店",
  retailer: "經銷商",
  staff: "採購員工",
  sales: "銷售員工",
  //router :mode
  create: "新增",
  edit: "編輯",
  //REGION
  TW: "台灣",
  US: "美國",
  CA: "加拿大",
  CN: "中國",
  KH: "柬埔寨"
};
