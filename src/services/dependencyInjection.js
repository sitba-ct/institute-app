import configureCourseServices from "./course/dependencyInjection";
import configureGroupServices from "./group/dependencyInjection";
import configureIncomeServices from "./income/dependencyInjection";
import configureInitialDailyCashServices from "./initialDailyCash/dependencyInjection";
import configureOutflowServices from "./outflow/dependencyInjection";
import configurePaymentsServices from "./payments/dependencyInjection";
import configureSignUpServices from "./signUp/validations/dependencyInjection";
import configureUserRoleServices from "./userRole/dependencyInjection";
import configureStudentsServices from "./students/dependencyInjection";

const configureServices = () => {
  configureCourseServices();
  configureGroupServices();
  configureIncomeServices();
  configureInitialDailyCashServices();
  configureOutflowServices();
  configurePaymentsServices();
  configureSignUpServices();
  configureUserRoleServices();
  configureStudentsServices();
  // add each configure method here, for each group of services...
};

export { configureServices };
