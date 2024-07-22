export enum APPMODE {
  DEVELOPMENT = "development",
  PRODUCTION = "production"
}

export enum SideMenuItemKeys {
  ORDERS = "orders",
  COMPANY = "company",
  SUBMISSION_STATUS = "submission-status",
  MESSAGES = "messages",
  SETTINGS = "settings",
  DEFAULT_HOME_PAGE = "home",
  ACCOUNT_DETAILS = "account-details"
}

/* enums regarding any routing done in the application. */
export const RouteConstants = {
  DEFAULT_HOME_PAGE: "/home",
  ROOT_PAGE: "/",
  PAGE_NOT_FOUND: "/page-not-found",
  COMING_SOON: "/coming-soon",
  ERROR_PAGE: "/error-page400"
};
